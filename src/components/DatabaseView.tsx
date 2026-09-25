import { useState } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { projects, site, type Project } from '../lib/data'
import { PROPERTIES, propertyByKey } from '../lib/properties'
import { useColumnWidths } from '../lib/useColumnWidths'
import { FilterChip } from './FilterChip'
import { ArrowDownIcon, ArrowUpIcon, CloseIcon, FilterIcon, OpenIcon, TableIcon } from './Icons'
import { Tag } from './Tag'

type FilterKey = 'env' | 'year' | 'type'
type Sort = { key: string; dir: 'asc' | 'desc' } | null

const unique = (values: string[]) => [...new Set(values)]

const FILTER_OPTIONS: Record<FilterKey, string[]> = {
  env: unique(projects.flatMap((p) => p.env)),
  year: unique(projects.map((p) => String(p.year))).sort((a, b) => Number(b) - Number(a)),
  type: unique(projects.map((p) => p.type)),
}

const readList = (params: URLSearchParams, key: FilterKey) => params.get(key)?.split(',').filter(Boolean) ?? []

function readSort(params: URLSearchParams): Sort {
  const [key, dir] = (params.get('sort') ?? '').split(':')
  if (!propertyByKey(key)) return null
  return { key, dir: dir === 'desc' ? 'desc' : 'asc' }
}

function matches(p: Project, filters: Record<FilterKey, string[]>) {
  const { env, year, type } = filters
  if (env.length && !p.env.some((e) => env.includes(e))) return false
  if (year.length && !year.includes(String(p.year))) return false
  if (type.length && !type.includes(p.type)) return false
  return true
}

export function DatabaseView() {
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()

  const filters: Record<FilterKey, string[]> = {
    env: readList(params, 'env'),
    year: readList(params, 'year'),
    type: readList(params, 'type'),
  }
  const sort = readSort(params)
  const { widths, totalWidth, startResize, resetWidth } = useColumnWidths()
  const hasConditions = Object.values(filters).some((v) => v.length) || sort !== null
  const [barOpen, setBarOpen] = useState(hasConditions)

  const update = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const cycleSort = (key: string) => {
    if (sort?.key !== key) update('sort', `${key}:asc`)
    else if (sort.dir === 'asc') update('sort', `${key}:desc`)
    else update('sort', null)
    setBarOpen(true)
  }

  const sortProp = sort && propertyByKey(sort.key)
  const rows = projects.filter((p) => matches(p, filters))
  if (sort && sortProp) {
    const sign = sort.dir === 'asc' ? 1 : -1
    rows.sort((a, b) => sign * sortProp.compare(a, b))
  }

  const detailLink = (p: Project) => ({ pathname: `/project/${p.id}` })
  const linkState = { from: location.search }

  return (
    <div className="page page--wide">
      <div className="db-container" style={{ width: totalWidth }}>
        <header className="db-header">
          {site.icon && <div className="db-header__icon">{site.icon}</div>}
          <h1 className="db-header__title">{site.title}</h1>
          {site.description && <p className="db-header__desc">{site.description}</p>}
        </header>

        <div className="toolbar">
          <div className="toolbar__tab">
            <TableIcon />
            <span>표</span>
          </div>
          <button
            type="button"
            className={`toolbar__btn${hasConditions ? ' toolbar__btn--active' : ''}`}
            onClick={() => setBarOpen((o) => !o)}
          >
            <FilterIcon />
            필터
          </button>
        </div>

        {(barOpen || hasConditions) && (
          <div className="filter-bar">
            {sortProp && (
              <button type="button" className="chip chip--active" onClick={() => update('sort', null)} title="정렬 해제">
                {sort.dir === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
                <span className="chip__label">{sortProp.label}</span>
                <CloseIcon />
              </button>
            )}
            {sortProp && <span className="filter-bar__divider" />}
            <FilterChip
              label="최적화 환경"
              icon={propertyByKey('env')!.icon}
              options={FILTER_OPTIONS.env}
              selected={filters.env}
              onChange={(v) => update('env', v.join(','))}
              renderOption={(v) => <Tag value={v} />}
            />
            <FilterChip
              label="연도"
              icon={propertyByKey('year')!.icon}
              options={FILTER_OPTIONS.year}
              selected={filters.year}
              onChange={(v) => update('year', v.join(','))}
            />
            <FilterChip
              label="종류"
              icon={propertyByKey('type')!.icon}
              options={FILTER_OPTIONS.type}
              selected={filters.type}
              onChange={(v) => update('type', v.join(','))}
              renderOption={(v) => <Tag value={v} />}
            />
            {hasConditions && (
              <button type="button" className="filter-bar__reset" onClick={() => setParams({}, { replace: true })}>
                초기화
              </button>
            )}
          </div>
        )}

        <div className="table-scroll">
          <table className="db-table" style={{ width: totalWidth }}>
            <colgroup>
              {PROPERTIES.map((p) => (
                <col key={p.key} style={{ width: widths[p.key] }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {PROPERTIES.map((p) => {
                  const dir = sort?.key === p.key ? sort.dir : null
                  return (
                    <th key={p.key} aria-sort={dir ? (dir === 'asc' ? 'ascending' : 'descending') : undefined}>
                      <button type="button" className="th-btn" onClick={() => cycleSort(p.key)}>
                        {p.icon}
                        <span>{p.label}</span>
                        {dir === 'asc' && <ArrowUpIcon className="th-btn__sort" />}
                        {dir === 'desc' && <ArrowDownIcon className="th-btn__sort" />}
                      </button>
                      <span
                        className="col-resizer"
                        role="separator"
                        aria-orientation="vertical"
                        title="드래그해서 너비 조절 · 더블클릭으로 초기화"
                        onPointerDown={(e) => startResize(p.key, e)}
                        onDoubleClick={() => resetWidth(p.key)}
                      />
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p.id} onClick={() => navigate(detailLink(p), { state: linkState })}>
                  <td className="cell-title">
                    <Link to={detailLink(p)} state={linkState} onClick={(e) => e.stopPropagation()}>
                      {p.icon && <span className="cell-title__icon">{p.icon}</span>}
                      <span className="cell-title__text">{p.name}</span>
                    </Link>
                    <span className="open-btn" aria-hidden>
                      <OpenIcon />
                      열기
                    </span>
                  </td>
                  <td className="cell-url">
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()}>
                        {p.url.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </td>
                  <td>
                    <div className="tags">
                      {p.env.map((e) => (
                        <Tag key={e} value={e} />
                      ))}
                    </div>
                  </td>
                  <td className="cell-number">{p.year}</td>
                  <td>{p.type && <Tag value={p.type} />}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr className="row-empty">
                  <td colSpan={PROPERTIES.length}>조건에 맞는 프로젝트가 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="db-count">
          <span>개수</span> {rows.length}
        </div>
      </div>
    </div>
  )
}

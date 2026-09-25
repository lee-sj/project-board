import { useEffect, type ReactNode } from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link, useLocation, useParams } from 'react-router-dom'
import { getProject, getProjectMarkdown, site, type Project } from '../lib/data'
import { PROPERTIES, type PropertyKey } from '../lib/properties'
import { Tag } from './Tag'

function propertyValue(key: PropertyKey, p: Project): ReactNode {
  switch (key) {
    case 'url':
      return p.url ? (
        <a href={p.url} target="_blank" rel="noreferrer">
          {p.url}
        </a>
      ) : null
    case 'env':
      return (
        <div className="tags">
          {p.env.map((e) => (
            <Tag key={e} value={e} />
          ))}
        </div>
      )
    case 'year':
      return p.year
    case 'type':
      return p.type ? <Tag value={p.type} /> : null
    default:
      return null
  }
}

export function ProjectPage() {
  const { id = '' } = useParams()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? ''
  const project = getProject(id)
  const markdown = getProjectMarkdown(id)

  useEffect(() => {
    document.title = project ? `${project.name} · ${site.title}` : site.title
    window.scrollTo(0, 0)
    return () => {
      document.title = site.title
    }
  }, [project])

  const breadcrumb = (
    <nav className="breadcrumb">
      <Link to={{ pathname: '/', search: from }}>
        {site.icon && <span>{site.icon}</span>}
        {site.title}
      </Link>
      {project && (
        <>
          <span className="breadcrumb__sep">/</span>
          <span className="breadcrumb__current">
            {project.icon && <span>{project.icon}</span>}
            {project.name}
          </span>
        </>
      )}
    </nav>
  )

  if (!project) {
    return (
      <>
        {breadcrumb}
        <div className="page">
          <h1 className="page__title">페이지를 찾을 수 없습니다</h1>
          <p className="muted">
            <code>content/projects.json</code>에 id가 <code>{id}</code>인 프로젝트가 없습니다.
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      {breadcrumb}
      <article className="page">
        {project.icon && <div className="page__icon">{project.icon}</div>}
        <h1 className="page__title">{project.name}</h1>

        <dl className="props">
          {PROPERTIES.filter((prop) => prop.key !== 'name').map((prop) => (
            <div className="props__row" key={prop.key}>
              <dt className="props__name">
                {prop.icon}
                {prop.label}
              </dt>
              <dd className="props__value">{propertyValue(prop.key, project) ?? <span className="muted">비어 있음</span>}</dd>
            </div>
          ))}
        </dl>

        <hr className="page__divider" />

        {markdown?.trim() ? (
          <div className="markdown">
            <Markdown
              remarkPlugins={[remarkGfm]}
              components={{
                a: ({ href, children }) => {
                  const external = href && /^https?:\/\//.test(href)
                  return (
                    <a href={href} {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
                      {children}
                    </a>
                  )
                },
              }}
            >
              {markdown}
            </Markdown>
          </div>
        ) : (
          <p className="muted">
            아직 작성된 내용이 없습니다. <code>content/projects/{project.id}.md</code> 파일을 만들어 내용을 작성하세요.
          </p>
        )}
      </article>
    </>
  )
}

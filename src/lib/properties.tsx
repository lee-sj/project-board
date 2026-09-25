import type { ReactNode } from 'react'
import type { Project } from './data'
import { LinkIcon, MultiSelectIcon, NumberIcon, SelectIcon, TitleIcon } from '../components/Icons'

export type PropertyKey = 'name' | 'url' | 'env' | 'year' | 'type'

export type Property = {
  key: PropertyKey
  label: string
  icon: ReactNode
  /** 테이블 열 기본 너비(px) — 사용자가 드래그로 조절 가능 */
  width: number
  compare: (a: Project, b: Project) => number
}

const text = (a = '', b = '') => a.localeCompare(b, 'ko')

export const PROPERTIES: Property[] = [
  { key: 'name', label: '프로젝트명', icon: <TitleIcon />, width: 240, compare: (a, b) => text(a.name, b.name) },
  { key: 'url', label: '배포 URL', icon: <LinkIcon />, width: 200, compare: (a, b) => text(a.url, b.url) },
  { key: 'env', label: '최적화 환경', icon: <MultiSelectIcon />, width: 150, compare: (a, b) => text(a.env.join(), b.env.join()) },
  { key: 'year', label: '연도', icon: <NumberIcon />, width: 90, compare: (a, b) => a.year - b.year },
  { key: 'type', label: '종류', icon: <SelectIcon />, width: 100, compare: (a, b) => text(a.type, b.type) },
]

export const propertyByKey = (key: string) => PROPERTIES.find((p) => p.key === key)

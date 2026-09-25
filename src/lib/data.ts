import projectsJson from '../../content/projects.json'
import siteJson from '../../content/site.json'

export type Project = {
  /** URL 경로와 상세 Markdown 파일명(content/projects/<id>.md)으로 사용 */
  id: string
  name: string
  icon?: string
  url?: string
  env: string[]
  year: number
  type: string
}

export type SiteConfig = {
  icon?: string
  title: string
  description?: string
  /** 태그 값별 색상 지정 (예: { "팀": "purple" }) — 지정하지 않은 값은 자동 배정 */
  tagColors?: Record<string, TagColor>
}

export const TAG_COLORS = [
  'gray', 'brown', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'red',
] as const
export type TagColor = (typeof TAG_COLORS)[number]

export const site = siteJson as SiteConfig
export const projects = projectsJson as Project[]

const markdownFiles = import.meta.glob<string>('../../content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export function getProject(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getProjectMarkdown(id: string): string | undefined {
  return markdownFiles[`../../content/projects/${id}.md`]
}

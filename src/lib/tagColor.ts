import { site, TAG_COLORS, type TagColor } from './data'

const DEFAULT_COLORS: Record<string, TagColor> = {
  PC: 'blue',
  Mobile: 'green',
  팀: 'purple',
  개인: 'orange',
  미니: 'pink',
}

export function tagColor(value: string): TagColor {
  const preset = site.tagColors?.[value] ?? DEFAULT_COLORS[value]
  if (preset) return preset
  let hash = 0
  for (const ch of value) hash = (hash * 31 + ch.charCodeAt(0)) | 0
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length]
}

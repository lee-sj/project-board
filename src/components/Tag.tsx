import { tagColor } from '../lib/tagColor'

export function Tag({ value }: { value: string }) {
  return <span className={`tag tag--${tagColor(value)}`}>{value}</span>
}

import { useCallback, useState, type PointerEvent } from 'react'
import { PROPERTIES, type PropertyKey } from './properties'

const STORAGE_KEY = 'dashboard:column-widths'
const MIN_WIDTH = 60

type Widths = Record<PropertyKey, number>

const defaults = () => Object.fromEntries(PROPERTIES.map((p) => [p.key, p.width])) as Widths

function load(): Widths {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}')
    return { ...defaults(), ...saved }
  } catch {
    return defaults()
  }
}

function save(widths: Widths) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widths))
  } catch {
    // 저장 불가 환경(시크릿 모드 등)에서는 무시
  }
}

/** 열 너비 상태 + 드래그 핸들 이벤트. 조절한 너비는 브라우저에 저장됨 */
export function useColumnWidths() {
  const [widths, setWidths] = useState<Widths>(load)

  const startResize = useCallback((key: PropertyKey, e: PointerEvent<HTMLElement>) => {
    e.preventDefault()
    e.stopPropagation()
    const handle = e.currentTarget
    const startX = e.clientX
    const startWidth = widths[key]
    handle.setPointerCapture(e.pointerId)
    document.body.classList.add('is-resizing')

    let latest = widths
    const onMove = (ev: globalThis.PointerEvent) => {
      const width = Math.max(MIN_WIDTH, Math.round(startWidth + ev.clientX - startX))
      latest = { ...latest, [key]: width }
      setWidths(latest)
    }
    const onUp = () => {
      handle.removeEventListener('pointermove', onMove)
      handle.removeEventListener('pointerup', onUp)
      handle.removeEventListener('pointercancel', onUp)
      document.body.classList.remove('is-resizing')
      save(latest)
    }
    handle.addEventListener('pointermove', onMove)
    handle.addEventListener('pointerup', onUp)
    handle.addEventListener('pointercancel', onUp)
  }, [widths])

  const resetWidth = useCallback((key: PropertyKey) => {
    setWidths((prev) => {
      const next = { ...prev, [key]: defaults()[key] }
      save(next)
      return next
    })
  }, [])

  const totalWidth = PROPERTIES.reduce((sum, p) => sum + widths[p.key], 0)

  return { widths, totalWidth, startResize, resetWidth }
}

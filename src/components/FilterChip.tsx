import { useEffect, useRef, useState, type ReactNode } from 'react'
import { CheckIcon, ChevronDownIcon } from './Icons'

type Props = {
  label: string
  icon: ReactNode
  options: string[]
  selected: string[]
  onChange: (values: string[]) => void
  renderOption?: (value: string) => ReactNode
}

export function FilterChip({ label, icon, options, selected, onChange, renderOption }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = (value: string) =>
    onChange(selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value])

  const active = selected.length > 0

  return (
    <div className="chip-wrap" ref={ref}>
      <button
        type="button"
        className={`chip${active ? ' chip--active' : ''}`}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {icon}
        <span className="chip__label">
          {label}
          {active && <span className="chip__value">: {selected.join(', ')}</span>}
        </span>
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="menu" role="listbox" aria-multiselectable>
          <div className="menu__header">
            <span>{label}</span>
            {active && (
              <button type="button" className="menu__clear" onClick={() => onChange([])}>
                지우기
              </button>
            )}
          </div>
          {options.map((opt) => {
            const checked = selected.includes(opt)
            return (
              <button
                type="button"
                key={opt}
                role="option"
                aria-selected={checked}
                className="menu__item"
                onClick={() => toggle(opt)}
              >
                <span className={`checkbox${checked ? ' checkbox--on' : ''}`}>{checked && <CheckIcon />}</span>
                {renderOption ? renderOption(opt) : opt}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

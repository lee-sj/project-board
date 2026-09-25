type IconProps = { className?: string }

const base = {
  width: 14,
  height: 14,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
}

export const TitleIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2 12.5 5.2 3.5h.6l3.2 9M3.1 9.5h4.8" />
    <path d="M13.5 12.5V9.3c0-1.1-.8-1.8-1.9-1.8-.8 0-1.4.3-1.8.9M13.5 10.6c-2.6-.1-3.7.4-3.7 1.2 0 .6.5 1 1.2 1 1.3 0 2.5-.8 2.5-2.2" />
  </svg>
)

export const LinkIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.8 9.2a2.8 2.8 0 0 0 4 0l2.1-2.1a2.8 2.8 0 0 0-4-4l-.7.7" />
    <path d="M9.2 6.8a2.8 2.8 0 0 0-4 0L3.1 8.9a2.8 2.8 0 0 0 4 4l.7-.7" />
  </svg>
)

export const MultiSelectIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6 4h8M6 8h8M6 12h8" />
    <circle cx="2.7" cy="4" r=".6" fill="currentColor" />
    <circle cx="2.7" cy="8" r=".6" fill="currentColor" />
    <circle cx="2.7" cy="12" r=".6" fill="currentColor" />
  </svg>
)

export const NumberIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M6.2 2.5 4.8 13.5M11.2 2.5l-1.4 11M2.5 5.8h11M2 10.2h11" />
  </svg>
)

export const SelectIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <circle cx="8" cy="8" r="6" />
    <path d="m5.6 7 2.4 2.4L10.4 7" />
  </svg>
)

export const TableIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <rect x="2" y="2.5" width="12" height="11" rx="1.5" />
    <path d="M2 6.2h12M6 6.2v7.3" />
  </svg>
)

export const FilterIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M2.5 4h11M4.5 8h7M6.8 12h2.4" />
  </svg>
)

export const ArrowUpIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 13V3M4 7l4-4 4 4" />
  </svg>
)

export const ArrowDownIcon = (p: IconProps) => (
  <svg {...base} {...p}>
    <path d="M8 3v10M4 9l4 4 4-4" />
  </svg>
)

export const ChevronDownIcon = (p: IconProps) => (
  <svg {...base} width={10} height={10} {...p}>
    <path d="m3.5 6 4.5 4.5L12.5 6" />
  </svg>
)

export const CloseIcon = (p: IconProps) => (
  <svg {...base} width={10} height={10} {...p}>
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
)

export const OpenIcon = (p: IconProps) => (
  <svg {...base} width={12} height={12} {...p}>
    <path d="M9.5 2.5h4v4M13.5 2.5 8 8M11.5 9.5v3a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h3" />
  </svg>
)

export const CheckIcon = (p: IconProps) => (
  <svg {...base} width={12} height={12} strokeWidth={2} {...p}>
    <path d="m3.5 8.5 3 3 6-7" />
  </svg>
)

const ICONS = {
    terrain: (
        <path d="M3 19l6-8 4 5 3-4 5 7H3zM13 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0zM7 5l2 3-1 1-2-3z" stroke="none" />
    ),
    gem: (
        <path d="M6 3h12l4 6-10 12L2 9l4-6zm0 6h12M8 3l-2 6 6 12M16 3l2 6-6 12M6 20h12" />
    ),
    droplets: (
        <path d="M14 3c4 5 6 7.5 6 10a6 6 0 0 1-12 0c0-2.5 2-4.5 6-10zM12 15a2 2 0 0 1 2-2" />
    ),
}

export default function ServiceIcon({ name, className = 'h-6 w-6' }) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            {ICONS[name] ?? ICONS.terrain}
        </svg>
    )
}
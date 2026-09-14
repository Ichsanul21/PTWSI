export default function BlinkDot({ className = '', light = false }) {
    const color = light ? 'bg-white' : 'bg-ink'
    return (
        <span className={`relative inline-flex h-2.5 w-2.5 shrink-0 ${className}`} aria-hidden="true">
            <span className={`absolute inset-0 rounded-full ${color}`} />
            <span className={`absolute inset-0 animate-dot-ping rounded-full ${light ? 'bg-white/60' : 'bg-ink/40'}`} />
        </span>
    )
}

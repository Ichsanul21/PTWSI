export default function SectionHeading({ eyebrow, title, className = '', dark = false }) {
    return (
        <div className={`max-w-4xl ${className}`}>
            {eyebrow && <p className={`kicker mb-5 ${dark ? 'text-white/60' : 'text-ink/50'}`}>{eyebrow}</p>}
            <h2 className={`display-lg ${dark ? 'text-white' : ''}`}>{title}</h2>
        </div>
    )
}

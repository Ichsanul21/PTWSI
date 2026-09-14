import { Children, cloneElement, useEffect, useRef } from 'react'

// Seamless infinite marquee driven by requestAnimationFrame (no CSS keyframes,
// so motion works regardless of stylesheets or OS reduced-motion settings).
// Content is rendered as two identical halves; the track wraps every half-width.
export default function Marquee({ children, speed = 150, reverse = false, className = '', gapClass = 'gap-16 pr-16' }) {
    const trackRef = useRef(null)
    const paused = useRef(false)

    useEffect(() => {
        const track = trackRef.current
        if (!track) return

        let raf = 0
        let last = performance.now()
        let x = 0

        const tick = (now) => {
            const dt = Math.min(64, now - last) / 1000
            last = now

            if (!paused.current && !document.hidden) {
                const half = track.scrollWidth / 2
                if (half > 0) {
                    x += (reverse ? 1 : -1) * speed * dt
                    x = reverse ? ((x % half) + half) % half - half : -(((-x % half) + half) % half)
                    track.style.transform = `translate3d(${x}px, 0, 0)`
                }
            }
            raf = requestAnimationFrame(tick)
        }

        raf = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(raf)
    }, [speed, reverse])

    const items = Children.toArray(children)
    const renderSet = (prefix) => items.map((child, i) => cloneElement(child, { key: `${prefix}-${i}` }))

    return (
        <div
            className={`marquee-mask overflow-hidden ${className}`}
            onMouseEnter={() => {
                paused.current = true
            }}
            onMouseLeave={() => {
                paused.current = false
            }}
        >
            <div ref={trackRef} className="flex w-max will-change-transform">
                {[0, 1].map((half) => (
                    <div key={half} className={`flex items-center ${gapClass}`} aria-hidden={half === 1}>
                        {renderSet(half)}
                    </div>
                ))}
            </div>
        </div>
    )
}

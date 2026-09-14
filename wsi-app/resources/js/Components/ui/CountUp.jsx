import { useEffect, useRef, useState } from 'react'

function splitValue(raw) {
    const str = String(raw ?? '')
    const match = str.match(/^([\d.,]+)(.*)$/)
    if (!match) return { numeric: null, rest: str }
    const numeric = parseFloat(match[1].replace(/,/g, '')) || 0
    return { numeric, rest: match[2] }
}

export default function CountUp({ value, suffix = '', prefix = '', duration = 1600, decimals = 0, className = '' }) {
    const ref = useRef(null)
    const raf = useRef(0)
    const [display, setDisplay] = useState(() => (splitValue(value).numeric === null ? String(value ?? '') : '0'))

    useEffect(() => {
        const { numeric, rest } = splitValue(value)
        const tail = `${rest}${suffix}`
        const format = (n) => `${n.toFixed(decimals)}${tail}`
        const reduceMotion =
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (numeric === null) {
            setDisplay(String(value ?? ''))
            return
        }

        const el = ref.current
        if (!el || !('IntersectionObserver' in window) || reduceMotion) {
            setDisplay(format(numeric))
            return
        }

        let started = false
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting || started) return
                    started = true

                    const t0 = performance.now()
                    const tick = (now) => {
                        const progress = Math.min((now - t0) / duration, 1)
                        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
                        setDisplay(format(numeric * eased))
                        if (progress < 1) {
                            raf.current = requestAnimationFrame(tick)
                        }
                    }
                    raf.current = requestAnimationFrame(tick)
                    observer.disconnect()
                })
            },
            { threshold: 0.4 },
        )

        observer.observe(el)
        return () => {
            observer.disconnect()
            cancelAnimationFrame(raf.current)
        }
    }, [value, duration, decimals, suffix])

    return (
        <span ref={ref} className={className}>
            {prefix}
            {display}
        </span>
    )
}

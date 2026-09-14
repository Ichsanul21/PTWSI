import { useEffect, useRef, useState } from 'react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }) {
    const ref = useRef(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const reduceMotion =
            typeof window !== 'undefined' &&
            typeof window.matchMedia === 'function' &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches

        if (!('IntersectionObserver' in window) || reduceMotion) {
            setVisible(true)
            return
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true)
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.1, rootMargin: '0px 0px -10% 0px' },
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    return (
        <Tag
            ref={ref}
            className={`${visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${className}`}
            style={{
                transitionProperty: 'opacity, transform',
                transitionDuration: '650ms',
                transitionTimingFunction: EASE,
                transitionDelay: `${delay}ms`,
                willChange: visible ? 'auto' : 'opacity, transform',
            }}
        >
            {children}
        </Tag>
    )
}

import { useMemo } from 'react'
import { usePage } from '@inertiajs/react'

export function useTrans() {
    const { translations, locale } = usePage().props

    const t = useMemo(
        () => (key, fallback = '') => {
            if (translations && translations[key]) return translations[key]
            return fallback || key
        },
        [translations],
    )

    return { t, locale }
}

export function localizedPath(locale, path) {
    if (path === '/') return locale === 'en' ? '/en' : '/'
    return locale === 'en' ? `/en${path}` : path
}
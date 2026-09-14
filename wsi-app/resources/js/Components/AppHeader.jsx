import { useEffect, useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import Button from './ui/Button'
import { localizedPath, useTrans } from '../hooks/useTrans'

const NAV = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.about', path: '/tentang' },
    { key: 'nav.services', path: '/layanan' },
    { key: 'nav.clients', path: '/klien' },
    { key: 'nav.insights', path: '/insight' },
    { key: 'nav.gallery', path: '/galeri' },
    { key: 'nav.contact', path: '/kontak' },
]

export default function AppHeader() {
    const { t, locale } = useTrans()
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const { url } = usePage()

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24)
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const normalized = url === '/en' ? '/en' : url
    const floating = scrolled

    const isActive = (path) => {
        if (path === '/') {
            return normalized === '/' || normalized === '/en'
        }
        return normalized.startsWith(path) || normalized.startsWith(`/en${path}`)
    }

    const buildHref = (path) => localizedPath(locale, path)
    const langHref = locale === 'en' ? localizedPath('id', url === '/en' ? '/' : url.replace(/^\/en/, '')) : `/en${url}`

    const navLink = (active) =>
        `whitespace-nowrap px-3 py-2 font-mono text-[13px] uppercase tracking-[0.035em] transition-opacity duration-150 hover:opacity-60 ${
            active ? 'text-brand-600' : 'text-ink'
        }`

    return (
        <header className="fixed inset-x-0 top-0 z-50">
            <div className="w-full">
                <div
                    className={`mx-auto flex w-full items-center justify-between gap-3 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        floating
                            ? 'mt-6 max-w-[70rem] rounded-lg border border-black/10 bg-white/50 px-4 py-3 shadow-lg shadow-black/5 sm:px-5'
                            : 'mt-0 max-w-full rounded-none border-b border-black/10 bg-white/85 px-5 py-4 sm:px-8'
                    }`}
                >
                    <Link href={buildHref('/')} className="flex shrink-0 items-center gap-3" aria-label="PT Wall Street Indonesia">
                        <img src="/images/logo-bulat.png" alt="PT Wall Street Indonesia" className="h-9 w-9 rounded-full object-cover" />
                        <span className="hidden text-sm font-bold tracking-wide text-ink min-[420px]:block">
                            WALL STREET INDONESIA
                        </span>
                    </Link>

                    <nav className="hidden min-w-0 flex-1 items-center justify-center xl:flex" aria-label="Primary">
                        {NAV.map((item) => (
                            <Link key={item.key} href={buildHref(item.path)} className={navLink(isActive(item.path))}>
                                {t(item.key)}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex shrink-0 items-center gap-3">
                        <Link
                            href={langHref}
                            className="hidden font-mono text-xs font-medium tracking-[0.1em] text-ink/50 transition-colors hover:text-ink sm:block"
                        >
                            {locale === 'en' ? 'ID' : 'EN'}
                        </Link>
                        <Button href={buildHref('/kontak') + '#lead'} variant="primary" size="sm" className="hidden whitespace-nowrap sm:inline-flex">
                            {t('common.cta_quote')}
                        </Button>
                        <button
                            type="button"
                            aria-label="Menu"
                            onClick={() => setOpen(!open)}
                            className="flex h-10 w-10 items-center justify-center rounded border border-black/10 bg-black/5 text-ink xl:hidden"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {open && (
                <div className={floating ? 'nav-shell pt-2' : 'px-4 pt-2 sm:px-6'}>
                    <div className="animate-menu-in rounded-lg border border-black/10 bg-white/95 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl xl:hidden">
                        <nav className="flex flex-col" aria-label="Mobile">
                            {NAV.map((item) => (
                                <Link
                                    key={item.key}
                                    href={buildHref(item.path)}
                                    onClick={() => setOpen(false)}
                                    className={`rounded px-4 py-3 font-mono text-[13px] uppercase tracking-[0.035em] transition-colors ${isActive(item.path) ? 'bg-black/5 text-brand-700' : 'text-ink hover:bg-black/[0.03]'}`}
                                >
                                    {t(item.key)}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-2 flex items-center gap-3 border-t border-black/10 px-4 pt-4">
                            <Link href={langHref} onClick={() => setOpen(false)} className="font-mono text-xs font-medium text-ink/50">
                                {locale === 'en' ? 'BAHASA INDONESIA (ID)' : 'ENGLISH (EN)'}
                            </Link>
                        </div>
                        <div className="flex flex-col gap-2 p-2">
                            <Button href="/admin/login" variant="secondary" size="md" block onClick={() => setOpen(false)}>
                                {t('nav.login')}
                            </Button>
                            <Button href={buildHref('/kontak') + '#lead'} variant="primary" size="md" block onClick={() => setOpen(false)}>
                                {t('common.cta_quote')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </header>
    )
}

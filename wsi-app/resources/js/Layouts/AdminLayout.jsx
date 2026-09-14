import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { AdminLink, Flash } from '../Components/admin/ui'

const GROUPS = [
    {
        label: 'Utama',
        items: [
            { label: 'Dashboard', href: '/admin', icon: 'M3 12l9-9 9 9M5 10v10h14V10' },
            { label: 'Enquiries', href: '/admin/enquiries', icon: 'M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zm0 1l9 6 9-6' },
        ],
    },
    {
        label: 'Konten',
        items: [
            { label: 'Layanan', href: '/admin/services', icon: 'M3 19l6-8 4 5 3-4 5 7H3zM13 6a2 2 0 1 0 4 0 2 2 0 0 0-4 0z' },
            { label: 'Kategori Uji', href: '/admin/test-categories', icon: 'M4 6h16M4 12h10M4 18h7' },
            { label: 'Metode Uji', href: '/admin/test-items', icon: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2' },
            { label: 'Klien', href: '/admin/clients', icon: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75' },
            { label: 'Proyek', href: '/admin/projects', icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 9h1m4 0h1M9 13h1m4 0h1M9 17h1m4 0h1' },
            { label: 'Galeri', href: '/admin/gallery', icon: 'M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5zm14 0l-4 8-3-4-4 6 2 8 4-3' },
            { label: 'Artikel Insight', href: '/admin/insights', icon: 'M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z' },
        ],
    },
    {
        label: 'Sistem',
        items: [
            { label: 'Pengaturan', href: '/admin/settings', icon: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a7.6 7.6 0 0 0-.1-1.2l2-1.5-2-3.5-2.4 1a7.6 7.6 0 0 0-2-1.2L14.5 3h-5l-.4 2.6a7.6 7.6 0 0 0-2 1.2l-2.4-1-2 3.5 2 1.5a7.6 7.6 0 0 0 0 2.4l-2 1.5 2 3.5 2.4-1a7.6 7.6 0 0 0 2 1.2l.4 2.6h5l.4-2.6a7.6 7.6 0 0 0 2-1.2l2.4 1 2-3.5-2-1.5c.1-.4.1-.8.1-1.2z' },
        ],
    },
]

function isActive(url, href) {
    if (href === '/admin') return url === '/admin'
    return url.startsWith(href)
}

function AdminMenuItem({ label, href, icon, active, onNavigate }) {
    return (
        <div onClick={onNavigate}>
            <AdminLink href={href} active={active}>
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={icon} /></svg>
                {label}
            </AdminLink>
        </div>
    )
}

export default function AdminLayout({ children, title }) {
    const url = usePage().url
    const auth = usePage().props.auth?.user ?? null
    const [open, setOpen] = useState(false)

    return (
        <div className="min-h-screen bg-cream font-sans text-slate-900">
            {open && (
                <button
                    type="button"
                    aria-label="Tutup menu"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-40 bg-ink/50 backdrop-blur-sm lg:hidden"
                />
            )}

            <aside className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-ink text-white transition-transform duration-300 ease-out lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex h-16 w-full shrink-0 items-center gap-3 border-b border-white/10 px-5">
                    <img src="/images/logo-white.png" alt="PT Wall Street Indonesia" className="h-7 w-auto" />
                    <div className="leading-tight">
                        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brand-300">Admin Panel</p>
                    </div>
                </div>
                <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
                    {GROUPS.map((group) => (
                        <div key={group.label}>
                            <p className="mb-2 px-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">{group.label}</p>
                            <div className="space-y-1">
                                {group.items.map((item) => (
                                    <AdminMenuItem key={item.href} {...item} active={isActive(url, item.href)} onNavigate={() => setOpen(false)} />
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
                <div className="shrink-0 border-t border-white/10 p-4">
                    <Link href="/" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-white/5 hover:text-white">
                        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                        Lihat Situs
                    </Link>
                </div>
            </aside>

            <div className="lg:pl-64">
                <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
                    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-8">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                aria-label="Menu"
                                onClick={() => setOpen(!open)}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 lg:hidden"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                    {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
                                </svg>
                            </button>
                            <h1 className="font-display text-lg font-bold text-slate-900">{title}</h1>
                        </div>
                        {auth && (
                            <div className="flex items-center gap-3">
                                <span className="hidden items-center gap-2.5 sm:flex">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                                        {auth.name?.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="text-sm font-medium text-slate-700">{auth.name}</span>
                                </span>
                                <Link
                                    href="/admin/logout"
                                    method="post"
                                    preserveScroll
                                    className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:border-red-200 hover:text-red-600"
                                >
                                    Keluar
                                </Link>
                            </div>
                        )}
                    </div>
                </header>
                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-8">
                    <Flash />
                    {children}
                </main>
            </div>
        </div>
    )
}

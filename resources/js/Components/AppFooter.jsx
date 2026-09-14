import { Link, usePage } from '@inertiajs/react'
import { localizedPath, useTrans } from '../hooks/useTrans'
import Button from './ui/Button'

export default function AppFooter() {
    const { t, locale } = useTrans()
    const page = usePage().props
    const brand = page.site?.brand ?? {}
    const buildHref = (path) => localizedPath(locale, path)

    const services = [
        { id: 'Geomekanika & Mekanika Tanah', en: 'Geomechanics & Soil Mechanics', path: '/layanan/geomekanika' },
        { id: 'Mekanika Batuan & Petrofisika', en: 'Rock Mechanics & Petrophysics', path: '/layanan/mekanika-batuan' },
        { id: 'Hidrogeologi & Lingkungan', en: 'Hydrogeology & Environment', path: '/layanan/hidrogeologi-lingkungan' },
    ]

    const pages = [
        { key: 'nav.about', path: '/tentang' },
        { key: 'nav.clients', path: '/klien' },
        { key: 'nav.insights', path: '/insight' },
        { key: 'nav.gallery', path: '/galeri' },
        { key: 'nav.contact', path: '/kontak' },
    ]

    return (
        <footer className="bg-white pb-6">
            <div className="container-site">
                <div className="flex flex-col gap-8 border-t border-ink/10 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-20">
                    <h2 className="display-lg max-w-2xl">{t('footer.question')}</h2>
                    <Button href={buildHref('/kontak') + '#lead'} variant="primary" size="lg" className="shrink-0 self-start lg:self-auto">
                        {t('common.cta_quote')}
                    </Button>
                </div>

                <div className="rounded-lg bg-ink p-8 text-white sm:p-10">
                    <div className="grid gap-10 lg:grid-cols-12">
                        <div className="lg:col-span-5">
                            <div className="flex items-center gap-3">
                                <img src="/images/logo-white.png" alt={brand.name ?? 'PT Wall Street Indonesia'} className="h-8 w-auto" />
                            </div>
                            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">{t('footer.about')}</p>
                            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-brand-300">
                                {brand.tagline_id ?? t('common.tagline')}
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
                            <div>
                                <h3 className="kicker mb-5 text-white/40">{t('footer.services')}</h3>
                                <ul className="space-y-3">
                                    {services.map((s) => (
                                        <li key={s.path}>
                                            <Link
                                                href={buildHref(s.path)}
                                                className="font-mono text-[13px] uppercase tracking-[0.032em] text-white/75 transition-opacity hover:opacity-60"
                                            >
                                                {locale === 'en' ? s.en : s.id}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="kicker mb-5 text-white/40">{t('footer.pages')}</h3>
                                <ul className="space-y-3">
                                    {pages.map((p) => (
                                        <li key={p.path}>
                                            <Link
                                                href={buildHref(p.path)}
                                                className="font-mono text-[13px] uppercase tracking-[0.032em] text-white/75 transition-opacity hover:opacity-60"
                                            >
                                                {t(p.key)}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <h3 className="kicker mb-5 text-white/40">{t('footer.contact')}</h3>
                                <ul className="space-y-2 text-sm text-white/75">
                                    {brand.phones?.map((phone) => (
                                        <li key={phone}>
                                            <a href={`tel:${phone.replace(/-/g, '')}`} className="transition-opacity hover:opacity-60">
                                                {phone}
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <a href={`mailto:${brand.email}`} className="break-all transition-opacity hover:opacity-60">
                                            {brand.email}
                                        </a>
                                    </li>
                                    <li className="pt-2 text-white/50">{brand.working_hours}</li>
                                    <li className="text-white/50">{brand[`address_${locale}`] ?? brand.address_id}</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <p className="font-mono text-xs text-white/50">
                            © {new Date().getFullYear()} {brand.name ?? 'PT Wall Street Indonesia'}. {t('footer.rights')}
                        </p>
                        <p className="font-mono text-xs uppercase tracking-[0.12em] text-white/40">{t('common.made_in')}</p>
                        <Link href="/admin" className="font-mono text-xs text-white/50 transition-opacity hover:opacity-60">
                            {t('footer.admin')}
                        </Link>
                    </div>
                    <p className="mt-4 font-mono text-[11px] text-white/30">{t('footer.credits')}</p>
                </div>
            </div>
        </footer>
    )
}

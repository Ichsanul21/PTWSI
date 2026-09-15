import { Link } from '@inertiajs/react'
import PublicLayout from '../../Layouts/PublicLayout'
import Reveal from '../../Components/ui/Reveal'
import Seo from '../../Components/Seo'
import PageHero from '../../Components/ui/PageHero'
import ServiceIcon from '../../Components/ui/ServiceIcon'
import { SERVICE_IMAGES, alt } from '../../Components/ui/media'
import { useTrans, localizedPath } from '../../hooks/useTrans'

export default function ServicesIndex({ services }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)

    return (
        <PublicLayout>
            <Seo title={locale === 'en' ? 'Services | PT Wall Street Indonesia' : 'Layanan | PT Wall Street Indonesia'} />
            <PageHero
                eyebrow={t('nav.services')}
                title={locale === 'en' ? 'Three testing divisions for mining & infrastructure' : 'Tiga divisi pengujian untuk tambang & infrastruktur'}
                lead={locale === 'en' ? 'Every division runs on accountable standards: SNI, ASTM, AASHTO, JIS and ISRM.' : 'Setiap divisi berjalan dengan standar yang dapat dipertanggungjawabkan: SNI, ASTM, AASHTO, JIS dan ISRM.'}
            />

            <section className="section-pad section-gradient-subtle border-t border-ink/10">
                <div className="container-site">
                    <div className="grid gap-8">
                        {services.map((s, i) => (
                            <Reveal key={s.slug} delay={i * 80}>
                                <Link
                                    href={buildHref(`/layanan/${s.slug}`)}
                                    className="group grid overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-xl lg:grid-cols-12"
                                >
                                    <div className="relative aspect-[16/10] w-full overflow-hidden lg:col-span-5 lg:aspect-auto lg:min-h-[280px]">
                                        {SERVICE_IMAGES[s.slug] || s.cover_url ? (
                                            <img src={s.cover_url || SERVICE_IMAGES[s.slug].src} alt={alt(SERVICE_IMAGES[s.slug] ?? { id: s.name_id, en: s.name_en }, locale)} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <span className="absolute inset-0 flex items-center justify-center bg-ink/5 text-ink/70 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white">
                                                <ServiceIcon name={s.icon} className="h-12 w-12" />
                                            </span>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-5">
                                            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">{s.standards}</span>
                                        </div>
                                    </div>
                                    <span className="flex flex-col justify-center p-8 sm:p-10 lg:col-span-7">
                                        <span className="font-mono text-sm text-brand-600">
                                            {String(i + 1).padStart(2, '0')}
                                        </span>
                                        <span className="display-lg mt-3 block transition-colors group-hover:text-brand-600">{s[`name_${locale}`] ?? s.name_id}</span>
                                        <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-ink/60 sm:text-base">{s[`short_${locale}`] ?? s.short_id}</span>
                                        <span className="mt-6 flex items-center justify-between gap-4">
                                            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">{s.standards}</span>
                                            <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-200 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                                                <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M5 12h14M13 6l6 6-6 6" />
                                                </svg>
                                            </span>
                                        </span>
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}

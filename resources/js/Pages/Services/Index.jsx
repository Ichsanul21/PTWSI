import { Link } from '@inertiajs/react'
import PublicLayout from '../../Layouts/PublicLayout'
import Reveal from '../../Components/ui/Reveal'
import Seo from '../../Components/Seo'
import PageHero from '../../Components/ui/PageHero'
import ServiceIcon from '../../Components/ui/ServiceIcon'
import Button from '../../Components/ui/Button'
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

            <section className="section-pad border-t border-ink/10 bg-white">
                <div className="container-site">
                    <div className="border-t border-ink/10">
                        {services.map((s, i) => (
                            <Reveal key={s.slug} delay={i * 80}>
                                <Link
                                    href={buildHref(`/layanan/${s.slug}`)}
                                    className="group grid items-center gap-5 border-b border-ink/10 py-8 transition-colors duration-200 hover:bg-ink/[0.02] sm:py-10 lg:grid-cols-12"
                                >
                                    <span className="font-mono text-sm text-ink/35 lg:col-span-1">
                                        {String(i + 1).padStart(2, '0')}
                                    </span>
                                    {SERVICE_IMAGES[s.slug] || s.cover_url ? (
                                        <img src={s.cover_url || SERVICE_IMAGES[s.slug].src} alt={alt(SERVICE_IMAGES[s.slug] ?? { id: s.name_id, en: s.name_en }, locale)} loading="lazy" decoding="async" className="hidden h-12 w-12 rounded object-cover lg:col-span-1 lg:block" />
                                    ) : (
                                        <span className="hidden h-12 w-12 items-center justify-center rounded bg-ink/5 text-ink/70 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white lg:col-span-1 lg:flex">
                                            <ServiceIcon name={s.icon} className="h-6 w-6" />
                                        </span>
                                    )}
                                    <span className="lg:col-span-7">
                                        <span className="display-lg block transition-colors group-hover:text-brand-600">{s[`name_${locale}`] ?? s.name_id}</span>
                                        <span className="mt-2 block max-w-2xl text-sm leading-relaxed text-ink/60">{s[`short_${locale}`] ?? s.short_id}</span>
                                    </span>
                                    <span className="flex items-center justify-between gap-4 lg:col-span-3 lg:justify-end">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">{s.standards}</span>
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-200 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                                            <svg className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                        </span>
                                    </span>
                                </Link>
                            </Reveal>
                        ))}
                    </div>

                    <Reveal delay={160}>
                        <div className="mt-14 flex flex-col gap-6 rounded-lg bg-brand-600 p-8 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold sm:text-3xl">
                                    {locale === 'en' ? 'Cannot find the method you need?' : 'Tidak menemukan metode yang Anda butuhkan?'}
                                </h2>
                                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/75">
                                    {locale === 'en' ? 'Contact us. The laboratory can tailor test methods to your project needs.' : 'Hubungi kami. Laboratorium dapat menyesuaikan metode uji dengan kebutuhan proyek.'}
                                </p>
                            </div>
                            <Button href={buildHref('/kontak')} variant="light" size="lg" className="shrink-0 self-start lg:self-auto">
                                {t('common.cta_quote')}
                            </Button>
                        </div>
                    </Reveal>
                </div>
            </section>
        </PublicLayout>
    )
}

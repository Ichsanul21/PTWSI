import { useState } from 'react'
import { Link } from '@inertiajs/react'
import PublicLayout from '../../Layouts/PublicLayout'
import Reveal from '../../Components/ui/Reveal'
import Seo from '../../Components/Seo'
import SectionHeading from '../../Components/ui/SectionHeading'
import ServiceIcon from '../../Components/ui/ServiceIcon'
import BlinkDot from '../../Components/ui/BlinkDot'
import { SERVICE_IMAGES, INSIGHT_IMAGES, alt } from '../../Components/ui/media'
import { useTrans, localizedPath } from '../../hooks/useTrans'

export default function ServiceShow({ service, related }) {
    const { t, locale } = useTrans()
    const [open, setOpen] = useState(-1)
    const buildHref = (path) => localizedPath(locale, path)

    const name = service[`name_${locale}`] ?? service.name_id
    const description = service[`description_${locale}`] ?? service.description_id
    const categories = service.test_categories ?? service.testCategories ?? []
    const band = SERVICE_IMAGES[service.slug] ?? INSIGHT_IMAGES[0]

    return (
        <PublicLayout>
            <Seo title={`${name} | PT Wall Street Indonesia`} />

            <header className="relative overflow-hidden bg-white">
                <div className="dot-grid absolute inset-0 opacity-60" />
                <div className="absolute -top-40 left-1/2 h-96 w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl" />
                <div className="container-site relative pb-16 pt-40 lg:pb-20 lg:pt-48">
                    <Reveal>
                        <Link href={buildHref('/layanan')} className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-ink">
                            <span className="transition-transform group-hover:-translate-x-1">←</span> {t('common.cta_back')}
                        </Link>
                        <div className="mt-8 flex items-start gap-5">
                            <span className="hidden h-14 w-14 shrink-0 items-center justify-center rounded bg-brand-600 text-white sm:flex">
                                <ServiceIcon name={service.icon} className="h-7 w-7" />
                            </span>
                            <div>
                                <p className="kicker flex items-center gap-3 text-ink/50">
                                    <BlinkDot />
                                    {t('nav.services')}
                                </p>
                                <h1 className="display-xl mt-5 max-w-5xl">{name}</h1>
                                <div className="mt-5 flex flex-wrap items-center gap-3">
                                    <span className="rounded border border-ink/15 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
                                        {service.standards}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal delay={180}>
                        <div className="divider-line mt-10" />
                    </Reveal>
                </div>
            </header>

            {(description || categories.length > 0) && (
                <section className="section-pad border-t border-ink/10 bg-white">
                    <div className="container-site">
                        <Reveal>
                            <figure className="relative mb-14 overflow-hidden rounded-lg border border-ink/10">
                                <img src={band.src} alt={alt(band, locale)} loading="lazy" decoding="async" className="aspect-[21/9] w-full object-cover" />
                                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-6 pb-5 pt-14 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">
                                    {service.standards}
                                </figcaption>
                            </figure>
                        </Reveal>
                        {description && (
                            <Reveal>
                                <div className="max-w-3xl text-lg leading-relaxed text-ink/75">{description}</div>
                            </Reveal>
                        )}

                        {categories.length > 0 && (
                            <Reveal delay={120}>
                                <div className="mt-14 border-t border-ink/10">
                                    {categories.map((cat, ci) => {
                                        const tests = cat.tests ?? []
                                        return (
                                            <div key={ci} className="border-b border-ink/10">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(open === ci ? -1 : ci)}
                                                    aria-expanded={open === ci}
                                                    className="group flex w-full items-center justify-between gap-4 py-6 text-left sm:py-7"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <span className="font-mono text-sm text-ink/40">{String(ci + 1).padStart(2, '0')}</span>
                                                        <h2 className="text-xl font-bold text-ink transition-colors group-hover:text-brand-600 sm:text-2xl">{cat[`name_${locale}`] ?? cat.name_id}</h2>
                                                        <span className="hidden font-mono text-xs text-ink/40 sm:inline">({tests.length} metode)</span>
                                                    </div>
                                                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl leading-none transition-all duration-300 ${open === ci ? 'rotate-45 border-brand-600 bg-brand-600 text-white' : 'border-ink/15 text-ink'}`}>+</span>
                                                </button>
                                                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] ${open === ci ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                                    <div className="min-h-0 overflow-hidden">
                                                    <div className="grid gap-3 pb-10 md:grid-cols-2">
                                                        {tests.map((test) => (
                                                            <div key={test.slug} className="rounded-lg border border-ink/10 bg-ink/[0.02] p-5">
                                                                <p className="font-medium text-ink/90">{test[`name_${locale}`] ?? test.name_id}</p>
                                                                {(test.standards?.length ?? 0) > 0 && (
                                                                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40">
                                                                        {t('common.standards')}: {test.standards.join(' · ')}
                                                                    </p>
                                                                )}
                                                                {test[`description_${locale}`] && (
                                                                    <p className="mt-2 text-sm leading-relaxed text-ink/60">{test[`description_${locale}`]}</p>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </Reveal>
                        )}
                    </div>
                </section>
            )}

            {related?.length > 0 && (
                <section className="section-pad border-t border-ink/10 bg-white">
                    <div className="container-site">
                        <SectionHeading eyebrow={locale === 'en' ? 'More' : 'Lainnya'} title={locale === 'en' ? 'Other testing divisions' : 'Divisi pengujian lain'} />
                        <div className="mt-12 grid gap-5 md:grid-cols-2">
                            {related.map((s, i) => (
                                <Reveal key={s.slug} delay={i * 100}>
                                    <Link
                                        href={buildHref(`/layanan/${s.slug}`)}
                                        className="group flex h-full items-start gap-5 rounded-lg border border-ink/10 bg-white p-7 transition-colors duration-200 hover:border-ink/25"
                                    >
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-ink/5 text-ink/70 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                                            <ServiceIcon name={s.icon} className="h-6 w-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-brand-600">{s[`name_${locale}`] ?? s.name_id}</h3>
                                            <p className="mt-2 text-sm leading-relaxed text-ink/60">{s[`short_${locale}`] ?? s.short_id}</p>
                                        </div>
                                        <span className="text-ink/40 transition-all group-hover:translate-x-1 group-hover:text-brand-600">→</span>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </PublicLayout>
    )
}

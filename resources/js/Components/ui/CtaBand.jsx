import { usePage } from '@inertiajs/react'
import Button from './Button'
import Reveal from './Reveal'
import { localizedPath, useTrans } from '../../hooks/useTrans'

export default function CtaBand({ title, lead }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)
    const site = usePage().props.site
    const brand = site?.brand ?? {}
    const phone = brand.phones?.[0] ?? ''
    const email = brand.email ?? ''
    const address = brand[`address_${locale}`] ?? brand.address_id ?? ''
    const hours = brand.working_hours ?? ''

    const heading = title ?? (locale === 'en' ? 'Ready to start your testing project?' : 'Siap memulai proyek pengujian Anda?')
    const description = lead ?? (locale === 'en'
        ? 'Tell us your soil, rock, or environmental testing needs. Our team responds within 24 hours on working days.'
        : 'Ceritakan kebutuhan pengujian tanah, batuan, atau lingkungan Anda. Tim kami merespons dalam 1×24 jam pada jam kerja.')

    const TRUSTS = locale === 'en'
        ? [
            { icon: 'schedule', text: 'Quote response within 24 hours on working days' },
            { icon: 'verified', text: 'SNI · ASTM · AASHTO · ISRM accountable standards' },
            { icon: 'local_shipping', text: 'Close to the mine — no need to ship samples to Java' },
        ]
        : [
            { icon: 'schedule', text: 'Respons penawaran 1×24 jam pada jam kerja' },
            { icon: 'verified', text: 'Standar SNI · ASTM · AASHTO · ISRM terdokumentasi' },
            { icon: 'local_shipping', text: 'Dekat tambang — sampel tak perlu dikirim ke Jawa' },
        ]

    return (
        <section className="relative overflow-hidden" aria-labelledby="cta-heading">
            <div className="absolute inset-0 cta-gradient" />
            <div className="absolute inset-0 dot-grid-light opacity-60" />
            <div className="absolute inset-0">
                <div className="floating-shape floating-shape-1" />
                <div className="floating-shape floating-shape-2" />
                <div className="floating-shape floating-shape-3" />
            </div>
            <div className="container-site relative py-16 lg:py-24">
                <div className="relative grid items-center gap-12 lg:grid-cols-12">
                    <div className="relative lg:col-span-7">
                        <Reveal delay={100}>
                            <h2 id="cta-heading" className="display-xl font-bold text-white">
                                {heading}
                            </h2>
                        </Reveal>
                        <Reveal delay={180}>
                            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                                {description}
                            </p>
                        </Reveal>
                        <Reveal delay={240}>
                            <ul className="mt-8 grid gap-3 sm:grid-cols-3">
                                {TRUSTS.map((item) => (
                                    <li key={item.text} className="flex items-start gap-3 rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur">
                                        <span className="material-symbols-outlined text-white">{item.icon}</span>
                                        <span className="text-xs font-medium leading-relaxed text-white/90">{item.text}</span>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Button href={buildHref('/kontak') + '#lead'} size="lg" variant="light">
                                    {t('common.cta_quote')}
                                </Button>
                                <Button href={buildHref('/layanan')} size="lg" variant="underlineLight">
                                    {t('common.cta_services')}
                                </Button>
                            </div>
                            {(phone || email) && (
                                <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-white/70">
                                    {phone && <a href={`tel:${phone.replace(/-/g, '')}`} className="underline-offset-4 hover:underline">{phone}</a>}
                                    {phone && email && <span className="mx-3 text-white/30">·</span>}
                                    {email && <a href={`mailto:${email}`} className="underline-offset-4 hover:underline">{email}</a>}
                                </p>
                            )}
                        </Reveal>
                    </div>
                    <div className="relative lg:col-span-5">
                        <Reveal delay={350}>
                            <div className="relative overflow-hidden rounded-2xl border border-white/25 shadow-2xl">
                                <img src="/images/lab-soil.jpg" alt={locale === 'en' ? 'Soil testing in the laboratory' : 'Pengujian tanah di laboratorium'} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover" />
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-6 pt-16">
                                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">
                                        {locale === 'en' ? 'Materials testing laboratory · Samarinda' : 'Laboratorium pengujian material · Samarinda'}
                                    </p>
                                    {(address || hours) && (
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/75">
                                            {address}{address && hours ? ' · ' : ''}{hours}
                                        </p>
                                    )}
                                </div>
                                <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-white backdrop-blur">
                                    {locale === 'en' ? '24h response' : 'Respons 24 jam'}
                                </span>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

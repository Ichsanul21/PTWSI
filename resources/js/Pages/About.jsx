import { usePage } from '@inertiajs/react'
import { useTrans, localizedPath } from '../hooks/useTrans'
import { Head, Link } from '@inertiajs/react'
import PublicLayout from '../Layouts/PublicLayout'
import Reveal from '../Components/ui/Reveal'
import SectionHeading from '../Components/ui/SectionHeading'
import PageHero from '../Components/ui/PageHero'
import { ABOUT_IMAGE, alt } from '../Components/ui/media'

const VALUES = [
    {
        key: 'accuracy',
        title_id: 'Akurasi',
        title_en: 'Accuracy',
        body_id: 'Setiap angka yang kami laporkan dapat ditelusuri kembali ke prosedur dan standar yang berlaku.',
        body_en: 'Every figure we report traces back to applicable procedures and standards.',
    },
    {
        key: 'speed',
        title_id: 'Kecepatan',
        title_en: 'Speed',
        body_id: 'Jadwal pengerjaan yang jelas dan kabar aktif. Waktu Anda di lapangan terlalu berharga untuk menunggu tanpa kepastian.',
        body_en: 'Clear turnaround schedules and proactive updates. Your time on site is too valuable for silent waiting.',
    },
    {
        key: 'integrity',
        title_id: 'Integritas',
        title_en: 'Integrity',
        body_id: 'Hasil yang jujur dan transparan, tanpa kompromi pada keselamatan desain.',
        body_en: 'Honest, transparent results, no compromise on design safety.',
    },
]

export default function About({ services }) {
    const { t, locale } = useTrans()
    const site = usePage().props.site
    const about = site?.about ?? {}
    const buildHref = (path) => localizedPath(locale, path)

    return (
        <PublicLayout>
            <Head><title>Tentang | PT Wall Street Indonesia</title></Head>
            <PageHero
                eyebrow={t('nav.about')}
                title={locale === 'en' ? 'A soil & rock lab built for Kalimantan industry' : 'Lab tanah & batuan yang dibangun untuk industri Kalimantan'}
                lead={locale === 'en' ? 'An internationally standardised geomechanics, soil & rock testing laboratory, on target for the Kalimantan mining sector.' : 'Laboratorium pengujian geomekanika, tanah & batuan berstandar internasional, tepat sasaran untuk sektor pertambangan Kalimantan.'}
                meta="0.5036ºS / 117.1214ºE"
            />

            <section className="section-pad border-t border-ink/10 bg-white">
                <div className="container-site">
                    <div className="grid gap-14 lg:grid-cols-12">
                        <Reveal className="lg:col-span-5">
                            <SectionHeading eyebrow={t('nav.about')} title={about[`lead_${locale}`] ?? about.lead_id ?? ''} />
                        </Reveal>
                        <Reveal delay={120} className="lg:col-span-7">
                            <div className="space-y-6">
                                <p className="text-xl leading-relaxed text-ink">{about[`lead_${locale}`] ?? about.lead_id}</p>
                                <p className="leading-relaxed text-ink/60">{about[`body_${locale}`] ?? about.body_id}</p>
                                <blockquote className="rounded border-l-2 border-brand-600 bg-brand-50 p-7 text-lg font-medium leading-relaxed text-ink">
                                    {site?.brand?.[`tagline_${locale}`] ?? site?.brand?.tagline_id}
                                </blockquote>
                            </div>
                        </Reveal>
                    </div>
                    <Reveal delay={160}>
                        <figure className="relative mt-14 overflow-hidden rounded-lg border border-ink/10">
                            <img src={ABOUT_IMAGE.src} alt={alt(ABOUT_IMAGE, locale)} loading="lazy" decoding="async" className="aspect-[21/9] w-full object-cover" />
                            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-6 pb-5 pt-14 font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">
                                {locale === 'en' ? 'Materials testing laboratory' : 'Laboratorium pengujian material'}
                            </figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            <section className="section-pad border-t border-ink/10 bg-white">
                <div className="container-site">
                    <SectionHeading eyebrow={locale === 'en' ? 'Our values' : 'Nilai Kami'} title={locale === 'en' ? 'Principles behind every report' : 'Prinsip yang menopang setiap laporan'} />
                    <div className="mt-12 grid gap-5 md:grid-cols-3">
                        {VALUES.map((v, i) => (
                            <Reveal key={v.key} delay={i * 120}>
                                <div className="h-full rounded-lg border border-ink/10 bg-white p-8 transition-colors duration-200 hover:border-ink/25 sm:p-10">
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                                        <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                                    </div>
                                    <h3 className="mt-10 text-2xl font-bold text-ink">{v[`title_${locale}`]}</h3>
                                    <p className="mt-4 text-sm leading-relaxed text-ink/60">{v[`body_${locale}`]}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section-pad border-t border-ink/10 bg-white">
                <div className="container-site">
                    <Reveal>
                        <div className="rounded-lg border border-ink/10 bg-ink/[0.02] p-8 sm:p-12">
                            <SectionHeading eyebrow={t('nav.services')} title={locale === 'en' ? 'Explore our testing divisions' : 'Jelajahi divisi pengujian kami'} />
                            <div className="mt-8 flex flex-wrap gap-3">
                                {services.map((s) => (
                                        <Link
                                            key={s.slug}
                                            href={buildHref(`/layanan/${s.slug}`)}
                                            className="rounded border border-ink/15 px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.04em] text-ink/70 transition-colors hover:border-brand-600 hover:bg-brand-600 hover:text-white"
                                        >
                                            {s[`name_${locale}`] ?? s.name_id}
                                        </Link>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </PublicLayout>
    )
}

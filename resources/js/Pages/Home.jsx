import { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { Head } from '@inertiajs/react'
import PublicLayout from '../Layouts/PublicLayout'
import Button from '../Components/ui/Button'
import Reveal from '../Components/ui/Reveal'
import CountUp from '../Components/ui/CountUp'
import SectionHeading from '../Components/ui/SectionHeading'
import ServiceIcon from '../Components/ui/ServiceIcon'
import Marquee from '../Components/ui/Marquee'
import { HERO_IMAGE, SERVICE_IMAGES, INSIGHT_IMAGES, FIELD_STRIP, alt } from '../Components/ui/media'
import { useTrans, localizedPath } from '../hooks/useTrans'

const SECTORS = ['Pertambangan Batubara', 'Infrastruktur', 'Bendungan', 'Energi', 'Tambang Bawah Tanah', 'Tambang Terbuka', 'IKN & Jalan Tol', 'ESG & AMDAL']

// Kecepatan marquee (px/detik) — dipakai hero & klien agar sama persis.
const MARQUEE_SPEED = 150

const VIDEO_ID = 'DLnb-pSftRI'

function Hero() {
    const { t, locale } = useTrans()
    const site = usePage().props.site
    const hero = site?.hero ?? {}
    const { locale: lc } = usePage().props
    const buildHref = (path) => localizedPath(locale, path)

    return (
        <section className="relative overflow-hidden bg-ink">
            <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
                <img src={HERO_IMAGE.src} alt="" loading="eager" decoding="async" className="kenburns absolute inset-0 h-full w-full object-cover" />
                <iframe
                    className="yt-cover"
                    src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&mute=1&loop=1&playlist=${VIDEO_ID}&controls=0&rel=0&modestbranding=1&playsinline=1&disablekb=1&fs=0&iv_load_policy=3`}
                    title={lc === 'en' ? 'Laboratory background video' : 'Video latar laboratorium'}
                    allow="autoplay; encrypted-media"
                    referrerPolicy="strict-origin-when-cross-origin"
                    tabIndex={-1}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>

            <div className="container-site relative pb-16 pt-24 lg:pb-20 lg:pt-32">
                <Reveal delay={100}>
                    <h1 className="display mt-8 max-w-6xl text-white">{hero[`title_${lc}`] ?? ''}</h1>
                </Reveal>
                <Reveal delay={180}>
                    <div className="mt-10 h-px w-full bg-white/25" />
                </Reveal>
                <Reveal delay={240}>
                    <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                        <p className="max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
                            {hero[`subtitle_${lc}`] ?? ''}
                        </p>
                        <div className="flex shrink-0 items-start gap-6 font-mono text-xs uppercase tracking-[0.14em] text-white/60">
                            <span>0.5036ºS</span>
                            <span>117.1214ºE</span>
                        </div>
                    </div>
                </Reveal>
                <Reveal delay={300}>
                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        <Button href={buildHref('/kontak') + '#lead'} size="lg" variant="primary">
                            {hero[`cta_primary_${lc}`] ?? t('common.cta_quote')}
                        </Button>
                        <Button href={buildHref('/layanan')} size="lg" variant="glass">
                            {hero[`cta_secondary_${lc}`] ?? t('common.cta_services')}
                        </Button>
                    </div>
                </Reveal>
            </div>

            <div className="relative border-t border-white/15">
                <Marquee speed={MARQUEE_SPEED} className="py-7" gapClass="gap-16 pr-16">
                    {SECTORS.map((s, i) => (
                        <span key={i} className="flex items-center gap-16 whitespace-nowrap font-mono text-xs uppercase tracking-[0.25em] text-white/60">
                            {s}
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                        </span>
                    ))}
                </Marquee>
            </div>
        </section>
    )
}

function Stats() {
    const site = usePage().props.site
    const stats = site?.stats ?? []
    const { locale } = usePage().props

    if (!stats.length) return null

    return (
        <section className="bg-ink">
            <div className="container-site">
                <div className="grid gap-10 py-14 sm:grid-cols-3 lg:py-16">
                    {stats.map((s, i) => (
                        <Reveal key={i} delay={i * 120}>
                            <p className="display-lg text-white">
                                <CountUp value={s.value} suffix={s.suffix ?? ''} />
                            </p>
                            <p className="mt-3 font-mono text-xs uppercase tracking-[0.18em] text-white/50">
                                {s[`label_${locale}`] ?? s.label_id}
                            </p>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

function ClientTile({ c, n }) {
    return (
        <a
            href={c.website || '#'}
            target={c.website ? '_blank' : undefined}
            rel="noreferrer"
            className="group flex h-24 w-56 shrink-0 items-center gap-4 rounded-lg border border-ink/10 bg-white px-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-600 hover:shadow-xl hover:shadow-brand-600/10"
        >
            <span className="font-mono text-xs text-brand-600">{String(n + 1).padStart(2, '0')}</span>
            {c.logo ? (
                <img src={`/storage/${c.logo}`} alt={c.name} loading="lazy" decoding="async" className="max-h-10 max-w-[70%] object-contain grayscale transition-all duration-300 group-hover:grayscale-0" />
            ) : (
                <span className="text-sm font-bold leading-snug text-ink/60 transition-colors group-hover:text-ink">{c.name}</span>
            )}
        </a>
    )
}

function ClientMarquee({ clients }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)
    if (!clients?.length) return null

    return (
        <section className="overflow-hidden bg-white">
            <div className="container-site pt-16">
                <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading eyebrow={t('nav.clients')} title={t('common.our_clients')} />
                        <Link href={buildHref('/klien')} className="font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink">
                            {t('common.see_all')}
                        </Link>
                    </div>
                </Reveal>
            </div>
            <Marquee speed={MARQUEE_SPEED} reverse className="pb-14 pt-10" gapClass="gap-5 pr-5">
                {clients.map((c, i) => (
                    <ClientTile key={c.id} c={c} n={i} />
                ))}
            </Marquee>
        </section>
    )
}

function Services({ services }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)

    return (
        <section className="section-pad section-gradient-subtle">
            <div className="container-site">
                <Reveal>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                        <SectionHeading eyebrow={t('nav.services')} title={t('home.services_title')} />
                        <Link href={buildHref('/layanan')} className="font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink">
                            {t('common.see_all')}
                        </Link>
                    </div>
                </Reveal>
                <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {services.map((s, i) => {
                        const name = s[`name_${locale}`] ?? s.name_id
                        const short = s[`short_${locale}`] ?? s.short_id
                        const imgSrc = s.cover_url || SERVICE_IMAGES[s.slug]?.src
                        const imgAlt = s.cover_url ? name : alt(SERVICE_IMAGES[s.slug], locale)
                        return (
                            <Reveal key={s.slug} delay={i * 100}>
                                <Link
                                    href={buildHref(`/layanan/${s.slug}`)}
                                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-xl"
                                >
                                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                                        {imgSrc ? (
                                            <img src={imgSrc} alt={imgAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-ink/5">
                                                <ServiceIcon name={s.icon} className="h-12 w-12 text-ink/30" />
                                            </div>
                                        )}
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4">
                                            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/85">{s.standards}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-1 flex-col">
                                        <span className="font-mono text-sm text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                                        <h3 className="mt-3 text-xl font-bold text-ink transition-colors group-hover:text-brand-600">{name}</h3>
                                        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{short}</p>
                                    </div>
                                    <div className="pt-4 flex items-center justify-between">
                                        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">{s.standards}</span>
                                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink transition-all duration-300 group-hover:border-brand-600 group-hover:bg-brand-600 group-hover:text-white">
                                            <svg className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M5 12h14M13 6l6 6-6 6" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

const WHYS = [
    {
        no: '01',
        title_id: 'Spesialis Geomekanika Murni',
        title_en: 'Pure Geomechanics Specialists',
        body_id: 'Fokus penuh pada tanah, batuan, dan air. Setiap hasil uji terdokumentasi dan dapat dipertanggungjawabkan.',
        body_en: 'Fully focused on soil, rock, and water. Every result documented and accountable.',
    },
    {
        no: '02',
        title_id: 'Standar Nasional & Internasional',
        title_en: 'National & International Standards',
        body_id: 'Setiap prosedur mengacu pada SNI, ASTM, AASHTO, JIS, atau ISRM sesuai kebutuhan proyek Anda.',
        body_en: 'Every procedure follows SNI, ASTM, AASHTO, JIS, or ISRM to suit your project.',
    },
    {
        no: '03',
        title_id: 'Cepat, Terjangkau, Dekat Tambang',
        title_en: 'Fast, Affordable, Close to the Mine',
        body_id: 'Dari Samarinda, sampel Anda tidak perlu dikirim ke Jawa. Hemat biaya logistik dan terima hasil lebih cepat.',
        body_en: 'From Samarinda, your samples never travel to Java. Save logistics cost and get results sooner.',
    },
]

function Why() {
    const { t } = useTrans()
    const { locale: lc } = usePage().props

    return (
        <section className="section-pad border-t border-ink/10 bg-white">
            <div className="container-site">
                <Reveal>
                    <SectionHeading eyebrow={t('nav.about')} title={t('home.why_title')} />
                </Reveal>
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {WHYS.map((w, i) => (
                        <Reveal key={w.no} delay={i * 120}>
                            <div className="flex h-full flex-col rounded-lg border border-ink/10 bg-white p-8 transition-colors duration-200 hover:border-ink/25 sm:p-10">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-sm text-brand-600">{w.no}</span>
                                    <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
                                </div>
                                <h3 className="mt-10 text-2xl font-bold leading-tight text-ink sm:mt-14">{w[`title_${lc}`]}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-ink/60">{w[`body_${lc}`]}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

function FieldStrip() {
    const { locale } = useTrans()

    return (
        <section className="border-t border-ink/10 bg-white">
            <div className="container-site section-pad">
                <Reveal>
                    <p className="kicker text-ink/50">
                        {locale === 'en' ? 'From pit to laboratory' : 'Dari lapangan ke laboratorium'}
                    </p>
                </Reveal>
                <div className="mt-10 grid gap-5 sm:grid-cols-3">
                    {FIELD_STRIP.map((img, i) => (
                        <Reveal key={img.src} delay={i * 120}>
                            <figure className="group relative overflow-hidden rounded-lg border border-ink/10">
                                <img src={img.src} alt={alt(img, locale)} loading="lazy" decoding="async" className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-5 pb-4 pt-12 font-mono text-[11px] uppercase tracking-[0.14em] text-white/90">
                                    {alt(img, locale)}
                                </figcaption>
                            </figure>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

function TestMenu({ menu }) {
    const { t, locale } = useTrans()
    const [open, setOpen] = useState(-1)
    const buildHref = (path) => localizedPath(locale, path)

    if (!menu?.length) return null

    return (
        <section className="section-pad border-t border-ink/10 bg-white">
            <div className="container-site">
                <Reveal>
                    <SectionHeading eyebrow={t('section.menu_tests_label')} title={t('common.menu_tests')} />
                </Reveal>
                <Reveal delay={120}>
                    <div className="mt-12 border-t border-ink/10">
                        {menu.map((group, gi) => (
                            <div key={group.slug} className="border-b border-ink/10">
                                <button
                                    type="button"
                                    onClick={() => setOpen(open === gi ? -1 : gi)}
                                    aria-expanded={open === gi}
                                    className="group flex w-full items-center justify-between gap-4 py-7 text-left sm:py-8"
                                >
                                    <div className="flex items-center gap-5">
                                        <span className="font-mono text-sm text-ink/40">{String(gi + 1).padStart(2, '0')}</span>
                                        <h3 className="text-xl font-bold text-ink transition-colors group-hover:text-brand-600 sm:text-2xl">
                                            {group[`service_${locale}`] ?? group.service_id}
                                        </h3>
                                    </div>
                                    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl leading-none transition-all duration-300 ${open === gi ? 'rotate-45 border-brand-600 bg-brand-600 text-white' : 'border-ink/15 text-ink'}`}>+</span>
                                </button>
                                <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.625,0.05,0,1)] ${open === gi ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                                    <div className="min-h-0 overflow-hidden">
                                    <div className="grid gap-10 pb-10 md:grid-cols-3">
                                        {group.categories.map((cat, ci) => (
                                            <div key={ci}>
                                                <h4 className="kicker text-ink/40">{cat[`name_${locale}`] ?? cat.name_id}</h4>
                                                <ul className="mt-5 space-y-3">
                                                    {cat.tests.map((test) => (
                                                        <li key={test.slug}>
                                                            <span className="text-sm font-medium text-ink/85">{test[`name_${locale}`] ?? test.name_id}</span>
                                                            {(test.standards?.length ?? 0) > 0 && (
                                                                <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.12em] text-ink/40">
                                                                    {test.standards.join(' · ')}
                                                                </span>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="border-b border-ink/10 py-6">
                            <Link href={buildHref('/layanan')} className="font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink">
                                {t('common.download_sheet')}
                            </Link>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

function InsightsTeaser({ insights }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)
    if (!insights?.length) return null

    return (
        <section className="section-pad border-t border-ink/10 bg-white">
            <div className="container-site">
                <div className="flex flex-wrap items-end justify-between gap-6">
                    <SectionHeading eyebrow={t('nav.insights')} title={t('home.insights_title')} />
                    <Link href={buildHref('/insight')} className="font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors hover:decoration-ink">
                        {t('common.see_all')}
                    </Link>
                </div>
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {insights.map((post, i) => (
                        <Reveal key={post.slug} delay={i * 120}>
                            <Link href={buildHref(`/insight/${post.slug}`)} className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white transition-colors duration-200 hover:border-ink/25">
                                <div className="relative aspect-[16/9] overflow-hidden">
                                    <img src={post.cover ? `/storage/${post.cover}` : INSIGHT_IMAGES[i % INSIGHT_IMAGES.length].src} alt={post.cover ? (post[`title_${locale}`] ?? post.title_id) : alt(INSIGHT_IMAGES[i % INSIGHT_IMAGES.length], locale)} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                </div>
                                <div className="flex flex-1 flex-col p-7">
                                <div className="flex items-center justify-between gap-4">
                                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">{post.type}</span>
                                    <span className="font-mono text-xs text-ink/40">
                                        {new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'id-ID', { dateStyle: 'medium' }).format(new Date(post.published_at))}
                                    </span>
                                </div>
                                <h3 className="mt-6 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand-600">
                                    {post[`title_${locale}`] ?? post.title_id}
                                </h3>
                                <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/60">{post[`excerpt_${locale}`] ?? post.excerpt_id}</p>
                                <span className="mt-6 inline-block font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors group-hover:decoration-ink">
                                    {t('insight.read_more')}
                                </span>
                                </div>
                            </Link>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CtaBand() {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)
    const site = usePage().props.site

    return (
        <section className="relative overflow-hidden" aria-labelledby="cta-heading">
            <div className="absolute inset-0 cta-gradient" />
            <div className="absolute inset-0 dot-grid" />
            <div className="absolute inset-0">
                <div className="floating-shape floating-shape-1" />
                <div className="floating-shape floating-shape-2" />
                <div className="floating-shape floating-shape-3" />
            </div>
            <div className="container-site relative pb-16 pt-16 lg:pb-24 lg:pt-24">
                <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
                    <div className="relative max-w-xl">
                        <Reveal>
                            <p className="kicker text-white/70">{t('footer.question')}</p>
                        </Reveal>
                        <Reveal delay={100}>
                            <h2 id="cta-heading" className="display-xl mt-4 font-bold text-white">
                                {locale === 'en' ? 'Ready to start your testing project?' : 'Siap memulai proyek pengujian Anda?'}
                            </h2>
                        </Reveal>
                        <Reveal delay={200}>
                            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/80">
                                {locale === 'en'
                                    ? 'Tell us your soil, rock, or environmental testing needs. Our team responds within 24 hours on working days.'
                                    : 'Ceritakan kebutuhan pengujian tanah, batuan, atau lingkungan Anda. Tim kami merespons dalam 1×24 jam pada jam kerja.'}
                            </p>
                        </Reveal>
                        <Reveal delay={300}>
                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <Button href={buildHref('/kontak') + '#lead'} size="lg" variant="light">
                                    {t('common.cta_quote')}
                                </Button>
                                <Button href={buildHref('/layanan')} size="lg" variant="underline">
                                    {t('common.cta_services')}
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                    <div className="relative hidden lg:block">
                        <Reveal delay={400}>
                            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                                <svg viewBox="0 0 384 384" className="w-full h-full text-white/10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#005ca5" stopOpacity="0.3"/>
                                            <stop offset="100%" stopColor="#47a2d8" stopOpacity="0.1"/>
                                        </linearGradient>
                                    </defs>
                                    <circle cx="192" cy="192" r="160" fill="url(#grad1)" />
                                    <g opacity="0.5">
                                        <path d="M192 80a112 112 0 1 1 0 224 112 112 0 0 1 0-224z" stroke="url(#grad1)" strokeWidth="2" fill="none" strokeDasharray="10,10" />
                                        <circle cx="192" cy="192" r="70" fill="none" stroke="url(#grad1)" strokeWidth="1.5" />
                                        <circle cx="192" cy="192" r="40" fill="url(#grad1)" />
                                    </g>
                                    <g transform="translate(192, 192)">
                                        <path d="M0 -110 L0 -130" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="0" cy="-140" r="4" fill="url(#grad1)" />
                                    </g>
                                    <g transform="translate(192, 192) rotate(120)">
                                        <path d="M0 -110 L0 -130" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="0" cy="-140" r="4" fill="url(#grad1)" />
                                    </g>
                                    <g transform="translate(192, 192) rotate(240)">
                                        <path d="M0 -110 L0 -130" stroke="url(#grad1)" strokeWidth="2" strokeLinecap="round" />
                                        <circle cx="0" cy="-140" r="4" fill="url(#grad1)" />
                                    </g>
                                </svg>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default function Home({ services, menu, insights, clients }) {
    return (
        <PublicLayout>
            <Head><title>PT Wall Street Indonesia | Laboratorium Tanah, Batuan & Lingkungan</title></Head>
            <Hero />
            <Stats />
            <Services services={services} />
            <Why />
            <ClientMarquee clients={clients} />
            <FieldStrip />
            <TestMenu menu={menu} />
            <InsightsTeaser insights={insights} />
            <CtaBand />
        </PublicLayout>
    )
}

import PublicLayout from '../Layouts/PublicLayout'
import Reveal from '../Components/ui/Reveal'
import Seo from '../Components/Seo'
import SectionHeading from '../Components/ui/SectionHeading'
import PageHero from '../Components/ui/PageHero'
import { PROJECT_FALLBACKS } from '../Components/ui/media'
import { useTrans } from '../hooks/useTrans'

const SECTORS = [
    { key: 'mining', label_id: 'Pertambangan', label_en: 'Mining', icon: 'mining' },
    { key: 'construction', label_id: 'Konstruksi', label_en: 'Construction', icon: 'construction' },
    { key: 'infrastructure', label_id: 'Infrastruktur & Jalan', label_en: 'Infrastructure & Roads', icon: 'directions_rail' },
    { key: 'dam', label_id: 'Bendungan / Dam', label_en: 'Dams', icon: 'water_dam' },
    { key: 'energy', label_id: 'Energi & Pembangkit', label_en: 'Energy & Power Plants', icon: 'electric_bolt' },
    { key: 'ikn', label_id: 'IKN', label_en: 'IKN', icon: 'location_city' },
]

const FALLBACK_CLIENT_LOGO = '/images/clients/logo-alenkosa-icon.png'

export default function Clients({ clients, projects }) {
    const { locale } = useTrans()

    return (
        <PublicLayout>
            <Seo title={locale === 'en' ? 'Clients & Portfolio | PT Wall Street Indonesia' : 'Klien & Portofolio | PT Wall Street Indonesia'} />
            <PageHero
                eyebrow={locale === 'en' ? 'Clients & Portfolio' : 'Klien & Portofolio'}
                title={locale === 'en' ? 'Trusted across mining & infrastructure' : 'Terpercaya di sektor pertambangan & infrastruktur'}
                lead={locale === 'en' ? 'We serve companies across sectors that demand certainty in soil, rock and environmental testing quality.' : 'Kami melayani perusahaan di berbagai sektor yang membutuhkan kepastian kualitas pengujian tanah, batuan dan lingkungan.'}
            />

            <section className="section-pad section-gradient-subtle border-t border-ink/10">
                <div className="container-site">
                    <Reveal>
                        <SectionHeading eyebrow={locale === 'en' ? 'Sectors' : 'Sektor'} title={locale === 'en' ? 'Who we serve' : 'Yang kami layani'} />
                        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {SECTORS.map((sector, i) => (
                                <div key={sector.key} className="group flex items-center gap-4 rounded-lg border border-ink/10 bg-white p-6 transition-colors duration-200 hover:border-ink/25 hover:shadow-lg hover:shadow-brand-600/10">
                                    <span className="icon-wrapper icon-wrapper-sm">
                                        <span className="material-symbols-outlined">{sector.icon}</span>
                                    </span>
                                    <span className="text-xl font-bold text-ink">{locale === 'en' ? sector.label_en : sector.label_id}</span>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    <Reveal delay={120}>
                        <div className="mt-20">
                            <SectionHeading eyebrow={locale === 'en' ? 'Clients' : 'Klien'} title={locale === 'en' ? 'Companies who trust us' : 'Perusahaan yang mempercayai kami'} />
                            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                                {clients.length === 0 && (
                                    <p className="col-span-full rounded-lg border border-dashed border-ink/15 px-6 py-12 text-center text-ink/50">
                                        {locale === 'en'
                                            ? 'Client logotypes will appear here.'
                                            : 'Logo klien akan ditampilkan di sini.'}
                                    </p>
                                )}
                                {clients.map((c) => (
                                    <a
                                        key={c.id}
                                        href={c.website || '#'}
                                        target={c.website ? '_blank' : undefined}
                                        rel="noreferrer"
                                        title={c.name}
                                        className="flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white p-4 text-center transition-all duration-200 hover:-translate-y-1 hover:border-brand-600/40 hover:shadow-lg hover:shadow-brand-600/10"
                                    >
                                        {c.logo ? (
                                            <img src={`/storage/${c.logo}`} alt={c.name} loading="lazy" decoding="async" className="max-h-12 max-w-[70%] object-contain" />
                                        ) : (
                                            <img src={FALLBACK_CLIENT_LOGO} alt="" aria-hidden="true" loading="lazy" decoding="async" className="h-11 w-11 rounded-lg border border-ink/10 object-contain p-1" />
                                        )}
                                        <span className="line-clamp-2 text-center text-xs font-bold leading-snug text-ink/70">{c.name}</span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {projects.length > 0 && (
                        <Reveal delay={160}>
                            <div className="mt-20">
                                <SectionHeading eyebrow="Portofolio" title={locale === 'en' ? 'Selected projects' : 'Proyek terpilih'} />
                                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                                    {projects.map((p) => {
                                        const name = p[`name_${locale}`] ?? p.name_id
                                        const location = p[`location_${locale}`] ?? p.location_id
                                        const summary = p[`summary_${locale}`] ?? p.summary_id
                                        const cover = p.cover_url ? { src: p.cover_url } : PROJECT_FALLBACKS[p.id % PROJECT_FALLBACKS.length]
                                        return (
                                            <div key={p.id} className="group flex h-full flex-col overflow-hidden rounded-lg border border-ink/10 bg-white transition-colors duration-200 hover:border-ink/25">
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <img src={cover.src} alt={name} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/10 to-transparent p-6">
                                                        <span className="relative rounded border border-white/25 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85">{p.category}</span>
                                                        <span className="relative font-mono text-xs text-white/70">{p.year}</span>
                                                    </div>
                                                    {p.is_featured && (
                                                        <span className="absolute right-3 top-3 rounded bg-brand-600 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-white">Featured</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-1 flex-col p-6">
                                                    <h3 className="text-xl font-bold leading-snug text-ink">{name}</h3>
                                                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-ink/40">
                                                        {p.client_name || p.client?.name}
                                                        {location && <span> · {location}</span>}
                                                        {p.year && <span> · {p.year}</span>}
                                                    </p>
                                                    {summary && <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/60">{summary}</p>}
                                                    {p.highlights?.length > 0 && (
                                                        <ul className="mt-auto space-y-1.5 pt-4">
                                                            {p.highlights.slice(0, 3).map((h, i) => (
                                                                <li key={i} className="flex items-start gap-2 font-mono text-xs text-ink/50">
                                                                    <span className="mt-0.5 text-brand-600">▸</span>
                                                                    {h}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>
            </section>
        </PublicLayout>
    )
}

import { Link } from '@inertiajs/react'
import PublicLayout from '../../Layouts/PublicLayout'
import Reveal from '../../Components/ui/Reveal'
import Seo from '../../Components/Seo'
import PageHero from '../../Components/ui/PageHero'
import { INSIGHT_IMAGES, alt } from '../../Components/ui/media'
import { useTrans, localizedPath } from '../../hooks/useTrans'

export default function InsightsIndex({ insights }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)

    return (
        <PublicLayout>
            <Seo title={locale === 'en' ? 'Insight | PT Wall Street Indonesia' : 'Insight | PT Wall Street Indonesia'} />
            <PageHero
                eyebrow={t('nav.insights')}
                title={locale === 'en' ? 'Geotechnical & mining industry notes' : 'Wawasan industri geoteknik & pertambangan'}
                lead={locale === 'en' ? 'Articles and notes from the laboratory team on soil, rock, environmental testing and industry best practice.' : 'Artikel dan catatan dari tim laboratorium seputar pengujian tanah, batuan, lingkungan dan praktik terbaik industri.'}
            />

            <section className="section-pad border-t border-ink/10 bg-white">
                <div className="container-site">
                    {insights?.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                            {insights.map((post, i) => (
                                <Reveal key={post.slug} delay={i * 80}>
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
                                        <h2 className="mt-6 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand-600">
                                            {post[`title_${locale}`] ?? post.title_id}
                                        </h2>
                                        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ink/60">{post[`excerpt_${locale}`] ?? post.excerpt_id}</p>
                                        <span className="mt-6 inline-block font-mono text-[13px] uppercase tracking-[0.04em] text-ink underline decoration-ink/30 underline-offset-8 transition-colors group-hover:decoration-ink">{t('insight.read_more')}</span>
                                        </div>
                                    </Link>
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-ink/15 px-8 py-20 text-center">
                            <h2 className="display-lg">{locale === 'en' ? 'No articles published yet' : 'Belum ada artikel diterbitkan'}</h2>
                            <p className="mx-auto mt-4 max-w-lg text-ink/60">
                                    {locale === 'en' ? 'Insight content is on its way. Check back for geotechnical, mining and environmental updates.' : 'Konten wawasan akan segera hadir. Pantau halaman ini untuk update geoteknik, pertambangan, dan lingkungan.'}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    )
}

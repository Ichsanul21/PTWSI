import { Link } from '@inertiajs/react'
import PublicLayout from '../../Layouts/PublicLayout'
import Seo from '../../Components/Seo'
import Button from '../../Components/ui/Button'
import { INSIGHT_IMAGES } from '../../Components/ui/media'
import { useTrans, localizedPath } from '../../hooks/useTrans'

export default function InsightShow({ post, related }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)

    const title = post[`title_${locale}`] ?? post.title_id
    const excerpt = post[`excerpt_${locale}`] ?? post.excerpt_id
    const body = (post[`body_${locale}`] ?? post.body_id ?? '').split(/\n\s*\n/).filter(Boolean)
    const date = new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'id-ID', { dateStyle: 'long' }).format(new Date(post.published_at))
    const category = post[`category_${locale}`] || post.category_id
    const imgSrc = post.cover ? `/storage/${post.cover}` : INSIGHT_IMAGES[(post.id ?? 0) % INSIGHT_IMAGES.length].src

    return (
        <PublicLayout>
            <Seo title={`${title} | PT Wall Street Indonesia`} description={`${excerpt}. ${post[`title_${locale}`]}`} />

            <article>
                <header className="relative overflow-hidden bg-white">
                    <div className="dot-grid absolute inset-0 opacity-60" />
                    <div className="container-site relative pb-16 pt-40 lg:pb-20 lg:pt-48">
                        <Link href={buildHref('/insight')} className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-ink">
                            <span className="transition-transform group-hover:-translate-x-1">←</span> {t('common.cta_back')}
                        </Link>
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <span className="rounded bg-brand-600 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em] text-white">{post.type}</span>
                            <span className="font-mono text-xs uppercase tracking-[0.1em] text-ink/40">{date}</span>
                            {category && (
                                <span className="rounded border border-ink/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/60">{category}</span>
                            )}
                        </div>
                        <h1 className="display-xl mt-6 max-w-5xl">{title}</h1>
                        {excerpt && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/60">{excerpt}</p>}
                        <div className="divider-line mt-10" />
                    </div>
                </header>

                <div className="section-pad border-t border-ink/10 bg-white">
                    <div className="container-site">
                        <figure className="relative mb-14 overflow-hidden rounded-lg border border-ink/10">
                            <img src={imgSrc} alt={title} loading="lazy" decoding="async" className="aspect-[21/9] w-full object-cover" />
                        </figure>
                    </div>
                    <div className="mx-auto max-w-4xl px-6 lg:px-8">
                        {body.length > 0 ? (
                            <div className="rounded-lg border border-ink/10 bg-white p-8 shadow-xl shadow-black/5 sm:p-12">
                                {body.map((para, i) => (
                                    <p key={i} className="mb-6 text-[17px] leading-relaxed text-ink/80 last:mb-0">{para}</p>
                                ))}
                            </div>
                        ) : (
                            <p className="rounded-lg border border-dashed border-ink/15 px-8 py-16 text-center text-ink/50">
                                {t('insight.pending_body')}
                            </p>
                        )}

                        {related.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-ink">{t('insight.related')}</h2>
                                <div className="mt-6 grid gap-5 md:grid-cols-3">
                                    {related.map((r) => (
                                        <Link key={r.slug} href={buildHref(`/insight/${r.slug}`)} className="group flex h-full flex-col rounded-lg border border-ink/10 bg-white p-6 transition-colors duration-200 hover:border-ink/25">
                                            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">{r.type}</p>
                                            <h3 className="mt-3 font-bold leading-snug text-ink transition-colors group-hover:text-brand-600">{r[`title_${locale}`]}</h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="mt-16 text-center">
                            <Button href={buildHref('/kontak')} size="lg">{t('common.cta_quote')}</Button>
                        </div>
                    </div>
                </div>
            </article>
        </PublicLayout>
    )
}

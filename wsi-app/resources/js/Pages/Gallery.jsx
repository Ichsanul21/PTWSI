import { useState } from 'react'
import PublicLayout from '../Layouts/PublicLayout'
import Reveal from '../Components/ui/Reveal'
import Seo from '../Components/Seo'
import Button from '../Components/ui/Button'
import PageHero from '../Components/ui/PageHero'
import { GALLERY_BANNER, alt } from '../Components/ui/media'
import { useTrans, localizedPath } from '../hooks/useTrans'

export default function Gallery({ items, services }) {
    const { t, locale } = useTrans()
    const buildHref = (path) => localizedPath(locale, path)

    const categories = ['Semua', ...new Set(items.map((i) => i.category).filter(Boolean))]
    const [active, setActive] = useState('Semua')
    const visible = active === 'Semua' ? items : items.filter((i) => i.category === active)

    return (
        <PublicLayout>
            <Seo title={locale === 'en' ? 'Gallery | PT Wall Street Indonesia' : 'Galeri | PT Wall Street Indonesia'} />
            <PageHero
                eyebrow={locale === 'en' ? 'Gallery' : 'Galeri'}
                title={locale === 'en' ? 'Inside the laboratory' : 'Dokumentasi aktivitas laboratorium'}
                lead={locale === 'en' ? 'Testing activity, equipment and project documentation. Tangible proof of field quality.' : 'Kegiatan pengujian, peralatan dan dokumentasi proyek. Bukti nyata kualitas pengerjaan di lapangan.'}
            />

            <section className="section-pad border-t border-ink/10 bg-white">
                <div className="container-site">
                    {categories.length > 1 && (
                        <div className="mb-10 flex flex-wrap gap-2">
                            {categories.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => setActive(c)}
                                    className={`rounded px-5 py-2.5 font-mono text-[13px] uppercase tracking-[0.04em] transition-colors ${active === c ? 'bg-ink text-white' : 'border border-ink/15 text-ink/60 hover:border-ink/30 hover:text-ink'}`}
                                >
                                    {c}
                                </button>
                            ))}
                        </div>
                    )}

                    {visible.length === 0 ? (
                        <Reveal>
                            <div className="rounded-lg border border-dashed border-ink/15 px-8 py-20 text-center">
                                <img src={GALLERY_BANNER.src} alt={alt(GALLERY_BANNER, locale)} loading="lazy" decoding="async" className="mx-auto mb-10 aspect-[21/9] w-full max-w-3xl rounded-lg border border-ink/10 object-cover" />
                                <h2 className="display-lg">
                                    {locale === 'en' ? 'Gallery is being assembled' : 'Galeri sedang dirakit'}
                                </h2>
                                <p className="mx-auto mt-4 max-w-lg text-ink/60">
                                    {locale === 'en'
                                        ? 'Testing activity, equipment and project documentation will appear here to reinforce credibility.'
                                        : 'Dokumentasi kegiatan uji, peralatan dan proyek akan tampil di sini untuk memperkuat kredibilitas.'}
                                </p>
                                <div className="mt-8 flex justify-center">
                                    <Button href={buildHref('/kontak')} size="lg">{t('common.cta_quote')}</Button>
                                </div>
                            </div>
                        </Reveal>
                    ) : (
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {visible.map((item, i) => (
                                <Reveal key={item.id} delay={(i % 3) * 80}>
                                    <figure className="group relative h-full overflow-hidden rounded-lg border border-ink/10 bg-ink/[0.03]">
                                        <div className="aspect-[4/3] w-full overflow-hidden">
                                            {item.media ? (
                                                <img
                                                    src={`/storage/${item.media}`}
                                                    alt={item.title}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center">
                                                    <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink/40">{item.title}</span>
                                                </div>
                                            )}
                                        </div>
                                        <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/85 via-black/30 to-transparent px-6 pb-5 pt-14">
                                            <div>
                                                <p className="text-sm font-bold text-white">{item.title}</p>
                                                {item.category && <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-brand-300">{item.category}</p>}
                                            </div>
                                        </figcaption>
                                    </figure>
                                </Reveal>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    )
}

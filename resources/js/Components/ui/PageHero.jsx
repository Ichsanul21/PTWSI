import Reveal from './Reveal'
import BlinkDot from './BlinkDot'

export default function PageHero({ eyebrow, title, lead, meta }) {
    return (
        <section className="relative overflow-hidden bg-white">
            <div className="dot-grid absolute inset-0 opacity-60" />
            <div className="absolute -top-40 left-1/2 h-96 w-[60rem] max-w-none -translate-x-1/2 rounded-full bg-brand-600/10 blur-3xl" />
            <div className="container-site relative pb-16 pt-40 lg:pb-20 lg:pt-48">
                <Reveal>
                    <p className="kicker flex items-center gap-4 text-ink/50">
                        <BlinkDot />
                        {eyebrow}
                    </p>
                </Reveal>
                <Reveal delay={100}>
                    <h1 className="display-xl mt-8 max-w-5xl">{title}</h1>
                </Reveal>
                <Reveal delay={180}>
                    <div className="divider-line mt-10" />
                </Reveal>
                {(lead || meta) && (
                    <Reveal delay={240}>
                        <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                            {lead && <p className="max-w-xl text-base leading-relaxed text-fog sm:text-lg">{lead}</p>}
                            {meta && (
                                <p className="shrink-0 font-mono text-xs uppercase tracking-[0.18em] text-ink/40">{meta}</p>
                            )}
                        </div>
                    </Reveal>
                )}
            </div>
        </section>
    )
}

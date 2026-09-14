import { useState } from 'react'
import { useForm, usePage } from '@inertiajs/react'
import PublicLayout from '../Layouts/PublicLayout'
import Reveal from '../Components/ui/Reveal'
import Seo from '../Components/Seo'
import Button from '../Components/ui/Button'
import PageHero from '../Components/ui/PageHero'
import { useTrans, localizedPath } from '../hooks/useTrans'

const inputClass =
    'w-full rounded border border-black/15 bg-white px-4 py-3 text-sm text-[#19191a] placeholder:text-[#19191a]/35 transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20'

export default function Contact({ services }) {
    const { t, locale } = useTrans()
    const site = usePage().props.site
    const brand = site?.brand ?? {}
    const flash = usePage().props.flash ?? {}
    const buildHref = (path) => localizedPath(locale, path)

    const form = useForm({
        name: '',
        company: '',
        email: '',
        phone: '',
        service_id: '',
        message: '',
        website: '',
    })

    const [sent, setSent] = useState(false)

    const submit = (e) => {
        e.preventDefault()
        form.post(buildHref('/kontak'), {
            preserveScroll: true,
            onSuccess: () => {
                form.reset()
                setSent(true)
            },
        })
    }

    return (
        <PublicLayout>
            <Seo title={locale === 'en' ? 'Contact | PT Wall Street Indonesia' : 'Kontak | PT Wall Street Indonesia'} />
            <PageHero
                eyebrow={t('nav.contact')}
                title={locale === 'en' ? 'Start your testing project' : 'Mulai proyek pengujian Anda'}
                lead={locale === 'en' ? 'Tell us your soil, rock or environmental testing needs. Our team responds within 24 hours on working days.' : 'Ceritakan kebutuhan pengujian tanah, batuan atau lingkungan. Tim kami merespons dalam 1×24 jam pada jam kerja.'}
                meta="0.5036ºS / 117.1214ºE"
            />

            <section className="section-pad border-t border-ink/10 bg-white">
                <div className="container-site">
                    <div className="grid gap-8 lg:grid-cols-12">
                        <Reveal className="lg:col-span-7">
                            <div id="lead" className="scroll-mt-32 rounded-lg border border-ink/10 bg-white p-8 shadow-xl shadow-black/5 sm:p-10">
                                <h2 className="text-2xl font-bold text-ink sm:text-3xl">{t('contact.lead_form')}</h2>
                                <p className="mt-2 text-sm text-ink/50">{t('contact.lead_note')}</p>

                                {(sent || flash.success) && (
                                    <div className="animate-menu-in mt-6 flex items-start gap-3 rounded border border-ink/10 bg-cream p-4 text-sm text-ink">
                                        <span className="text-brand-600">✓</span>
                                        <span>{t('form.success')}</span>
                                    </div>
                                )}

                                {form.errors && Object.keys(form.errors).length > 0 && (
                                    <div className="animate-menu-in mt-6 rounded border border-red-200 bg-red-50 p-4">
                                        {Object.values(form.errors).map((err, i) => (
                                            <p key={i} className="text-sm text-red-700">{err}</p>
                                        ))}
                                    </div>
                                )}

                                <form onSubmit={submit} className="mt-8 grid gap-5 sm:grid-cols-2" noValidate>
                                    <div style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true">
                                        <label htmlFor="f-website">Website</label>
                                        <input id="f-website" type="text" value={form.data.website} onChange={(e) => form.setData('website', e.target.value)} tabIndex={-1} autoComplete="off" />
                                    </div>
                                    <div>
                                        <label htmlFor="f-name" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50">{t('form.name')} *</label>
                                        <input id="f-name" value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} placeholder={t('form.name_ph')} className={inputClass} required />
                                    </div>
                                    <div>
                                        <label htmlFor="f-company" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50">{t('form.company')}</label>
                                        <input id="f-company" value={form.data.company} onChange={(e) => form.setData('company', e.target.value)} placeholder={t('form.company_ph')} className={inputClass} />
                                    </div>
                                    <div>
                                        <label htmlFor="f-email" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50">{t('form.email')} *</label>
                                        <input id="f-email" type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} placeholder="nama@perusahaan.com" className={inputClass} required />
                                    </div>
                                    <div>
                                        <label htmlFor="f-phone" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50">{t('form.phone')}</label>
                                        <input id="f-phone" type="tel" value={form.data.phone} onChange={(e) => form.setData('phone', e.target.value)} placeholder="08xx-xxxx-xxxx" className={inputClass} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="f-service" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50">{t('form.service')}</label>
                                        <select id="f-service" value={form.data.service_id} onChange={(e) => form.setData('service_id', e.target.value)} className={inputClass}>
                                            <option value="">{t('form.service_ph')}</option>
                                            {services.map((s) => (
                                                <option key={s.id} value={s.id}>{s[`name_${locale}`] ?? s.name_id}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <label htmlFor="f-message" className="mb-1.5 block font-mono text-xs uppercase tracking-[0.1em] text-ink/50">{t('form.message')}</label>
                                        <textarea id="f-message" rows="5" value={form.data.message} onChange={(e) => form.setData('message', e.target.value)} placeholder={t('form.message_ph')} className={inputClass} />
                                    </div>
                                    <div className="sm:col-span-2">
                                        <Button as="button" type="submit" size="lg" disabled={form.processing} className="w-full disabled:opacity-60 sm:w-auto">
                                            {form.processing ? '…' : t('common.cta_send')}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </Reveal>

                        <Reveal delay={120} className="lg:col-span-5">
                            <div className="space-y-5">
                                <div className="rounded-lg border border-ink/10 bg-ink/[0.02] p-8">
                                    <h3 className="kicker mb-5 text-ink/40">{locale === 'en' ? 'Direct contact' : 'Hubungi langsung'}</h3>
                                    <ul className="space-y-5 text-sm">
                                        {brand.phones?.map((phone) => (
                                            <li key={phone}>
                                                <span className="block font-mono text-xs uppercase tracking-[0.1em] text-ink/40">WhatsApp / Telepon</span>
                                                <a href={`tel:${phone.replace(/-/g, '')}`} className="mt-1 block text-2xl font-bold text-ink transition-colors hover:text-brand-600">
                                                    {phone}
                                                </a>
                                            </li>
                                        ))}
                                        <li>
                                            <span className="block font-mono text-xs uppercase tracking-[0.1em] text-ink/40">Email</span>
                                            <a href={`mailto:${brand.email}`} className="mt-1 block break-all font-semibold text-ink transition-colors hover:text-brand-600">
                                                {brand.email}
                                            </a>
                                        </li>
                                        <li>
                                            <span className="block font-mono text-xs uppercase tracking-[0.1em] text-ink/40">{t('footer.working_hours')}</span>
                                            <span className="mt-1 block font-medium text-ink/80">{brand.working_hours}</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="rounded-lg border border-ink/10 bg-ink/[0.02] p-8">
                                    <h3 className="kicker mb-4 text-ink/40">{t('footer.find_us')}</h3>
                                    <p className="text-sm leading-relaxed text-ink/70">{brand[`address_${locale}`] ?? brand.address_id}</p>
                                    <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-ink/40">0.5036ºS / 117.1214ºE</p>
                                </div>

                                <a
                                    href={`https://wa.me/${brand.phone_wa ?? ''}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center justify-between rounded-lg bg-brand-600 p-6 text-white transition-colors duration-200 hover:bg-brand-500"
                                >
                                    <div>
                                        <p className="text-xl font-bold">{t('common.cta_wa')}</p>
                                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-white/70">
                                            {locale === 'en' ? 'Fastest response on working days' : 'Respon tercepat pada jam kerja'}
                                        </p>
                                    </div>
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 text-lg transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                                </a>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </PublicLayout>
    )
}

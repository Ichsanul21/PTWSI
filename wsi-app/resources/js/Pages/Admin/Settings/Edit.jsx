import { useForm } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, Textarea } from '../../../Components/admin/ui'

function Group({ label, children }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="mb-5 font-display font-bold text-slate-900">{label}</h2>
            <div className="grid gap-5 sm:grid-cols-2">{children}</div>
        </div>
    )
}

export default function AdminSettings({ settings }) {
    const form = useForm({ brand: settings.brand, hero: settings.hero, about: settings.about, stats: settings.stats, seo: settings.seo })

    const setNested = (group, key, value) => {
        form.setData(group, { ...form.data[group], [key]: value })
    }

    const submit = (e) => {
        e.preventDefault()
        form.put('/admin/settings', { preserveScroll: true })
    }

    return (
        <AdminLayout title="Pengaturan Situs">
            <form onSubmit={submit} className="space-y-6">
                <Group label="Brand & Kontak">
                    <Field label="Nama Perusahaan">
                        <Input value={form.data.brand?.name ?? ''} onChange={(e) => setNested('brand', 'name', e.target.value)} />
                    </Field>
                    <Field label="Tagline (ID)">
                        <Input value={form.data.brand?.tagline_id ?? ''} onChange={(e) => setNested('brand', 'tagline_id', e.target.value)} />
                    </Field>
                    <Field label="Tagline (EN)">
                        <Input value={form.data.brand?.tagline_en ?? ''} onChange={(e) => setNested('brand', 'tagline_en', e.target.value)} />
                    </Field>
                    <Field label="WhatsApp (format 62…)">
                        <Input value={form.data.brand?.phone_wa ?? ''} onChange={(e) => setNested('brand', 'phone_wa', e.target.value)} />
                    </Field>
                    <Field label="Email">
                        <Input value={form.data.brand?.email ?? ''} onChange={(e) => setNested('brand', 'email', e.target.value)} />
                    </Field>
                    <Field label="Jam Operasional">
                        <Input value={form.data.brand?.working_hours ?? ''} onChange={(e) => setNested('brand', 'working_hours', e.target.value)} />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Telepon (pisah koma)">
                            <Input value={(form.data.brand?.phones ?? []).join(', ')} onChange={(e) => setNested('brand', 'phones', e.target.value.split(',').map((s) => s.trim()).filter(Boolean))} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Alamat (ID)">
                            <Input value={form.data.brand?.address_id ?? ''} onChange={(e) => setNested('brand', 'address_id', e.target.value)} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Alamat (EN)">
                            <Input value={form.data.brand?.address_en ?? ''} onChange={(e) => setNested('brand', 'address_en', e.target.value)} />
                        </Field>
                    </div>
                </Group>

                <Group label="Hero (Beranda)">
                    <Field label="Judul (ID)">
                        <Input value={form.data.hero?.title_id ?? ''} onChange={(e) => setNested('hero', 'title_id', e.target.value)} />
                    </Field>
                    <Field label="Judul (EN)">
                        <Input value={form.data.hero?.title_en ?? ''} onChange={(e) => setNested('hero', 'title_en', e.target.value)} />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Subjudul (ID)">
                            <Textarea rows={2} value={form.data.hero?.subtitle_id ?? ''} onChange={(e) => setNested('hero', 'subtitle_id', e.target.value)} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Subjudul (EN)">
                            <Textarea rows={2} value={form.data.hero?.subtitle_en ?? ''} onChange={(e) => setNested('hero', 'subtitle_en', e.target.value)} />
                        </Field>
                    </div>
                </Group>

                <Group label="Tentang">
                    <div className="sm:col-span-2">
                        <Field label="Lead (ID)">
                            <Textarea rows={3} value={form.data.about?.lead_id ?? ''} onChange={(e) => setNested('about', 'lead_id', e.target.value)} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Lead (EN)">
                            <Textarea rows={3} value={form.data.about?.lead_en ?? ''} onChange={(e) => setNested('about', 'lead_en', e.target.value)} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Body (ID)">
                            <Textarea rows={4} value={form.data.about?.body_id ?? ''} onChange={(e) => setNested('about', 'body_id', e.target.value)} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Body (EN)">
                            <Textarea rows={4} value={form.data.about?.body_en ?? ''} onChange={(e) => setNested('about', 'body_en', e.target.value)} />
                        </Field>
                    </div>
                </Group>

                <Group label="Statistik (count-up di Beranda)">
                    {(form.data.stats ?? []).map((s, i) => (
                        <div key={i} className="grid gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 sm:col-span-2 sm:grid-cols-4">
                            <Input value={s.value ?? ''} onChange={(e) => setStat(form, i, 'value', e.target.value)} placeholder="nilai (cth: 60+)" />
                            <Input value={s.suffix ?? ''} onChange={(e) => setStat(form, i, 'suffix', e.target.value)} placeholder="suffix (cth: %)" />
                            <Input value={s.label_id ?? ''} onChange={(e) => setStat(form, i, 'label_id', e.target.value)} placeholder="label ID" />
                            <Input value={s.label_en ?? ''} onChange={(e) => setStat(form, i, 'label_en', e.target.value)} placeholder="label EN" />
                        </div>
                    ))}
                    <div className="sm:col-span-2">
                        <button type="button" onClick={() => form.setData('stats', [...(form.data.stats ?? []), { value: '', suffix: '', label_id: '', label_en: '' }])} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                            + Tambah statistik
                        </button>
                    </div>
                </Group>

                <Group label="SEO Lokasi (Schema.org)">
                    <Field label="Latitude">
                        <Input value={form.data.seo?.lat ?? ''} onChange={(e) => setNested('seo', 'lat', e.target.value)} />
                    </Field>
                    <Field label="Longitude">
                        <Input value={form.data.seo?.lng ?? ''} onChange={(e) => setNested('seo', 'lng', e.target.value)} />
                    </Field>
                    <div className="sm:col-span-2">
                        <Field label="Meta Description (ID)">
                            <Textarea rows={2} value={form.data.seo?.description_id ?? ''} onChange={(e) => setNested('seo', 'description_id', e.target.value)} />
                        </Field>
                    </div>
                    <div className="sm:col-span-2">
                        <Field label="Meta Description (EN)">
                            <Textarea rows={2} value={form.data.seo?.description_en ?? ''} onChange={(e) => setNested('seo', 'description_en', e.target.value)} />
                        </Field>
                    </div>
                </Group>

                <div className="flex justify-end">
                    <button type="submit" disabled={form.processing} className="rounded-xl bg-brand-600 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500 disabled:opacity-60">
                        {form.processing ? 'Menyimpan…' : 'Simpan Pengaturan'}
                    </button>
                </div>
            </form>
        </AdminLayout>
    )
}

function setStat(form, i, key, value) {
    const next = [...form.data.stats]
    next[i] = { ...next[i], [key]: value }
    form.setData('stats', next)
}
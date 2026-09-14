import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, Textarea, Toggle } from '../../../Components/admin/ui'

export default function AdminServiceForm({ service, categories }) {
    const editing = Boolean(service)

    const form = useForm(
        editing
            ? {
                  name_id: service.name_id,
                  name_en: service.name_en,
                  slug: service.slug,
                  icon: service.icon ?? 'terrain',
                  short_id: service.short_id ?? '',
                  short_en: service.short_en ?? '',
                  standards: service.standards ?? '',
                  description_id: service.description_id ?? '',
                  description_en: service.description_en ?? '',
                  cover: null,
                  order: service.order,
                  is_active: service.is_active,
              }
            : {
                  name_id: '',
                  name_en: '',
                  slug: '',
                  icon: 'terrain',
                  short_id: '',
                  short_en: '',
                  standards: '',
                  description_id: '',
                  description_en: '',
                  cover: null,
                  order: 99,
                  is_active: true,
              },
    )

    const submit = (e) => {
        e.preventDefault()
        if (editing) {
            form.put(`/admin/services/${service.id}`, { preserveScroll: true })
        } else {
            form.post('/admin/services', { preserveScroll: true })
        }
    }

    return (
        <AdminLayout title={editing ? `Edit: ${service.name_id}` : 'Tambah Layanan'}>
            <form onSubmit={submit} className="grid gap-8 lg:grid-cols-3">
                <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Nama (Indonesia) *" error={form.errors.name_id}>
                            <Input value={form.data.name_id} onChange={(e) => form.setData('name_id', e.target.value)} required />
                        </Field>
                        <Field label="Nama (English) *" error={form.errors.name_en}>
                            <Input value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} required />
                        </Field>
                        <Field label="Slug" hint="= kosong: otomatis dari nama ID">
                            <Input value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                        </Field>
                        <Field label="Standar" hint="ex: SNI, ASTM, ISRM">
                            <Input value={form.data.standards} onChange={(e) => form.setData('standards', e.target.value)} />
                        </Field>
                        <Field label="Short (Indonesia)">
                            <Input value={form.data.short_id} onChange={(e) => form.setData('short_id', e.target.value)} />
                        </Field>
                        <Field label="Short (English)">
                            <Input value={form.data.short_en} onChange={(e) => form.setData('short_en', e.target.value)} />
                        </Field>
                        <Field label="Deskripsi (Indonesia)">
                            <Textarea rows={6} value={form.data.description_id} onChange={(e) => form.setData('description_id', e.target.value)} />
                        </Field>
                        <Field label="Deskripsi (English)">
                            <Textarea rows={6} value={form.data.description_en} onChange={(e) => form.setData('description_en', e.target.value)} />
                        </Field>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="mb-4 text-sm font-semibold text-slate-900">Pengaturan</p>
                        <div className="space-y-4">
                            <Field label="Ikon">
                                <select
                                    value={form.data.icon}
                                    onChange={(e) => form.setData('icon', e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900"
                                >
                                    <option value="terrain">terrain (tanah)</option>
                                    <option value="gem">gem (batuan)</option>
                                    <option value="droplets">droplets (air)</option>
                                </select>
                            </Field>
                            <Field label="Urutan">
                                <Input type="number" value={form.data.order} onChange={(e) => form.setData('order', e.target.value)} />
                            </Field>
                            <Field label="Cover" hint="jpg/png/webp, max 5MB" error={form.errors.cover}>
                                <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => form.setData('cover', e.target.files[0])} />
                            </Field>
                            {editing && service.cover && (
                                <img src={`/storage/${service.cover}`} alt="Cover saat ini" className="w-full rounded-xl border border-slate-100 object-cover" />
                            )}
                            <Toggle checked={form.data.is_active} onChange={(v) => form.setData('is_active', v)} label="Tampilkan di situs" />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="mb-4 text-sm font-semibold text-slate-900">Aksi</p>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={form.processing}
                                className="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-500 disabled:opacity-60"
                            >
                                {form.processing ? 'Menyimpan…' : 'Simpan'}
                            </button>
                            <Link href="/admin/services" className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">Batal</Link>
                        </div>
                    </div>
                </div>
            </form>

            {editing && categories?.length > 0 && (
                <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="font-display font-bold text-slate-900">Kategori dalam layanan ini</h2>
                        <Link href={`/admin/test-categories?service=${service.id}`} className="text-sm font-semibold text-brand-600">Kelola →</Link>
                    </div>
                    <ul className="divide-y divide-slate-100">
                        {categories.map((c) => (
                            <li key={c.id} className="flex items-center justify-between py-3 text-sm">
                                <span className="font-medium text-slate-900">{c.name_id}</span>
                                <span className="text-slate-400">{c.tests_count} metode</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </AdminLayout>
    )
}
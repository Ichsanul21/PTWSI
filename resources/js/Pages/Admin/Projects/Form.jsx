import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, Textarea, Select, Toggle } from '../../../Components/admin/ui'

const EMPTY = {
    name_id: '', name_en: '', slug: '', category: '', location_id: '', location_en: '', year: '',
    client_id: '', client_name: '', summary_id: '', summary_en: '', highlights: '',
    is_featured: false, is_published: true, cover: null,
}

export default function AdminProjectForm({ project, clients }) {
    const editing = Boolean(project)

    const form = useForm(
        editing
            ? {
                  name_id: project.name_id,
                  name_en: project.name_en ?? '',
                  slug: project.slug,
                  category: project.category ?? '',
                  location_id: project.location_id ?? '',
                  location_en: project.location_en ?? '',
                  year: project.year ?? '',
                  client_id: project.client_id ?? '',
                  client_name: project.client_name ?? '',
                  summary_id: project.summary_id ?? '',
                  summary_en: project.summary_en ?? '',
                  highlights: project.highlights?.join('\n') ?? '',
                  is_featured: project.is_featured,
                  is_published: project.is_published,
                  cover: null,
              }
            : EMPTY,
        {},
    )

    const submit = (e) => {
        e.preventDefault()
        if (editing) {
            form.put(`/admin/projects/${project.id}`, { preserveScroll: true })
        } else {
            form.post('/admin/projects', { preserveScroll: true })
        }
    }

    return (
        <AdminLayout title={editing ? `Edit: ${project.name_id}` : 'Tambah Proyek'}>
            <form onSubmit={submit} encType="multipart/form-data" className="grid gap-8 lg:grid-cols-3">
                <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Nama (ID) *" error={form.errors.name_id}>
                            <Input value={form.data.name_id} onChange={(e) => form.setData('name_id', e.target.value)} required />
                        </Field>
                        <Field label="Nama (EN)">
                            <Input value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} />
                        </Field>
                    </div>
                    <Field label="Slug" hint="kosongkan = otomatis">
                        <Input value={form.data.slug} onChange={(e) => form.setData('slug', e.target.value)} />
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Kategori (Proyek)">
                            <Input value={form.data.category} onChange={(e) => form.setData('category', e.target.value)} placeholder="ex: Bendungan" />
                        </Field>
                        <Field label="Tahun">
                            <Input value={form.data.year} onChange={(e) => form.setData('year', e.target.value)} placeholder="2025" />
                        </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Lokasi (ID)">
                            <Input value={form.data.location_id} onChange={(e) => form.setData('location_id', e.target.value)} />
                        </Field>
                        <Field label="Lokasi (EN)">
                            <Input value={form.data.location_en} onChange={(e) => form.setData('location_en', e.target.value)} />
                        </Field>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Klien (dari daftar)">
                            <Select value={form.data.client_id} onChange={(e) => form.setData('client_id', e.target.value)}>
                                <option value="">(tanpa relasi)</option>
                                {clients.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </Select>
                        </Field>
                        <Field label="Nama Klien (teks)">
                            <Input value={form.data.client_name} onChange={(e) => form.setData('client_name', e.target.value)} placeholder="pakai jika belum terdaftar" />
                        </Field>
                    </div>
                    <Field label="Ringkasan (ID)">
                        <Textarea rows={3} value={form.data.summary_id} onChange={(e) => form.setData('summary_id', e.target.value)} />
                    </Field>
                    <Field label="Ringkasan (EN)">
                        <Textarea rows={3} value={form.data.summary_en} onChange={(e) => form.setData('summary_en', e.target.value)} />
                    </Field>
                    <Field label="Highlights" hint="satu poin per baris">
                        <Textarea rows={4} value={form.data.highlights} onChange={(e) => form.setData('highlights', e.target.value)} />
                    </Field>
                </div>

                <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="mb-4 text-sm font-semibold text-slate-900">Media & Status</p>
                        <div className="space-y-4">
                            <Field label="Cover" hint="jpg/png/webp, max 5MB" error={form.errors.cover}>
                                <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => form.setData('cover', e.target.files[0])} />
                            </Field>
                            {editing && project.cover && (
                                <img src={`/storage/${project.cover}`} alt="Current cover" className="w-full rounded-xl border border-slate-100 object-cover" />
                            )}
                            <Toggle checked={form.data.is_featured} onChange={(v) => form.setData('is_featured', v)} label="Jadikan Featured" />
                            <Toggle checked={form.data.is_published} onChange={(v) => form.setData('is_published', v)} label="Terbitkan" />
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="mb-4 text-sm font-semibold text-slate-900">Aksi</p>
                        <div className="flex gap-3">
                            <button type="submit" disabled={form.processing} className="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60">
                                {form.processing ? 'Menyimpan…' : 'Simpan'}
                            </button>
                            <Link href="/admin/projects" className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">Batal</Link>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    )
}
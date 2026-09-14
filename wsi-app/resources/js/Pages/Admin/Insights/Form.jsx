import { useForm, Link } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, Textarea, Toggle } from '../../../Components/admin/ui'

const EMPTY = {
    title_id: '',
    title_en: '',
    type: 'insight',
    category_id: '',
    category_en: '',
    author: '',
    excerpt_id: '',
    excerpt_en: '',
    body_id: '',
    body_en: '',
    cover: null,
    published_at: '',
    is_published: false,
}

export default function AdminInsightForm({ insight }) {
    const editing = Boolean(insight)

    const form = useForm(
        editing
            ? {
                  title_id: insight.title_id,
                  title_en: insight.title_en ?? '',
                  type: insight.type ?? 'insight',
                  category_id: insight.category_id ?? '',
                  category_en: insight.category_en ?? '',
                  author: insight.author ?? '',
                  excerpt_id: insight.excerpt_id ?? '',
                  excerpt_en: insight.excerpt_en ?? '',
                  body_id: insight.body_id ?? '',
                  body_en: insight.body_en ?? '',
                  cover: null,
                  published_at: insight.published_at?.slice(0, 10) ?? '',
                  is_published: insight.is_published,
              }
            : EMPTY,
    )

    const submit = (e) => {
        e.preventDefault()
        if (editing) {
            form.put(`/admin/insights/${insight.id}`, { preserveScroll: true })
        } else {
            form.post('/admin/insights', { preserveScroll: true })
        }
    }

    return (
        <AdminLayout title={editing ? `Edit: ${insight.title_id}` : 'Tulis Artikel'}>
            <form onSubmit={submit} className="grid gap-8 lg:grid-cols-3">
                <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
                    <Field label="Judul (Indonesia) *" error={form.errors.title_id}>
                        <Input value={form.data.title_id} onChange={(e) => form.setData('title_id', e.target.value)} required />
                    </Field>
                    <Field label="Judul (English)">
                        <Input value={form.data.title_en} onChange={(e) => form.setData('title_en', e.target.value)} />
                    </Field>
                    <div className="grid gap-5 sm:grid-cols-3">
                        <Field label="Tipe">
                            <select value={form.data.type} onChange={(e) => form.setData('type', e.target.value)} className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900">
                                <option value="insight">Insight</option>
                                <option value="artikel">Artikel</option>
                                <option value="edukasi">Edukasi</option>
                            </select>
                        </Field>
                        <Field label="Kategori (ID)">
                            <Input value={form.data.category_id} onChange={(e) => form.setData('category_id', e.target.value)} placeholder="ex: Geomekanika" />
                        </Field>
                        <Field label="Author">
                            <Input value={form.data.author} onChange={(e) => form.setData('author', e.target.value)} />
                        </Field>
                    </div>
                    <Field label="Ringkasan (ID)">
                        <Textarea rows={2} value={form.data.excerpt_id} onChange={(e) => form.setData('excerpt_id', e.target.value)} />
                    </Field>
                    <Field label="Ringkasan (EN)">
                        <Textarea rows={2} value={form.data.excerpt_en} onChange={(e) => form.setData('excerpt_en', e.target.value)} />
                    </Field>
                    <Field label="Isi (Indonesia)">
                        <Textarea rows={12} value={form.data.body_id} onChange={(e) => form.setData('body_id', e.target.value)} placeholder={'Tulis isi artikel di sini.\n\nParagraf dipisah baris kosong.'} />
                    </Field>
                    <Field label="Isi (English)">
                        <Textarea rows={12} value={form.data.body_en} onChange={(e) => form.setData('body_en', e.target.value)} />
                    </Field>
                </div>

                <div className="space-y-5">
                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="mb-4 text-sm font-semibold text-slate-900">Publikasi</p>
                        <div className="space-y-4">
                            <Field label="Tanggal Terbit" hint={form.data.is_published ? 'otomatis = sekarang jika kosong' : ''}>
                                <Input type="date" value={form.data.published_at} onChange={(e) => form.setData('published_at', e.target.value)} />
                            </Field>
                            <Toggle checked={form.data.is_published} onChange={(v) => form.setData('is_published', v)} label="Terbitkan" />
                            <Field label="Cover" hint="jpg/png/webp, max 5MB" error={form.errors.cover}>
                                <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => form.setData('cover', e.target.files[0])} />
                            </Field>
                            {editing && insight.cover && (
                                <img src={`/storage/${insight.cover}`} alt="Cover saat ini" className="w-full rounded-xl border border-slate-100 object-cover" />
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-6">
                        <p className="mb-4 text-sm font-semibold text-slate-900">Aksi</p>
                        <div className="flex gap-3">
                            <button type="submit" disabled={form.processing} className="flex-1 rounded-xl bg-brand-600 py-3 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60">
                                {form.processing ? 'Menyimpan…' : 'Simpan'}
                            </button>
                            <Link href="/admin/insights" className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">Batal</Link>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    )
}
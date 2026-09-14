import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, Select, Toggle, DeleteButton } from '../../../Components/admin/ui'

const ASPECTS = ['4:3', '1:1', '3:2', '16:9']
const CATEGORIES = ['Lab', 'Peralatan', 'Proyek', 'Aktivitas', 'Lainnya']
const EMPTY = { title: '', category: 'Lab', aspect: '4:3', order: 0, media: null, is_published: true }

export default function AdminGallery({ items }) {
    const [editing, setEditing] = useState(null)
    const isEdit = Boolean(editing)

    const form = useForm(
        isEdit
            ? { title: editing.title, category: editing.category ?? 'Lab', aspect: editing.aspect ?? '4:3', order: editing.order, media: null, is_published: editing.is_published }
            : EMPTY,
        {},
    )

    const submit = (e) => {
        e.preventDefault()
        if (isEdit) {
            form.put(`/admin/gallery/${editing.id}`, { preserveScroll: true, onSuccess: () => setEditing(null) })
        } else {
            form.post('/admin/gallery', { preserveScroll: true, onSuccess: () => form.reset() })
        }
    }

    const aspectCls = {
        '4:3': 'aspect-[4/3]',
        '1:1': 'aspect-square',
        '3:2': 'aspect-[3/2]',
        '16:9': 'aspect-video',
    }

    return (
        <AdminLayout title="Galeri">
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                        {items.length === 0 && (
                            <p className="col-span-full rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-400">Belum ada item galeri.</p>
                        )}
                        {items.map((item) => (
                            <div key={item.id} className="group overflow-hidden rounded-2xl border border-slate-200 bg-white">
                                <div className={`${aspectCls[item.aspect] ?? 'aspect-[4/3]'} relative bg-slate-100`}>
                                    {item.media ? (
                                        <img src={`/storage/${item.media}`} alt={item.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
                                    ) : (
                                        <div className="flex h-full items-center justify-center bg-gradient-to-br from-brand-700 to-ink text-white/70">
                                            <span className="font-mono text-[10px] uppercase tracking-widest">No media</span>
                                        </div>
                                    )}
                                    {!item.is_published && (
                                        <span className="absolute left-2 top-2 rounded-full bg-slate-900/80 px-2 py-0.5 font-mono text-[10px] text-white">draft</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between px-4 py-3">
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                                        <p className="text-xs text-slate-400">{item.category}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button type="button" onClick={() => setEditing(item)} className="text-sm font-medium text-brand-600 hover:text-brand-700">Edit</button>
                                        <DeleteButton href={`/admin/gallery/${item.id}`} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="mb-4 text-sm font-semibold text-slate-900">{isEdit ? 'Edit Item' : 'Tambah Item'}</p>
                    <form key={isEdit ? editing.id : 'new'} onSubmit={submit} encType="multipart/form-data" className="space-y-4">
                        <Field label="Judul *" error={form.errors.title}>
                            <Input value={form.data.title} onChange={(e) => form.setData('title', e.target.value)} required />
                        </Field>
                        <Field label="Kategori">
                            <Select value={form.data.category} onChange={(e) => form.setData('category', e.target.value)}>
                                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                            </Select>
                        </Field>
                        <Field label="Rasio">
                            <Select value={form.data.aspect} onChange={(e) => form.setData('aspect', e.target.value)}>
                                {ASPECTS.map((a) => <option key={a} value={a}>{a}</option>)}
                            </Select>
                        </Field>
                        <Field label="Gambar" hint="jpg/png/webp, max 5MB" error={form.errors.media}>
                            <Input type="file" accept="image/jpeg,image/png,image/webp" onChange={(e) => form.setData('media', e.target.files[0])} />
                        </Field>
                        <Field label="Urutan">
                            <Input type="number" value={form.data.order} onChange={(e) => form.setData('order', e.target.value)} />
                        </Field>
                        <Toggle checked={form.data.is_published} onChange={(v) => form.setData('is_published', v)} label="Tampilkan" />
                        <div className="flex gap-3 pt-1">
                            <button type="submit" disabled={form.processing} className="flex-1 rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60">
                                {form.processing ? '…' : 'Simpan'}
                            </button>
                            {isEdit && (
                                <button type="button" onClick={() => { setEditing(null); form.reset() }} className="rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                                    Batal
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}
import { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, Textarea, DeleteButton } from '../../../Components/admin/ui'

const EMPTY = { name_id: '', name_en: '', standards: '', description_id: '', description_en: '', order: 0 }

export default function AdminItems({ categories, items, activeCategory }) {
    const [mode, setMode] = useState(null)
    const isCreate = mode?.type === 'create'
    const isEdit = mode?.type === 'edit'

    const form = useForm(isEdit ? {
        name_id: mode.item.name_id,
        name_en: mode.item.name_en ?? '',
        standards: mode.item.standards?.join('\n') ?? '',
        description_id: mode.item.description_id ?? '',
        description_en: mode.item.description_en ?? '',
        order: mode.item.order,
    } : { ...EMPTY, category_id: mode?.category_id })

    const submit = (e) => {
        e.preventDefault()
        if (isEdit) {
            form.put(`/admin/test-items/${mode.item.id}`, {
                preserveScroll: true,
                onSuccess: () => setMode(null),
            })
        } else if (isCreate) {
            form.post('/admin/test-items', {
                preserveScroll: true,
                onSuccess: () => setMode(null),
            })
        }
    }

    const catLabel = (item) => {
        const c = categories.find((x) => x.id === item.category_id)
        return c ? `${c.name_id} - ${c.service?.name_id ?? ''}` : '-'
    }

    return (
        <AdminLayout title="Metode Uji">
            <div className="mb-6 flex flex-wrap gap-2">
                <Link
                    href="/admin/test-items"
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${!activeCategory ? 'bg-ink text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
                >
                    Semua
                </Link>
                {categories.map((c) => (
                    <Link
                        key={c.id}
                        href={`/admin/test-items?category=${c.id}`}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeCategory === c.id ? 'bg-ink text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
                    >
                        {c.name_id}
                    </Link>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:col-span-2">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                            <tr>
                                <th className="px-5 py-3 font-medium">Nama</th>
                                <th className="px-5 py-3 font-medium">Standar</th>
                                <th className="px-5 py-3 font-medium">Kategori</th>
                                <th className="px-5 py-3 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {items.length === 0 && (
                                <tr><td colSpan="4" className="px-5 py-10 text-center text-slate-400">Belum ada metode uji.</td></tr>
                            )}
                            {items.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3.5">
                                        <p className="font-medium text-slate-900">{item.name_id}</p>
                                        {item.name_en && <p className="text-xs text-slate-400">{item.name_en}</p>}
                                    </td>
                                    <td className="px-5 py-3.5 font-mono text-[11px] text-slate-500">
                                        {item.standards?.length ? item.standards.join(', ') : '-'}
                                    </td>
                                    <td className="px-5 py-3.5 text-xs text-slate-500">{catLabel(item)}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex justify-end gap-4">
                                            <button type="button" onClick={() => setMode({ type: 'edit', item })} className="font-medium text-brand-600 hover:text-brand-700">Edit</button>
                                            <DeleteButton href={`/admin/test-items/${item.id}`} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    {!mode ? (
                        <>
                            <p className="mb-4 text-sm font-semibold text-slate-900">Tambah Metode</p>
                            <Field label="Kategori">
                                <select
                                    onChange={(e) => {
                                        const cat = categories.find((x) => x.id === Number(e.target.value))
                                        if (cat) setMode({ type: 'create', category_id: cat.id })
                                    }}
                                    className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900"
                                    defaultValue=""
                                >
                                    <option value="" disabled>Pilih kategori…</option>
                                    {categories.map((c) => <option key={c.id} value={c.id}>{c.name_id}</option>)}
                                </select>
                            </Field>
                        </>
                    ) : (
                        <>
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-900">{isEdit ? 'Edit Metode' : 'Tambah Metode'}</p>
                                <button type="button" onClick={() => setMode(null)} className="text-xs text-slate-400 hover:text-slate-600">✕</button>
                            </div>
                            <form key={isEdit ? mode.item.id : 'new'} onSubmit={submit} className="space-y-4">
                                <Field label="Nama (ID) *" error={form.errors.name_id}>
                                    <Input value={form.data.name_id} onChange={(e) => form.setData('name_id', e.target.value)} required />
                                </Field>
                                <Field label="Nama (EN)">
                                    <Input value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} />
                                </Field>
                                <Field label="Standar" hint="pisah dgn baris baru (tiap baris = 1 standar)">
                                    <Textarea rows={3} value={form.data.standards} onChange={(e) => form.setData('standards', e.target.value)} placeholder={'ASTM D 2850\nSNI 03-3387'} />
                                </Field>
                                <Field label="Deskripsi (ID)">
                                    <Textarea rows={3} value={form.data.description_id} onChange={(e) => form.setData('description_id', e.target.value)} />
                                </Field>
                                <Field label="Deskripsi (EN)">
                                    <Textarea rows={3} value={form.data.description_en} onChange={(e) => form.setData('description_en', e.target.value)} />
                                </Field>
                                <Field label="Urutan">
                                    <Input type="number" value={form.data.order} onChange={(e) => form.setData('order', e.target.value)} />
                                </Field>
                                <button type="submit" disabled={form.processing} className="w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white hover:bg-brand-500 disabled:opacity-60">
                                    {form.processing ? '…' : 'Simpan'}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}
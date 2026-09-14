import { useState } from 'react'
import { Link, useForm } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, DeleteButton } from '../../../Components/admin/ui'

export default function AdminCategories({ services, categories, activeService }) {
    const [mode, setMode] = useState(null)

    const isCreate = mode?.type === 'create'
    const isEdit = mode?.type === 'edit'

    const form = useForm({
        name_id: isEdit ? mode.category.name_id : '',
        name_en: isEdit ? mode.category.name_en : '',
        order: isEdit ? mode.category.order : 0,
    })

    const submit = (e) => {
        e.preventDefault()
        if (isEdit) {
            form.put(`/admin/test-categories/${mode.category.id}`, {
                preserveScroll: true,
                onSuccess: () => setMode(null),
            })
        } else if (isCreate) {
            form.post(`/admin/test-categories/${mode.service_id}`, {
                preserveScroll: true,
                onSuccess: () => setMode(null),
            })
        }
    }

    const groupLabel = (cat) => {
        const s = services.find((x) => x.id === cat.service_id)
        return s?.name_id ?? '-'
    }

    return (
        <AdminLayout title="Kategori Uji">
            <div className="mb-6 flex flex-wrap gap-2">
                <Link
                    href="/admin/test-categories"
                    className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${!activeService ? 'bg-ink text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
                >
                    Semua
                </Link>
                {services.map((s) => (
                    <Link
                        key={s.id}
                        href={`/admin/test-categories?service=${s.id}`}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${activeService === s.id ? 'bg-ink text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
                    >
                        {s.name_id}
                    </Link>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:col-span-2">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                            <tr>
                                <th className="px-5 py-3 font-medium">Nama</th>
                                <th className="px-5 py-3 font-medium">Layanan</th>
                                <th className="px-5 py-3 font-medium">Metode</th>
                                <th className="px-5 py-3 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {categories.length === 0 && (
                                <tr><td colSpan="4" className="px-5 py-10 text-center text-slate-400">Belum ada kategori.</td></tr>
                            )}
                            {categories.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3.5">
                                        <p className="font-medium text-slate-900">{c.name_id}</p>
                                        <p className="text-xs text-slate-400">{c.name_en}</p>
                                    </td>
                                    <td className="px-5 py-3.5 text-slate-500">{groupLabel(c)}</td>
                                    <td className="px-5 py-3.5">
                                        <Link href={`/admin/test-items?category=${c.id}`} className="font-medium text-brand-600 hover:text-brand-700">{c.tests_count} metode →</Link>
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex justify-end gap-4">
                                            <button type="button" onClick={() => setMode({ type: 'edit', category: c })} className="font-medium text-brand-600 hover:text-brand-700">Edit</button>
                                            <DeleteButton href={`/admin/test-categories/${c.id}`} />
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
                            <p className="mb-4 text-sm font-semibold text-slate-900">Tambah Kategori</p>
                            <div className="space-y-3">
                                {services.map((s) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => setMode({ type: 'create', service_id: s.id })}
                                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition-colors hover:border-brand-600 hover:text-brand-600"
                                    >
                                        + {s.name_id}
                                    </button>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mb-4 flex items-center justify-between">
                                <p className="text-sm font-semibold text-slate-900">{isEdit ? 'Edit Kategori' : 'Tambah Kategori'}</p>
                                <button type="button" onClick={() => setMode(null)} className="text-xs text-slate-400 hover:text-slate-600">✕</button>
                            </div>
                            <form key={isEdit ? mode.category.id : 'new'} onSubmit={submit} className="space-y-4">
                                <Field label="Nama (ID) *" error={form.errors.name_id}>
                                    <Input value={form.data.name_id} onChange={(e) => form.setData('name_id', e.target.value)} required />
                                </Field>
                                <Field label="Nama (EN) *" error={form.errors.name_en}>
                                    <Input value={form.data.name_en} onChange={(e) => form.setData('name_en', e.target.value)} required />
                                </Field>
                                <Field label="Urutan" hint={isCreate ? `≥ urutan layanan (default 0)` : ''}>
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
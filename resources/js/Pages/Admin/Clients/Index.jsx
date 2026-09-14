import { useState } from 'react'
import { useForm } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { Field, Input, Toggle, DeleteButton } from '../../../Components/admin/ui'

const EMPTY = { name: '', website: '', order: 0, logo: null, is_published: true }

export default function AdminClients({ clients }) {
    const [editing, setEditing] = useState(null)
    const isEdit = Boolean(editing)

    const form = useForm(
        isEdit
            ? { name: editing.name, website: editing.website ?? '', order: editing.order, logo: null, is_published: editing.is_published }
            : EMPTY,
        {},
    )

    const submit = (e) => {
        e.preventDefault()
        if (isEdit) {
            form.put(`/admin/clients/${editing.id}`, { preserveScroll: true, onSuccess: () => setEditing(null) })
        } else {
            form.post('/admin/clients', { preserveScroll: true, onSuccess: () => form.reset() })
        }
    }

    return (
        <AdminLayout title="Klien">
            <div className="grid gap-8 lg:grid-cols-3">
                <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white lg:col-span-2">
                    <table className="w-full min-w-[720px] text-left text-sm">
                        <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                            <tr>
                                <th className="px-5 py-3 font-medium">Nama</th>
                                <th className="px-5 py-3 font-medium">Logo</th>
                                <th className="px-5 py-3 font-medium">Status</th>
                                <th className="px-5 py-3 font-medium text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {clients.length === 0 && (
                                <tr><td colSpan="4" className="px-5 py-10 text-center text-slate-400">Belum ada klien.</td></tr>
                            )}
                            {clients.map((c) => (
                                <tr key={c.id} className="hover:bg-slate-50">
                                    <td className="px-5 py-3.5">
                                        <p className="font-medium text-slate-900">{c.name}</p>
                                        {c.website && <p className="text-xs text-slate-400">{c.website}</p>}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        {c.logo ? (
                                            <img src={`/storage/${c.logo}`} alt={c.name} className="h-9 w-auto rounded border border-slate-100 object-contain" />
                                        ) : (
                                            <span className="text-xs text-slate-300">-</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <span className={`inline-block h-2.5 w-2.5 rounded-full ${c.is_published ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                    </td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex justify-end gap-4">
                                            <button type="button" onClick={() => setEditing(c)} className="font-medium text-brand-600 hover:text-brand-700">Edit</button>
                                            <DeleteButton href={`/admin/clients/${c.id}`} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                    <p className="mb-4 text-sm font-semibold text-slate-900">{isEdit ? 'Edit Klien' : 'Tambah Klien'}</p>
                    <form key={isEdit ? editing.id : 'new'} onSubmit={submit} encType="multipart/form-data" className="space-y-4">
                        <Field label="Nama *" error={form.errors.name}>
                            <Input value={form.data.name} onChange={(e) => form.setData('name', e.target.value)} required />
                        </Field>
                        <Field label="Website">
                            <Input value={form.data.website} onChange={(e) => form.setData('website', e.target.value)} placeholder="https://" />
                        </Field>
                        <Field label="Logo" hint="png/svg, max 2MB" error={form.errors.logo}>
                            <Input type="file" accept="image/png,image/svg+xml,image/webp" onChange={(e) => form.setData('logo', e.target.files[0])} />
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
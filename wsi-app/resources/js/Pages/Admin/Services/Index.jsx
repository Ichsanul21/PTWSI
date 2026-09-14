import { Link } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { DeleteButton } from '../../../Components/admin/ui'

export default function AdminServicesIndex({ services }) {
    return (
        <AdminLayout title="Layanan">
            <div className="mb-6 flex justify-end">
                <Link
                    href="/admin/services/create"
                    className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-500"
                >
                    + Tambah Layanan
                </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-5 py-3 font-medium">#</th>
                            <th className="px-5 py-3 font-medium">Nama (ID / EN)</th>
                            <th className="px-5 py-3 font-medium">Slug</th>
                            <th className="px-5 py-3 font-medium">Kategori</th>
                            <th className="px-5 py-3 font-medium">Aktif</th>
                            <th className="px-5 py-3 font-medium text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {services.map((s) => (
                            <tr key={s.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3.5 text-slate-400">{s.order}</td>
                                <td className="px-5 py-3.5">
                                    <p className="font-medium text-slate-900">{s.name_id}</p>
                                    <p className="text-xs text-slate-400">{s.name_en}</p>
                                </td>
                                <td className="px-5 py-3.5 font-mono text-xs text-slate-500">{s.slug}</td>
                                <td className="px-5 py-3.5 text-slate-500">{s.test_categories_count}</td>
                                <td className="px-5 py-3.5">
                                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${s.is_active ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex justify-end gap-4">
                                        <Link href={`/admin/services/${s.id}/edit`} className="font-medium text-brand-600 hover:text-brand-700">Edit</Link>
                                        <DeleteButton href={`/admin/services/${s.id}`} />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}
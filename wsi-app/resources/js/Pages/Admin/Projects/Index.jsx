import { Link } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { DeleteButton } from '../../../Components/admin/ui'

export default function AdminProjects({ projects }) {
    return (
        <AdminLayout title="Proyek">
            <div className="mb-6 flex justify-end">
                <Link href="/admin/projects/create" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500">
                    + Tambah Proyek
                </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-5 py-3 font-medium">Nama</th>
                            <th className="px-5 py-3 font-medium">Kategori</th>
                            <th className="px-5 py-3 font-medium">Lokasi & Tahun</th>
                            <th className="px-5 py-3 font-medium">Status</th>
                            <th className="px-5 py-3 font-medium text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {projects.length === 0 && (
                            <tr><td colSpan="5" className="px-5 py-10 text-center text-slate-400">Belum ada proyek.</td></tr>
                        )}
                        {projects.map((p) => (
                            <tr key={p.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3.5">
                                    <p className="font-medium text-slate-900">{p.name_id}</p>
                                    {p.name_en && <p className="text-xs text-slate-400">{p.name_en}</p>}
                                </td>
                                <td className="px-5 py-3.5 text-slate-500">{p.category ?? '-'}</td>
                                <td className="px-5 py-3.5 text-xs text-slate-500">
                                    {p.location_id ?? '-'}
                                    {p.year && <span className="ml-2 font-mono text-slate-400">({p.year})</span>}
                                    <br />
                                    <span className="text-slate-400">{p.client?.name ?? p.client_name ?? ''}</span>
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex items-center gap-2">
                                        <span className={`inline-block h-2.5 w-2.5 rounded-full ${p.is_published ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                        {p.is_featured && <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">Featured</span>}
                                    </div>
                                </td>
                                <td className="px-5 py-3.5">
                                    <div className="flex justify-end gap-4">
                                        <Link href={`/admin/projects/${p.id}/edit`} className="font-medium text-brand-600 hover:text-brand-700">Edit</Link>
                                        <DeleteButton href={`/admin/projects/${p.id}`} />
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
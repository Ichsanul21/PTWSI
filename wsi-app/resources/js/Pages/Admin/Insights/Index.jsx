import { Link } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'
import { DeleteButton } from '../../../Components/admin/ui'

export default function AdminInsightsIndex({ insights }) {
    return (
        <AdminLayout title="Artikel Insight">
            <div className="mb-6 flex justify-end">
                <Link href="/admin/insights/create" className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 hover:bg-brand-500">
                    + Tulis Artikel
                </Link>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[720px] text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                        <tr>
                            <th className="px-5 py-3 font-medium">Judul</th>
                            <th className="px-5 py-3 font-medium">Tipe</th>
                            <th className="px-5 py-3 font-medium">Status</th>
                            <th className="px-5 py-3 font-medium">Terbit</th>
                            <th className="px-5 py-3 font-medium text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {insights.length === 0 && (
                            <tr><td colSpan="5" className="px-5 py-10 text-center text-slate-400">Belum ada artikel.</td></tr>
                        )}
                        {insights.map((post) => (
                            <tr key={post.id} className="hover:bg-slate-50">
                                <td className="px-5 py-3.5">
                                    <p className="font-medium text-slate-900">{post.title_id}</p>
                                    {post.title_en && <p className="text-xs text-slate-400">{post.title_en}</p>}
                                </td>
                                <td className="px-5 py-3.5 text-slate-500">{post.type}</td>
                                <td className="px-5 py-3.5">
                                    <span className={`inline-block h-2.5 w-2.5 rounded-full ${post.is_published ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                                </td>
                                <td className="px-5 py-3.5 text-xs text-slate-400">{post.published_at ?? '-'}</td>
                                <td className="px-5 py-3.5">
                                    <div className="flex justify-end gap-4">
                                        <Link href={`/admin/insights/${post.id}/edit`} className="font-medium text-brand-600 hover:text-brand-700">Edit</Link>
                                        <DeleteButton href={`/admin/insights/${post.id}`} label="Hapus" />
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
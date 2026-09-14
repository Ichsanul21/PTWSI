import { Link, usePage, router } from '@inertiajs/react'
import AdminLayout from '../../../Layouts/AdminLayout'

const STATUS = {
    new: { label: 'Baru', cls: 'bg-blue-50 text-blue-700 border-blue-200' },
    contacted: { label: 'Dihubungi', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
    closed: { label: 'Selesai', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
}

export default function AdminEnquiries({ enquiries, status }) {
    const setStatus = (id, next) => router.put(`/admin/enquiries/${id}`, { status: next }, { preserveScroll: true, preserveState: true })

    return (
        <AdminLayout title="Enquiries">
            <div className="mb-6 flex flex-wrap gap-2">
                {['all', 'new', 'contacted', 'closed'].map((s) => (
                    <Link
                        key={s}
                        href={`/admin/enquiries${s === 'all' ? '' : `?status=${s}`}`}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${status === s ? 'bg-ink text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
                    >
                        {s === 'all' ? 'Semua' : STATUS[s].label}
                    </Link>
                ))}
            </div>

            <div className="space-y-4">
                {enquiries.length === 0 && <p className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-slate-400">Tidak ada enquiry.</p>}
                {enquiries.map((e) => (
                    <div key={e.id} className="rounded-2xl border border-slate-200 bg-white p-6">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                                <div className="flex items-center gap-3">
                                    <h2 className="font-display font-bold text-slate-900">{e.name}</h2>
                                    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS[e.status]?.cls}`}>{STATUS[e.status]?.label}</span>
                                </div>
                                <p className="mt-1 text-sm text-slate-500">
                                    {e.company && <span>{e.company} · </span>}
                                    <a href={`mailto:${e.email}`} className="text-brand-600 hover:underline">{e.email}</a>
                                    {e.phone && <span> · {e.phone}</span>}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-400">{e.created_at} · Lokale: {e.locale}</p>
                            </div>
                            <select
                                value={e.status}
                                onChange={(ev) => setStatus(e.id, ev.target.value)}
                                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700"
                            >
                                {Object.entries(STATUS).map(([k, v]) => (
                                    <option key={k} value={k}>{v.label}</option>
                                ))}
                            </select>
                        </div>
                        {e.service && (
                            <div className="mt-4">
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">Layanan: {e.service.name_id}</span>
                            </div>
                        )}
                        {e.message && <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">{e.message}</p>}
                    </div>
                ))}
            </div>
        </AdminLayout>
    )
}
import { Link } from '@inertiajs/react'
import AdminLayout from '../../Layouts/AdminLayout'

const STATUS = {
    new: { label: 'Baru', cls: 'bg-blue-50 text-blue-700 border-blue-200', dot: '#005ca5' },
    contacted: { label: 'Dihubungi', cls: 'bg-amber-50 text-amber-700 border-amber-200', dot: '#f59e0b' },
    closed: { label: 'Selesai', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200', dot: '#10b981' },
}

function Card({ className = '', children }) {
    return <div className={`rounded-2xl border border-slate-200 bg-white p-6 ${className}`}>{children}</div>
}

function CardTitle({ children, action }) {
    return (
        <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="font-display text-base font-bold text-slate-900">{children}</h2>
            {action}
        </div>
    )
}

function Kpi({ label, value, sub, href, accent = false }) {
    return (
        <Link
            href={href}
            className={`group rounded-2xl border p-6 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
                accent ? 'border-brand-600/30 bg-brand-50/50 hover:border-brand-600/50' : 'border-slate-200 bg-white hover:border-brand-600/40'
            }`}
        >
            <p className="font-mono text-xs uppercase tracking-widest text-slate-400">{label}</p>
            <p className={`font-display mt-2 text-4xl font-extrabold transition-colors ${accent ? 'text-brand-700' : 'text-slate-900 group-hover:text-brand-600'}`}>
                {value}
            </p>
            {sub && <p className="mt-2 min-h-8 text-xs leading-relaxed text-slate-500">{sub}</p>}
        </Link>
    )
}

function TrendChart({ trend }) {
    const max = Math.max(1, ...trend.map((d) => d.count))
    return (
        <div>
            <div className="flex h-44 items-end gap-1.5">
                {trend.map((d, i) => (
                    <div key={i} title={`${d.label}: ${d.count} enquiry`} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                        <span className="font-mono text-[10px] text-slate-400">{d.count > 0 ? d.count : ''}</span>
                        <div
                            className={`w-full rounded-t-md transition-all hover:opacity-80 ${i === trend.length - 1 ? 'bg-ink' : 'bg-brand-600/85'}`}
                            style={{ height: `${Math.max(4, (d.count / max) * 100)}%` }}
                        />
                    </div>
                ))}
            </div>
            <div className="mt-2 flex gap-1.5">
                {trend.map((d, i) => (
                    <span key={i} className="flex-1 truncate text-center font-mono text-[10px] text-slate-400">
                        {i % 2 === 0 ? d.label : ''}
                    </span>
                ))}
            </div>
        </div>
    )
}

function StatusDonut({ byStatus }) {
    const total = byStatus.reduce((s, x) => s + x.count, 0)
    const r = 54
    const c = 2 * Math.PI * r
    let acc = 0

    if (total === 0) {
        return (
            <div className="flex flex-col items-center gap-4 py-4">
                <svg width="140" height="140" viewBox="0 0 140 140">
                    <circle cx="70" cy="70" r={r} fill="none" stroke="#e2e8f0" strokeWidth="16" />
                </svg>
                <p className="text-sm text-slate-400">Belum ada enquiry.</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center gap-5">
            <div className="relative">
                <svg width="150" height="150" viewBox="0 0 140 140" className="-rotate-90">
                    <circle cx="70" cy="70" r={r} fill="none" stroke="#f1f5f9" strokeWidth="16" />
                    {byStatus.map((s) => {
                        const frac = s.count / total
                        const el = (
                            <circle
                                key={s.status}
                                cx="70"
                                cy="70"
                                r={r}
                                fill="none"
                                stroke={STATUS[s.status]?.dot ?? '#94a3b8'}
                                strokeWidth="16"
                                strokeDasharray={`${frac * c} ${c}`}
                                strokeDashoffset={-acc * c}
                                strokeLinecap="butt"
                            />
                        )
                        acc += frac
                        return el
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-display text-3xl font-extrabold text-slate-900">{total}</span>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">Total</span>
                </div>
            </div>
            <ul className="w-full space-y-2">
                {byStatus.map((s) => (
                    <li key={s.status} className="flex items-center justify-between text-sm">
                        <span className="flex items-center gap-2 text-slate-600">
                            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STATUS[s.status]?.dot }} />
                            {s.label}
                        </span>
                        <span className="font-mono font-semibold text-slate-900">{s.count}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

function ServiceBars({ items }) {
    const max = Math.max(1, ...items.map((s) => s.tests))
    if (!items.length) return <p className="py-6 text-center text-sm text-slate-400">Belum ada layanan.</p>
    return (
        <ul className="space-y-4">
            {items.map((s) => (
                <li key={s.name}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                        <span className="truncate text-sm font-medium text-slate-800">{s.name}</span>
                        <span className="shrink-0 font-mono text-xs text-slate-400">
                            {s.tests} metode · {s.categories} kategori
                        </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-brand-700 to-brand-500 transition-all duration-700"
                            style={{ width: `${Math.max(3, (s.tests / max) * 100)}%` }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    )
}

function ContentRows({ content }) {
    const rows = [
        { label: 'Klien', value: content.clients, href: '/admin/clients' },
        { label: 'Proyek', value: content.projects, href: '/admin/projects' },
        { label: 'Item Galeri', value: content.gallery, href: '/admin/gallery' },
        { label: 'Artikel Terbit', value: content.insights_published, href: '/admin/insights' },
        { label: 'Artikel Draft', value: content.insights_draft, href: '/admin/insights' },
    ]
    return (
        <ul className="divide-y divide-slate-100">
            {rows.map((r) => (
                <li key={r.label}>
                    <Link href={r.href} className="group flex items-center justify-between py-3">
                        <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-brand-600">{r.label}</span>
                        <span className="flex items-center gap-2">
                            <span className="font-display text-lg font-extrabold text-slate-900">{r.value}</span>
                            <span className="text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-600">→</span>
                        </span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

const fmtDate = (iso) => {
    try {
        return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    } catch {
        return iso?.slice(0, 10) ?? '-'
    }
}

export default function AdminDashboard({ stats, weekEnquiries, categoriesCount, trend, byStatus, testsPerService, content, recentEnquiries }) {
    const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

    return (
        <AdminLayout title="Dashboard">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div>
                    <p className="font-mono text-xs uppercase tracking-widest text-slate-400">{today}</p>
                    <h2 className="font-display mt-1 text-2xl font-extrabold text-slate-900">Ringkasan aktivitas</h2>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/insights/create" className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-600/40 hover:text-brand-600">
                        + Tulis Artikel
                    </Link>
                    <Link href="/admin/projects/create" className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition-colors hover:bg-brand-500">
                        + Tambah Proyek
                    </Link>
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Kpi label="Layanan" value={stats.services} sub={`${categoriesCount} kategori uji`} href="/admin/services" />
                <Kpi label="Metode Uji" value={stats.tests} sub="terdaftar di katalog" href="/admin/test-items" />
                <Kpi label="Artikel" value={stats.insights} sub={`${content.insights_published} terbit · ${content.insights_draft} draft`} href="/admin/insights" />
                <Kpi
                    label="Enquiry Baru"
                    value={stats.new_enquiries}
                    sub={weekEnquiries > 0 ? `+${weekEnquiries} dalam 7 hari` : 'belum ada minggu ini'}
                    href="/admin/enquiries"
                    accent={stats.new_enquiries > 0}
                />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <Card className="lg:col-span-2">
                    <CardTitle
                        action={<span className="font-mono text-xs text-slate-400">14 hari terakhir</span>}
                    >
                        Tren Enquiry Masuk
                    </CardTitle>
                    <TrendChart trend={trend ?? []} />
                </Card>
                <Card>
                    <CardTitle>Status Enquiry</CardTitle>
                    <StatusDonut byStatus={byStatus ?? []} />
                </Card>
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <Card>
                    <CardTitle action={<Link href="/admin/test-items" className="text-sm font-semibold text-brand-600">Kelola →</Link>}>
                        Metode per Layanan
                    </CardTitle>
                    <ServiceBars items={testsPerService ?? []} />
                </Card>
                <Card>
                    <CardTitle>Ketersediaan Konten</CardTitle>
                    <ContentRows content={content ?? {}} />
                </Card>
            </div>

            <div className="mt-5">
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-lg font-bold text-slate-900">Enquiries Terbaru</h2>
                    <Link href="/admin/enquiries" className="text-sm font-semibold text-brand-600">Semua →</Link>
                </div>
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                    {recentEnquiries?.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[640px] text-left text-sm">
                                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-400">
                                    <tr>
                                        <th className="px-5 py-3 font-medium">Nama</th>
                                        <th className="px-5 py-3 font-medium">Perusahaan</th>
                                        <th className="px-5 py-3 font-medium">Layanan</th>
                                        <th className="px-5 py-3 font-medium">Status</th>
                                        <th className="px-5 py-3 font-medium">Tanggal</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {recentEnquiries.map((e) => (
                                        <tr key={e.id} className="transition-colors hover:bg-slate-50">
                                            <td className="px-5 py-3.5 font-medium text-slate-900">{e.name}</td>
                                            <td className="px-5 py-3.5 text-slate-500">{e.company ?? '-'}</td>
                                            <td className="px-5 py-3.5 text-slate-500">{e.service?.name_id ?? 'Umum'}</td>
                                            <td className="px-5 py-3.5">
                                                <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${STATUS[e.status]?.cls}`}>{STATUS[e.status]?.label}</span>
                                            </td>
                                            <td className="whitespace-nowrap px-5 py-3.5 text-slate-400">{fmtDate(e.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="px-5 py-12 text-center">
                            <p className="font-medium text-slate-700">Belum ada enquiry.</p>
                            <p className="mt-1 text-sm text-slate-400">Formulir di halaman Kontak akan mengisi tabel ini otomatis.</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    )
}

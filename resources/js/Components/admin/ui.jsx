import { Link, usePage, router } from '@inertiajs/react'

export function Field({ label, hint, children, error }) {
    return (
        <label className="block">
            <span className="mb-1.5 flex items-baseline gap-2 text-sm font-medium text-slate-700">{label}{hint && <span className="text-xs font-normal text-slate-400">{hint}</span>}</span>
            {children}
            {error && <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>}
        </label>
    )
}

const inputBase = 'w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 shadow-sm transition-colors focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/20'

export function Input(props) {
    return <input {...props} className={`${inputBase} ${props.className ?? ''}`} />
}

export function Textarea(props) {
    return <textarea {...props} className={`${inputBase} ${props.className ?? ''}`} />
}

export function Select({ children, ...props }) {
    return <select {...props} className={inputBase}>{children}</select>
}

export function Toggle({ checked, onChange, label }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!checked)}
            className="flex items-center gap-3 text-sm font-medium text-slate-700"
        >
            <span className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-brand-600' : 'bg-slate-300'}`}>
                <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
            </span>
            {label}
        </button>
    )
}

export function Flash() {
    const flash = usePage().props.flash ?? {}
    if (!flash.success && !flash.error) return null
    return (
        <div className={`mb-6 rounded-xl border px-4 py-3 text-sm font-medium ${flash.success ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-red-200 bg-red-50 text-red-700'}`}>
            {flash.success ?? flash.error}
        </div>
    )
}

export function DeleteButton({ href, label = 'Hapus' }) {
    const onDelete = (e) => {
        e.preventDefault()
        if (confirm('Yakin ingin menghapus? Tindakan ini tidak bisa dibatalkan.')) {
            router.delete(href, { preserveScroll: true })
        }
    }
    return (
        <button type="button" onClick={onDelete} className="font-medium text-red-600 transition-colors hover:text-red-700">
            {label}
        </button>
    )
}

export function AdminLink({ href, active, children }) {
    return (
        <Link href={href} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${active ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/25' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}>
            {children}
        </Link>
    )
}
import { useForm } from '@inertiajs/react'
import { Input, Field } from '../../Components/admin/ui'

export default function AdminLogin() {
    const form = useForm({ email: '', password: '', remember: false })

    const submit = (e) => {
        e.preventDefault()
        form.post('/admin/login', { preserveScroll: true })
    }

    return (
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-6">
            <div className="dot-grid absolute inset-0 opacity-60" />
            <div className="relative w-full max-w-md">
                <div className="mb-8 flex flex-col items-center gap-3">
                    <img src="/images/logo-bulat.png" alt="PT Wall Street Indonesia" className="h-14 w-14 rounded-full object-cover" />
                    <div className="text-center">
                        <h1 className="font-display text-xl font-bold text-white">Admin Panel</h1>
                        <p className="mt-1 font-mono text-xs uppercase tracking-[0.18em] text-brand-400">PT Wall Street Indonesia</p>
                    </div>
                </div>

                <div className="rounded-3xl border border-cream/10 bg-cream p-8 shadow-2xl">
                    {form.errors.email && <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{form.errors.email}</div>}

                    <form onSubmit={submit} className="space-y-5">
                        <Field label="Email">
                            <Input type="email" value={form.data.email} onChange={(e) => form.setData('email', e.target.value)} placeholder="admin@wallstreetindonesia.com" required autoFocus />
                        </Field>
                        <Field label="Password">
                            <Input type="password" value={form.data.password} onChange={(e) => form.setData('password', e.target.value)} placeholder="••••••••" required />
                        </Field>
                        <button
                            type="submit"
                            disabled={form.processing}
                            className="w-full rounded-full bg-ink py-3 text-sm font-semibold text-cream transition-colors hover:bg-ink-700 disabled:opacity-60"
                        >
                            {form.processing ? 'Memproses…' : 'Masuk'}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center text-xs text-cream/40">
                    Staging login: admin@wallstreetindonesia.com / password
                </p>
            </div>
        </div>
    )
}
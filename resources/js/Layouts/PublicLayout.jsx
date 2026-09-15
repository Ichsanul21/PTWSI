import { usePage } from '@inertiajs/react'
import AppHeader from '../Components/AppHeader'
import AppFooter from '../Components/AppFooter'
import CtaBand from '../Components/ui/CtaBand'
import WhatsAppFloat from '../Components/ui/WhatsAppFloat'

export default function PublicLayout({ children, hideCta = false }) {
    const { url } = usePage()
    const isContact = url?.includes('/kontak')
    const showCta = !hideCta && !isContact
    return (
        <div className="flex min-h-screen flex-col bg-white text-ink">
            <AppHeader />
            <main className="flex-1">{children}</main>
            {showCta && <CtaBand />}
            <AppFooter />
            <WhatsAppFloat />
        </div>
    )
}
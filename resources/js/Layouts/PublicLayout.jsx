import AppHeader from '../Components/AppHeader'
import AppFooter from '../Components/AppFooter'
import WhatsAppFloat from '../Components/ui/WhatsAppFloat'

export default function PublicLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-white text-ink">
            <AppHeader />
            <main className="flex-1">{children}</main>
            <AppFooter />
            <WhatsAppFloat />
        </div>
    )
}
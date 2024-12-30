import {
    ClerkProvider,
} from '@clerk/nextjs'
import '@/app/globals.css'
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            {children}
        </ClerkProvider>
    )
}
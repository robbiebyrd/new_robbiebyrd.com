import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'RobbieByrd.com',
    description: 'The home of Robbie Byrd.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className="antialiased w-full h-full">
        {children}
        </body>
        </html>
    )
}

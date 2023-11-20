import { AppContextProvider } from '@/context'
import './globals.scss'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pleteaumd',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="py-[2.75rem] px-[8.75rem] w-screen h-screen bg-[#ffffff80]">
        <AppContextProvider>
          {children}
        </AppContextProvider>
      </body>
    </html>
  )
}

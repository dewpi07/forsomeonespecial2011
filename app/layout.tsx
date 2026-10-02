import type { Metadata, Viewport } from 'next'
import { Caveat, DM_Serif_Display, Plus_Jakarta_Sans } from 'next/font/google'
import Script from 'next/script'
import { CONTENT } from '@/lib/content'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], variable: '--font-jakarta', display: 'swap' })
const dmSerif = DM_Serif_Display({ subsets: ['latin'], weight: '400', variable: '--font-dm-serif', display: 'swap' })
const caveat = Caveat({ subsets: ['latin'], weight: ['500', '700'], variable: '--font-caveat', display: 'swap' })

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: CONTENT.meta.title,
  description: CONTENT.meta.description,
  openGraph: {
    title: CONTENT.meta.title,
    description: CONTENT.meta.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: CONTENT.meta.title }],
    locale: 'id_ID',
    type: 'website',
  },
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fff7f5' },
    { media: '(prefers-color-scheme: dark)', color: '#1d1420' },
  ],
}

const themeScript = `try{var t=localStorage.getItem('fyp_theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${jakarta.variable} ${dmSerif.variable} ${caveat.variable} bg-bg`}
    >
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{themeScript}</Script>
      </head>
      <body className="font-sans antialiased leading-relaxed">{children}</body>
    </html>
  )
}

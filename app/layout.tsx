import './globals.css'
import React from 'react'
import localFont from 'next/font/local'
import { GlobalProvider } from '@/context/store'
import Header from '@/components/organism/header'
import Footer from '@/components/organism/footer'
import { Providers } from '@/utils/themeMode' // Plus Jakarta Sans font family with 4 weights and 2 styles
import { Metadata } from 'next'

// Plus Jakarta Sans font family with 4 weights and 2 styles
const Jakarta_Sans = localFont({
   src: './fonts/PlusJakartaSans.ttf',
   weight: '400 500 600 700',
   display: 'swap',
   variable: '--font-plus-jakarta-sans',
})

// Work Sans font family with 4 weights and 2 styles
const work_Sans = localFont({
   src: './fonts/WorkSans.ttf',
   weight: '400 500 600 700',
   display: 'swap',
   variable: '--font-work-sans',
})

// Source Serif Pro font family with 4 weights and 2 styles
const source_Serif_Pro = localFont({
   src: './fonts/SourceSerif4.ttf',
   weight: '200 300 400 600 700',
   display: 'swap',
   variable: '--font-source-serif-pro',
})

export const metadata: Metadata = {
   title: {
      default: 'Dreamers Hub',
      template: '%s | Dreamers Hub',
   },
   description:
      'Dreamers Hub is your ultimate destination for insightful articles, the latest news, and valuable resources across various domains. Stay informed and connected with our meticulously curated content, covering job opportunities, technology updates, entertainment news, and more. Join us on a journey of exploration and discovery, and let Dreamers Hub be your guide to staying informed and inspired.',
}

export default function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   return (
      <html
         lang="en"
         suppressHydrationWarning
         className={`${source_Serif_Pro.variable} ${Jakarta_Sans.variable} ${work_Sans.variable} font-sans`}
      >
         <body>
            <Providers>
               <GlobalProvider>
                  <Header />
                  {children}
                  <Footer />
               </GlobalProvider>
            </Providers>
         </body>
      </html>
   )
}

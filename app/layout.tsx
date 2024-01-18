import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { UiProvider } from '@/providers/ui-provider';
import Navbar from '../components/navbar';

const kaisel = localFont({
  src: [
    {
      path: '../assets/fonts/KaiseiDecol-Regular.ttf',
      weight: '300',
      style: 'regular',
    },
    {
      path: '../assets/fonts/KaiseiDecol-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../assets/fonts/KaiseiDecol-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
  ],
})

export const metadata: Metadata = {
  title: 'Library Access',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={kaisel.className} style={{ overflowY: "hidden" }}>
        <Navbar />
        <UiProvider>
          {children}
        </UiProvider>
      </body>
    </html>
  )
}

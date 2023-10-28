import type { Metadata } from 'next'
import React from 'react'
import { Inter } from 'next/font/google'
import '@blocksuite/editor/themes/affine.css'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Mini AFFiNE'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body className={inter.className}>{children}</body>
    </html>
  )
}
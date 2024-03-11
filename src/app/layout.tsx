import "~/styles/globals.css"

import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { url } from "~/config"
import { TRPCReactProvider } from "~/trpc/react"

import { cn } from "~/lib/utils"
import { Toaster } from "~/components/ui/sonner"

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata = {
  title: {
    template: "%s | TempCodeBin",
    default: "TempCodeBin - Share Code Snippets with Others",
  },
  description:
    "A temporary storage and sharing platform for code snippets with others.",
  keywords: ["code", "snippet", "temp", "temporary", "bin", "share", "storage"],
  metadataBase: new URL(url),
  openGraph: {
    title: "TempCodeBin - Share Code Snippets with Others",
    description:
      "A temporary storage and sharing platform for code snippets with others.",
    url: url,
    type: "website",
    locale: "en_US",
    siteName: "TempCodeBin",
    images: [
      {
        url: `${url}/api/og`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    title: "TempCodeBin",
    description:
      "A temporary storage and sharing platform for code snippets with others.",
    card: "summary_large_image",
    images: [
      {
        url: `${url}/api/og`,
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${url}/site.webmanifest`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn("dark min-h-screen font-mono antialiased", mono.variable)}
      >
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}

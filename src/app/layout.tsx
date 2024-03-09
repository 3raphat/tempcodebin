import "~/styles/globals.css"

import { JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from "~/components/ui/sonner"
import { cn } from "~/lib/utils"
import { TRPCReactProvider } from "~/trpc/react"

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
  icons: [{ rel: "icon", url: "/favicon.ico" }],
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

"use client"

import { useState } from "react"
import Link from "next/link"
import { Loader2, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import { toast } from "sonner"

import { Button } from "~/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"

export default function Page() {
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    setLoading(true)
    try {
      await signOut({
        callbackUrl: "/",
      })
    } catch (error) {
      toast.error(`Failed to sign out: ${(error as Error).message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-screen-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Are you sure you want to sign out?
        </CardTitle>
        <CardDescription>
          You will be redirected to the home page after signing out.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex w-full justify-between">
        <Button variant="ghost" asChild>
          <Link href="/">No, I want to stay</Link>
        </Button>
        <Button onClick={handleSignOut} disabled={loading}>
          <span className="sr-only">Sign out</span>
          {loading ? (
            <Loader2 className="mr-2 size-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 size-4" />
          )}
          {loading ? "Signing out..." : "Yes, sign out"}
        </Button>
      </CardContent>
    </Card>
  )
}

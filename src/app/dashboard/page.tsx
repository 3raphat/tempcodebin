import { redirect } from "next/navigation"
import { getServerAuthSession } from "~/server/auth"
import { api } from "~/trpc/server"
import { Code2, Languages, User, View } from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { UserNav } from "~/components/user-nav"
import { Overview } from "~/app/dashboard/_components/overview"
import { RecentCreated } from "~/app/dashboard/_components/recent-created"

export default async function Page() {
  const session = await getServerAuthSession()

  if (!session) {
    redirect("/")
  }

  const codes = await api.code.getAllByUser.query()

  const languages = codes.map((code) => code.language)
  const mostLanguages = languages
    .sort(
      (a, b) =>
        languages.filter((v) => v === a).length -
        languages.filter((v) => v === b).length
    )
    .pop()

  const totalViews = codes.reduce((acc, code) => acc + code.views, 0)

  const mostViewed = codes.sort((a, b) => b.views - a.views).shift()

  const snippetsInThisMonth = codes.filter(
    (code) =>
      new Date(code.createdAt).getMonth() === new Date().getMonth() &&
      new Date(code.createdAt).getFullYear() === new Date().getFullYear()
  )

  const snippetsInToday = codes.filter(
    (code) =>
      new Date(code.createdAt).getDate() === new Date().getDate() &&
      new Date(code.createdAt).getMonth() === new Date().getMonth() &&
      new Date(code.createdAt).getFullYear() === new Date().getFullYear()
  )

  const recentCreated = codes.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )

  function getTotalCreatedInMonth(month: number) {
    return codes.filter(
      (code) =>
        new Date(code.createdAt).getMonth() === month &&
        new Date(code.createdAt).getFullYear() === new Date().getFullYear()
    ).length
  }

  return (
    <>
      <UserNav />
      <div className="container py-24">
        <h1 className="mb-4 text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Name</CardTitle>
                <User className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="line-clamp-1 text-2xl font-bold">
                  {session.user.name}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {session.user.email}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Snippets
                </CardTitle>
                <Code2 className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{codes.length}</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {snippetsInThisMonth.length} snippets created in this month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Most Used Language
                </CardTitle>
                <Languages className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="line-clamp-1 text-2xl font-bold">
                  {mostLanguages}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Total{" "}
                  {languages.filter((lang) => lang === mostLanguages).length}{" "}
                  snippets created
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Views
                </CardTitle>
                <View className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalViews}</div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Most viewed snippet has {mostViewed?.views} views
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="md:col-span-2 lg:col-span-4">
              <CardHeader>
                <CardTitle>Overview</CardTitle>
                <CardDescription>
                  Overview of your snippets created in{" "}
                  {new Date().getFullYear()}. Count only snippets are not
                  expired.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview
                  data={Array.from({ length: 12 }, (_, i) => ({
                    name: new Date(0, i).toLocaleString("en-US", {
                      month: "short",
                    }),
                    total: getTotalCreatedInMonth(i),
                  }))}
                />
              </CardContent>
            </Card>
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Created</CardTitle>
                <CardDescription>
                  Today you created {snippetsInToday.length} snippets.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentCreated codes={recentCreated} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

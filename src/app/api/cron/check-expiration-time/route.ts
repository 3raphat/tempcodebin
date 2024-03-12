import { api } from "~/trpc/server"
import ms from "ms"

export async function GET() {
  try {
    const codes = await api.code.getAll.query()
    if (!codes) return Response.json({ message: "No codes found" })

    const expiredCodes = []

    for (const code of codes) {
      if (code.duration === "after-view" || code.duration === "never") continue // no need to check duration for these
      if (
        new Date(code.createdAt).getTime() + ms(String(code.duration)) <
        new Date().getTime()
      ) {
        expiredCodes.push(code.id)
        await api.code.deleteById.mutate({ id: code.id })
      }
    }
    return Response.json({
      message: "Expired codes",
      expiredCodes,
    })
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete expired codes",
        error,
      },
      { status: 500 }
    )
  }
}

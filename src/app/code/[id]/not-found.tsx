import Link from "next/link"
import { Button } from "~/components/ui/button"

export default function NotFound() {
  return (
    <div className="noise grid h-screen w-screen place-items-center">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Code Not Found
        </h1>
        <p className="max-w-4xl text-muted-foreground lg:text-base xl:text-xl">
          The code you are looking for does not exist.
        </p>
        <Button variant="link" asChild>
          <Link href="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  )
}

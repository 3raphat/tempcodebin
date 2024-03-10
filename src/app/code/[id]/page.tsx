import Link from "next/link"
import { notFound } from "next/navigation"
import { CodePreview } from "~/components/code-preview"
import { CopyButton } from "~/components/copy-button"
import { Button } from "~/components/ui/button"
import { Spotlight } from "~/components/ui/spotlight"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/server"
import { AlertTriangle, FilePlus } from "lucide-react"

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props) {
  const id = params.id
  const targetCode = await api.code.getFromId.query({ id })

  if (!targetCode) {
    return {
      title: "Code Not Found",
    }
  }

  return {
    title: id + "'s code",
  }
}

export default async function Page({ params }: Props) {
  const id = params.id
  const targetCode = await api.code.getFromId.query({ id })

  if (!targetCode) {
    return notFound()
  }

  const updateViews = await api.code.incrementViews.mutate({ id })

  if (targetCode.duration === "after-view" && updateViews.views > 0) {
    await api.code.deleteById.mutate({ id })
  }

  return (
    <div className="noise relative h-screen w-screen overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60 "
        fill="rgb(103 232 249)"
      />
      <div className="mx-auto flex size-full max-w-fit flex-col items-center justify-center px-4 md:w-3/4 md:min-w-[776px]">
        <p
          className={cn(
            "mb-2 inline-flex items-center justify-center place-self-end rounded-xl border bg-muted/50 px-2 text-sm text-muted-foreground",
            targetCode.duration === "after-view" &&
              "border-warning-border bg-warning-bg text-warning-text"
          )}
        >
          {targetCode.duration === "after-view" ? (
            <>
              <AlertTriangle className="mr-2 size-4" />
              Be careful! This code will be deleted after viewing.
            </>
          ) : (
            <span>
              <span className="font-bold">{updateViews.views}</span> view
              {updateViews.views > 1 ? "s" : ""}
            </span>
          )}
        </p>

        <CodePreview code={targetCode.code} lang={targetCode.language} />
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 sm:flex-row">
          <CopyButton
            valueToCopy={targetCode.code}
            textOnButton="Copy Code"
            textWhenCopied="Copied!"
            className="w-full sm:w-auto"
          />
          <Button
            size="sm"
            variant="outline"
            className="w-full sm:w-auto"
            asChild
          >
            <Link href="/">
              <span className="sr-only">Create</span>
              <FilePlus className="mr-2 size-4" />
              Create your own
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

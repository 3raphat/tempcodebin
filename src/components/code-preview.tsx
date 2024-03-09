import { codeToHtml } from "shiki"

import { ScrollArea, ScrollBar } from "./ui/scroll-area"

interface CodePreviewProps {
  code: string
  lang: string
}

export async function CodePreview({ code, lang }: CodePreviewProps) {
  const html = await codeToHtml(code, {
    lang: lang,
    theme: "ayu-dark",
  })

  const bgColor = html.match(/background-color:(.*?);/)?.[1]

  return (
    <ScrollArea
      className="h-3/4 max-h-fit min-h-[480px] w-full max-w-fit rounded-xl border text-sm shadow-xl md:w-3/4 md:min-w-[776px]"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="size-full p-8"
        style={{ backgroundColor: bgColor }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

import { unstable_noStore as noStore } from "next/cache"
import dynamic from "next/dynamic"

import { Spotlight } from "~/components/ui/spotlight"
import { CodeEditor } from "~/components/code-editor"

const WelcomeModal = dynamic(() => import("~/components/welcome-modal"), {
  ssr: false,
})

export default function Home() {
  noStore()
  return (
    <>
      <WelcomeModal />
      <div className="relative flex min-h-screen w-full flex-col items-center overflow-hidden">
        <div className="grid-background" />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-zinc-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-zinc-950" />
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="rgb(244 244 245)"
        />

        <div className="z-10 my-20 w-full md:my-24">
          <div className="mb-8 flex flex-col items-center gap-2">
            <span className="text-sm tracking-widest text-muted-foreground">
              ⌛ - 🧑‍💻 - 🗑️
            </span>
            <h1 className="bg-gradient-to-br from-primary to-zinc-800 bg-clip-text text-4xl font-extrabold tracking-tighter text-transparent sm:text-6xl md:text-7xl">
              Temp-Code-Bin
            </h1>
            <p className="text-balance text-center text-sm text-muted-foreground sm:text-base">
              A simple code bin for your temporary code snippets.
            </p>
          </div>
          <div className="container h-[500px] w-full">
            <CodeEditor />
          </div>
        </div>
      </div>
    </>
  )
}

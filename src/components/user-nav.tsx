import { getServerAuthSession } from "~/server/auth"
import { LogIn } from "lucide-react"

import { cn } from "~/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip"

export async function UserNav() {
  const session = await getServerAuthSession()
  return (
    <div className="fixed right-10 top-10 z-50">
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>
            <a
              className="group relative inline-block cursor-pointer rounded-full bg-slate-800 p-px text-sm font-semibold leading-6 text-zinc-50"
              href={session ? "/signout" : "/signin"}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <span
                className={cn(
                  "relative z-10 flex items-center rounded-full bg-zinc-950 p-2.5 ring-1 ring-white/10 sm:px-3 sm:py-1.5",
                  session && "p-1.5 sm:pl-1.5"
                )}
              >
                <span className="sr-only">Sign in</span>
                {session ? (
                  <>
                    <Avatar className="size-6">
                      <AvatarImage src={session.user.image!} alt="user" />
                      <AvatarFallback>
                        {session.user.name?.slice(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="ml-2 hidden sm:block">
                      {session.user.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="hidden sm:block">Sign in</span>
                    <LogIn className="ml-0 size-4 sm:ml-2" />
                  </>
                )}
              </span>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </a>
          </TooltipTrigger>
          <TooltipContent side="bottom" align={session ? "center" : "end"}>
            <p>
              {session
                ? "Click to sign out"
                : "Sign in to create snippet without expiration"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

import Link from "next/link"
import { type Code } from "@prisma/client"

import { ScrollArea } from "~/components/ui/scroll-area"

interface RecentCreatedProps {
  codes: Code[]
}

export function RecentCreated({ codes }: RecentCreatedProps) {
  return (
    <ScrollArea className="h-[400px]">
      <div className="flex flex-col gap-3">
        {codes.map((code) => (
          <div
            key={code.id}
            className="flex flex-row items-center justify-between space-x-2"
          >
            <div>
              <Link href={`/code/${code.id}`} className="hover:underline">
                {code.id}
              </Link>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-muted-foreground">
                  {code.language} ·{" "}
                  {new Date(code.createdAt).toLocaleTimeString()} ·{" "}
                  {new Date(code.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {code.views} view{code.views === 1 ? "" : "s"}
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}

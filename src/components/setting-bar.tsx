"use client"

import { useEffect, useState } from "react"
import { Button } from "~/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command"
import { Label } from "~/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover"
import { cn } from "~/lib/utils"
import useSettingStore, { type Duration } from "~/stores/setting"
import { Check, ChevronsUpDown } from "lucide-react"
import { toast } from "sonner"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

export function SettingBar() {
  const {
    language,
    setLanguage,
    allLanguagesSupported,
    duration,
    setDuration,
  } = useSettingStore()

  const [open, setOpen] = useState(false)

  const times: { display: string; value: Duration }[] = [
    { display: "5 minutes", value: "5m" },
    { display: "10 minutes", value: "10m" },
    { display: "1 hour", value: "1h" },
    { display: "1 day", value: "1d" },
    { display: "1 week", value: "1w" },
    { display: "After view", value: "after-view" },
  ]

  useEffect(() => {
    const toastId = "after-view-toast"
    if (duration === "after-view") {
      toast.warning("The code will be deleted after the first view", {
        id: toastId,
      })
    } else {
      toast.dismiss(toastId)
    }
  }, [duration])

  return (
    <div className="flex w-full gap-2 sm:w-auto">
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor="language">🌐 Language</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              id="language"
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full min-w-[150px] justify-between sm:w-fit"
            >
              {language
                ? allLanguagesSupported.find(
                    (lang) => lang.id === language || lang.name === language
                  )?.name
                : "Select language..."}
              <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Command>
              <CommandInput placeholder="Search language..." />
              <CommandList>
                <CommandEmpty>No language found.</CommandEmpty>
                <CommandGroup>
                  {allLanguagesSupported.map((lang) => (
                    <CommandItem
                      key={lang.id}
                      value={lang.id}
                      defaultValue={language}
                      onSelect={(currentValue) => {
                        setLanguage(currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 size-4",
                          language === lang.id ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {lang.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex w-full flex-col gap-1.5">
        <Label htmlFor="exp">⌛ Exp. Time</Label>
        <Select
          value={duration}
          onValueChange={(v: Duration) => setDuration(v)}
        >
          <SelectTrigger id="exp" className="w-full min-w-[150px] sm:w-fit">
            <SelectValue placeholder="Expiration Time" />
          </SelectTrigger>
          <SelectContent>
            {times.map((time) => (
              <SelectItem key={time.value} value={time.value}>
                {time.display}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

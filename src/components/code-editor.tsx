"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Editor, { type Monaco } from "@monaco-editor/react"
import { defaultJsCode } from "~/config"
import useSettingStore from "~/stores/setting"
import { api } from "~/trpc/react"
import confetti from "canvas-confetti"
import { Loader2 } from "lucide-react"
import { type editor } from "monaco-editor"
import { type Session } from "next-auth"
import { toast } from "sonner"

import { cn, getUrlWithoutProtocal } from "~/lib/utils"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog"
import { SettingBar } from "~/components/setting-bar"

import { CopyButton } from "./copy-button"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Skeleton } from "./ui/skeleton"

interface CodeEditorProps {
  session: Session | null
}

export function CodeEditor({ session }: CodeEditorProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null)
  const { language, setAllLanguagesSupported, duration } = useSettingStore()
  const [value, setValue] = useState(defaultJsCode)

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true)
    setAllLanguagesSupported(
      monaco.languages.getLanguages().map((lang) => ({
        id: lang.id,
        name: lang.aliases?.[0] ?? lang.id,
      }))
    )
  }

  function handleEditorDidMount(
    editor: editor.IStandaloneCodeEditor,
    _monaco: Monaco
  ) {
    editorRef.current = editor
  }

  const [openDialog, setOpenDialog] = useState(false)
  const [codeLink, setCodeLink] = useState("")
  const [isTooLong, setIsTooLong] = useState(false)
  const [isTooShort, setIsTooShort] = useState(false)

  const createCode = api.code.create.useMutation({
    onSuccess: (data) => {
      setCodeLink(`${window.origin}/code/${data.id}`)
      setOpenDialog(true)
      void confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    },
  })

  const isSaveButtonDisable = isTooLong || isTooShort || createCode.isLoading

  const handleSave = useCallback(() => {
    toast.promise(
      createCode.mutateAsync({
        code: value,
        language: language,
        duration: duration,
      }),
      {
        loading: "Saving code...",
        success: "Code saved successfully",
        error: "Failed to save code",
      }
    )
  }, [createCode, duration, language, value])

  useEffect(() => {
    setIsTooLong(value.length > 10000)
    setIsTooShort(value.length === 0)
  }, [value])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        if (isSaveButtonDisable) return
        handleSave()
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [handleSave, isSaveButtonDisable])

  return (
    <>
      <div className="mb-2 flex flex-col items-end justify-between gap-2 sm:flex-row">
        <SettingBar session={session} />
        <button
          disabled={isSaveButtonDisable}
          onClick={handleSave}
          className={cn(
            "relative inline-flex h-10 w-full overflow-hidden rounded-md p-[1px] focus:outline-none sm:w-auto",
            isSaveButtonDisable && "cursor-not-allowed"
          )}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex size-full items-center justify-center rounded-md bg-slate-950 px-3 py-1 text-sm font-medium text-zinc-50 backdrop-blur-3xl">
            {createCode.isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Saving...
              </>
            ) : isTooLong ? (
              "❌ Whoa! Too long!"
            ) : isTooShort ? (
              "❌ Yo! Write something!"
            ) : (
              "Let's save it! 🚀"
            )}
          </span>
        </button>
      </div>
      <Editor
        className="border"
        options={{
          tabSize: 2,
          insertSpaces: false,
          bracketPairColorization: {
            enabled: true,
            independentColorPoolPerBracketType: true,
          },
          cursorSmoothCaretAnimation: "on",
          cursorBlinking: "smooth",
          smoothScrolling: true,
          fontFamily: "var(--font-mono)",
          fontLigatures: true,
          formatOnPaste: true,
          wordWrap: "on",
          formatOnType: true,
          minimap: {
            enabled: false,
          },
        }}
        onChange={(v) => setValue(v ?? "")}
        value={value}
        defaultLanguage="javascript"
        language={language}
        defaultValue={defaultJsCode}
        onMount={handleEditorDidMount}
        beforeMount={handleEditorWillMount}
        theme="vs-dark"
        loading={
          <div className="relative flex size-full items-center justify-center">
            <Skeleton className="size-full" />
            <p className="absolute">Loading...</p>
          </div>
        }
      />
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Share Code</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this code.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Input
                id="link"
                defaultValue={getUrlWithoutProtocal(codeLink)}
                readOnly
              />
            </div>
            <CopyButton valueToCopy={codeLink} />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button variant="secondary" size="sm">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

"use client"

import confetti from "canvas-confetti"
import { Copy, CopyCheck } from "lucide-react"
import useClipboard from "react-use-clipboard"

import { Button } from "./ui/button"

interface CopyButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  valueToCopy: string
  textOnButton?: string
  textWhenCopied?: string
}

export function CopyButton({
  valueToCopy,
  textOnButton,
  textWhenCopied,
  ...props
}: CopyButtonProps) {
  const [isCopied, setCopied] = useClipboard(valueToCopy, {
    successDuration: 2000,
  })

  const handleClick = () => {
    setCopied()

    const scalar = 2
    const heart = confetti.shapeFromText({ text: "🩷", scalar })
    const star = confetti.shapeFromText({ text: "⭐", scalar })

    const defaults = {
      spread: 360,
      ticks: 60,
      gravity: 0,
      decay: 0.96,
      startVelocity: 20,
      shapes: [heart, star],
      scalar,
    }

    function shoot() {
      void confetti({
        ...defaults,
        particleCount: 30,
      })

      void confetti({
        ...defaults,
        particleCount: 5,
      })

      void confetti({
        ...defaults,
        particleCount: 15,
        scalar: scalar / 2,
        shapes: ["circle"],
      })
    }

    setTimeout(shoot, 0)
    setTimeout(shoot, 100)
    setTimeout(shoot, 200)
  }

  return (
    <Button
      type="submit"
      size="sm"
      onClick={handleClick}
      disabled={isCopied}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {isCopied ? (
        <CopyCheck className="size-4" />
      ) : (
        <Copy className="size-4" />
      )}
      {textOnButton && (
        <span className="ml-2">{isCopied ? textWhenCopied : textOnButton}</span>
      )}
    </Button>
  )
}

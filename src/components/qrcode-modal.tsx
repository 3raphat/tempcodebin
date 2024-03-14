"use client"

import { useState } from "react"
import { Copy, CopyCheck, Download, QrCode } from "lucide-react"
import QRCode from "react-qr-code"
import { toast } from "sonner"

import { Button } from "~/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"

interface QRCodeModalProps {
  value: string
}

export function QRCodeModal({ value }: QRCodeModalProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopyImage() {
    const svgRef = document.getElementById("qrcode")
    if (!svgRef) return

    const svgData = new XMLSerializer().serializeToString(svgRef)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(svgBlob)

    // Create an image element
    const img = new Image()
    img.src = url

    // Wait for the image to load
    await new Promise<void>((resolve) => {
      img.onload = () => resolve()
    })

    // Create a canvas element
    const canvas = document.createElement("canvas")
    canvas.width = img.width
    canvas.height = img.height

    // Draw the image onto the canvas
    const ctx = canvas.getContext("2d")
    ctx?.drawImage(img, 0, 0)

    // Convert the canvas to a Blob
    canvas.toBlob((blob) => {
      if (blob) {
        // Create Clipboard item
        const clipboardItem = new ClipboardItem({ "image/png": blob })

        // Copy to clipboard
        navigator.clipboard
          .write([clipboardItem])
          .then(() => {
            toast.success("Copied QR code to clipboard")
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
          })
          .catch((err) =>
            toast.error(`Failed to copy: ${(err as Error).message}`)
          )
      }
    }, "image/png")
  }

  function handleDownload() {
    const svgRef = document.getElementById("qrcode")
    if (!svgRef) return

    const svgData = new XMLSerializer().serializeToString(svgRef)
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(svgBlob)

    const a = document.createElement("a")
    a.href = url
    a.download = "qrcode.svg"
    a.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" className="size-9">
          <QrCode className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>
        <div className="mx-auto size-52 rounded-lg border-2 bg-white p-4">
          <QRCode id="qrcode" size={1024} value={value} className="size-full" />
        </div>
        <DialogFooter className="flex flex-col space-y-2 sm:space-y-0">
          <Button
            size="sm"
            className="w-full"
            onClick={handleCopyImage}
            disabled={copied}
          >
            {copied ? (
              <CopyCheck className="mr-2 size-4" />
            ) : (
              <Copy className="mr-2 size-4" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button size="sm" className="w-full" onClick={handleDownload}>
            <Download className="mr-2 size-4" />
            Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

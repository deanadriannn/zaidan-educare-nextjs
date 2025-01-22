"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Input } from "./ui/input"
import { CloudUpload } from "lucide-react"

export function UploadFileDialog({
  children,
  title,
  description
}: {
  children: React.ReactNode
  title?: string
  description?: string
}) {
  const [dataUrl, setDataUrl] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) return
    const file = acceptedFiles[0]
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.result) {
        setDataUrl(reader.result as string)
      }
    }
    reader.readAsDataURL(file)
  }, [])

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    onDrop,
    accept: { ".xlsx": [] },
    multiple: false,
  })
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <div
          className="hover border-2 border-[#666666] border-dashed h-60 rounded-lg hover:cursor-pointer group w-full text-muted-foreground"
          {...getRootProps()}
        >
          <Input type="file" accept=".xlsx" id="file" {...getInputProps()} />
          <div className="w-full h-full">
            <div className="flex flex-col justify-center items-center h-full w-full group-hover:opacity-50 duration-200 bg-[#F9F7F7] hover:bg-[#E0DDDD]">
              <CloudUpload className="w-14 h-14" />
              <span>Pilih Gambar</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

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
import { CloudUpload, Upload, X } from "lucide-react"
import { useRouter } from "next/navigation"

export function UploadFileDialog({
  children,
  title,
  description,
  successUrl
}: {
  children: React.ReactNode
  title?: string
  description?: string
  successUrl?: string
}) {
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles?.length) return
    setFiles((prev) => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({
    onDrop,
    accept: { ".xlsx": [] },
    multiple: true
  })

  function handleRemoveFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    console.log(files)
    setOpen(false)
    setFiles([])
    if (successUrl) router.push(successUrl)
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
              <span className="mt-2 text-center">
                Tarik & Lepas File disini
                <br />
                atau
              </span>
              <span className="bg-[#2C5392] text-white p-1 rounded-sm">
                Telusuri File
              </span>
            </div>
          </div>
        </div>
        <span>
          Format file yang diterima: .xlsx
        </span>
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex items-center gap-2">
                <img 
                  src="/xls.svg"
                  className="w-6 h-6"
                />
                <span className="font-semibold text-sm">
                  {file.name}
                </span>
              </div>
              {/* Tombol hapus */}
              <button
                onClick={() => handleRemoveFile(index)}
                className="p-1 hover:bg-gray-200 rounded text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} variant="primary-blue"> 
            <Upload /> Unggah
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { CircleCheck, CircleX } from "lucide-react"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "./ui/alert-dialog"

export function ConfirmAlert ({ 
  children,
  title,
  description,
  handleAction
}: {
  children: React.ReactNode
  title: string
  description?: string
  handleAction: () => void
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-[#608BC1] text-white hover:bg-[#4B6F9A] hover:text-white">
            <CircleX /> Tidak
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleAction} 
            className="bg-[#F5365C] text-white hover:bg-[#D12C50]"
          >
            <CircleCheck /> Ya
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
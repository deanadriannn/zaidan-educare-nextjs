'use client'

import { X } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

const StatusMessage = ({
  message,
  backgroundColor,
  backUrl
}: {
  message: string
  backgroundColor: string
  backUrl: string
}) => {
  const router = useRouter()

  return (
    <Card className={cn(`rounded-lg border md:mx-4 mt-4 shrink-0 flex flex-col gap-4 py-4`, backgroundColor)}>
      <CardContent className='pb-0 flex justify-between items-center'>
        <p>{message}</p>
        <Button 
          variant='ghost' 
          className="hover:bg-transparent"
          onClick={() => router.push(backUrl)}
        >
          <X />
        </Button>
      </CardContent>
    </Card>
  )
}

export default StatusMessage
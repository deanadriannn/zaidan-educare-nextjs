import Link from "next/link"
import { Button } from "./ui/button"
import { Pencil } from "lucide-react"

export const CardNotificationMessage = ({
  label, 
  value,
  showEditButton = true
}: {
  label: string,
  value: string,
  showEditButton?: boolean
}) => {

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-bold text-muted-foreground text-md md:text-lg">
        {label}
      </h1>
      <div className="border-2 border-[#666666] bg-[#F9F7F7] p-2 rounded-lg relative">
        <div className="font-medium whitespace-pre-wrap">
          {value}
        </div>
        <Link href={"/pengaturan-notifikasi/edit"}>
          <Button 
            className="absolute top-0 right-0 md:top-2 md:right-2"
            variant="ghost"
          >
            {showEditButton && (
              <Pencil className="text-yellow-500" />
            )}
          </Button>
        </Link>
      </div>
    </div>
  )
}
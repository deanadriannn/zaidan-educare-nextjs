"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { MonthCalendar } from "./ui/month-calendar"

type MonthPickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

export function MonthPicker({
  value,
  onChange,
  placeholder = "Pilih Bulan",
  disabled = false,
  className,
}: MonthPickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full justify-between font-normal",
            !value && "text-muted-foreground",
            className
          )}
        >
          {value ? format(value, "MM/yyyy") : <span>{placeholder}</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <MonthCalendar selectedMonth={value} onMonthSelect={onChange} />
      </PopoverContent>
    </Popover>
  )
}

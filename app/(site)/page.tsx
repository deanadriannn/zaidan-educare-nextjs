import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <Card className='flex flex-auto gap-4 md:mx-4 mt-4 shrink-0'>
      <div className="flex-1 rounded-xl bg-sidebar justify-center items-center flex">
        Dashboard
      </div>
    </Card>
  )
}
import { Card } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <Card className='flex flex-auto gap-4 mx-4 mt-4 shrink-0 min-h-[100vh]'>
      <div className="flex-1 rounded-xl bg-sidebar md:min-h-min justify-center items-center flex">
        Dashboard
      </div>
    </Card>
  )
}
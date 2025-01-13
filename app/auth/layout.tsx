import { Card } from "@/components/ui/card"

export default function AuthLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#F2F3F4] p-6 md:p-10">
      <div className="w-full h-full">
        <Card className="h-full bg-white shadow-md px-20 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-start gap-4 md:gap-8">
            <img src="/images/logo.svg" className="w-40 h-40" />
            <h1 className="text-3xl font-extrabold font-secular text-center md:text-start">Pengelolaan Dana Pendidikan Sekolah Zaidan Educare</h1>
          </div>
          <div className="h-full">
            {children}
          </div>
        </Card>
      </div>
    </div>
  )
}

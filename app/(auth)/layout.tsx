import { Card } from "@/components/ui/card"

export default function AuthLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F2F3F4] md:px-8 lg:px-20 xl:px-40 2xl:px-96">
      <Card className="bg-white w-full shadow-md px-4 md:px-10 pb-12">
        <div className="flex flex-col lg:flex-row items-center justify-start lg:gap-8">
          <img src="/images/logo.svg" className="w-36 h-36 md:w-40 md:h-40" />
          <h1 className="text-xl md:text-2xl xl:text-3xl font-extrabold font-secular text-center lg:text-start">
            Pengelolaan Dana Pendidikan Sekolah Zaidan Educare
          </h1>
        </div>
        <div>
          {children}
        </div>
      </Card>
    </div>
  )
}

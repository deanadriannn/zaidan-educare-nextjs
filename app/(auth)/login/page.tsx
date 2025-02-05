"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useUserStore } from "@/hooks/use-user"
import { useRouter } from "nextjs-toploader/app"
 
const formSchema = z.object({
  username: z.string().min(1, {
    message: "Username wajib diisi",
  }),
  password: z.string().min(1, {
    message: "Password wajib diisi",
  }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const { setRole } = useUserStore()
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    if (values.username === "ketuayayasan") {
      setRole("Ketua Yayasan")
    } else if (values.username === "bendahara") {
      setRole("Bendahara")
    } else if (values.username === "administrator") {
      setRole("Administrator")
    }
    console.log(values)
    router.push("/")
  }

  return (
    <div className="flex justify-center items-center gap-6">
      <img
        src="/images/auth-logo.png"
        alt="Image"
        className="lg:block hidden inset-0 object-scale-down"
      />
      <div className="w-full">
        <div className="flex flex-col justify-center items-center gap-4 mt-8 lg:mt-0">
          <h1 className="font-secular font-bold text-xl xl:text-2xl text-center">Selamat Datang</h1>
          <p className="font-secular text-md xl:text-lg text-center">Silahkan masuk ke dalam sistem</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 pt-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-secular font-bold text-md xl:text-lg">
                    Username <span className="text-red-500 text-sm">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="admin"
                      {...field}
                      className="bg-[#CBDCEB] focus-visible:ring-[#CBDCEB]/50 h-14"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-secular font-bold text-md xl:text-lg">
                    Password <span className="text-red-500 text-sm">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="*****" {...field} 
                        type={showPassword ? "text" : "password"}
                        className="bg-[#CBDCEB] focus-visible:ring-[#CBDCEB]/50 h-14"
                        disabled={isLoading}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-0 top-1/2 transform -translate-y-1/2 p-0 h-14 w-14 hover:bg-transparent"
                              onClick={() => setShowPassword((prev) => !prev)}
                              type="button"
                              disabled={isLoading}
                            >
                              {showPassword ? 
                                <EyeOff /> : 
                                <Eye />
                              }
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              {showPassword ? "Sembunyikan" : "Tampilkan"} password
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormControl>
                  <FormMessage className="text-sm" />
                </FormItem>
              )}
            />
            <Button 
              type="submit"
              className="w-full h-14 bg-[#608BC1] hover:bg-[#5274A2] duration-200 text-white"
              disabled={isLoading}
            >
              Login
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

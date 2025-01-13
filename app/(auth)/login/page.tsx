"use client"

import { cn } from "@/lib/utils"
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
 
const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username minimal 2 karakter",
  }).max(50, {
    message: "Username maksimal 50 karakter",
  }),
  password: z.string().min(8, {
    message: "Password minimal 8 karakter",
  }).max(50, {
    message: "Password maksimal 50 karakter",
  }),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <div className={cn("flex flex-col gap-6 h-full")}>
      <div className="flex justify-center xl:grid xl:grid-cols-2 h-full xl:mb-60 xl:mx-40">
        <div className="relative hidden xl:block">
          <img
            src="/images/auth-logo.png"
            alt="Image"
            className="absolute inset-0 h-full w-full dark:brightness-[0.2] dark:grayscale object-scale-down "
          />
        </div>
        <div className="w-full px-20 xl:px-0">
          <div className="flex flex-col justify-center items-center gap-4 p-8">
            <h1 className="font-secular font-bold text-4xl text-center md:text-start">Selamat Datang</h1>
            <p className="font-secular text-lg text-center md:text-start">Silahkan masuk ke dalam sistem</p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10 px-0 xl:px-10 ">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-secular font-bold text-xl">
                      Username <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="admin" {...field} className="bg-[#CBDCEB] focus-visible:ring-[#CBDCEB]/50" />
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
                    <FormLabel className="font-secular font-bold text-xl">
                      Password <span className="text-red-500 text-sm">*</span>
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="*****" {...field} 
                          type={showPassword ? "text" : "password"}
                          className="bg-[#CBDCEB] focus-visible:ring-[#CBDCEB]/50"
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
              >
                Login
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  )
}

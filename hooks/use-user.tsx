import { create } from 'zustand'

type UserStore = {
  role: string
  setRole: (role: string) => void
}

export const useUserStore = create<UserStore>()((set) => ({
  role: 'Administrator',
  setRole: (role) => set({ role })
}))
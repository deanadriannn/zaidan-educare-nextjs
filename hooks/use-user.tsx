import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = {
  role: string;
  setRole: (role: string) => void;
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      role: "Administrator", // Default value
      setRole: (role) => set({ role }),
    }),
    {
      name: "user-store", // Key untuk localStorage
      storage: createJSONStorage(() => sessionStorage), // Gunakan localStorage
    }
  )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  user: unknown;
  setUser: (data: object) => void;
}

export const useUserState = create<User>()(
  persist(
    (set) => ({
      user: {},
      setUser: (data) => set((state) => ({ ...state, ...data })),
    }),
    { name: "user" }
  )
);

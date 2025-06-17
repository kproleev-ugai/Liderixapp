import { create } from "zustand"

interface AppState {
  sidebarOpen: boolean
  currentCompany: string | null
  setSidebarOpen: (open: boolean) => void
  setCurrentCompany: (companyId: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  currentCompany: null,
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setCurrentCompany: (companyId) => set({ currentCompany: companyId }),
}))

import { create } from 'zustand'

interface AppState {
  isLoaded: boolean
  scrollProgress: number
  activeSection: string
  mousePosition: { x: number; y: number }
  setIsLoaded: (loaded: boolean) => void
  setScrollProgress: (progress: number) => void
  setActiveSection: (section: string) => void
  setMousePosition: (x: number, y: number) => void
}

export const useAppStore = create<AppState>()((set) => ({
  isLoaded: false,
  scrollProgress: 0,
  activeSection: 'hero',
  mousePosition: { x: 0, y: 0 },

  setIsLoaded: (isLoaded) => set({ isLoaded }),
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setMousePosition: (x, y) => set({ mousePosition: { x, y } }),
}))

export const useIsLoaded = () => useAppStore((s) => s.isLoaded)
export const useScrollProgress = () => useAppStore((s) => s.scrollProgress)
export const useActiveSection = () => useAppStore((s) => s.activeSection)
export const useMousePosition = () => useAppStore((s) => s.mousePosition)

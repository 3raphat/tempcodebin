import { create } from "zustand"

type LanguagesSupported = {
  id: string
  name: string
}

export type Duration = "5m" | "10m" | "1h" | "1d" | "1w" | "after-view"

interface SettingState {
  allLanguagesSupported: LanguagesSupported[]
  setAllLanguagesSupported: (
    allLanguagesSupported: LanguagesSupported[]
  ) => void

  language: LanguagesSupported["id"]
  setLanguage: (language: LanguagesSupported["id"]) => void

  duration: Duration
  setDuration: (duration: Duration) => void
}

const useSettingStore = create<SettingState>((set) => ({
  allLanguagesSupported: [],
  setAllLanguagesSupported: (allLanguagesSupported: LanguagesSupported[]) =>
    set(() => ({ allLanguagesSupported })),

  language: "javascript",
  setLanguage: (language: LanguagesSupported["id"]) =>
    set(() => ({ language })),

  duration: "1d",
  setDuration: (duration: Duration) => set(() => ({ duration })),
}))

export default useSettingStore

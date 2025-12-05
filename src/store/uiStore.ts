import { create } from "zustand";
import { devtools, createJSONStorage } from "zustand/middleware";

export interface IUIStore {
    isSidebarOpen: boolean;
    toggleSidebar: () => void
};

export const useUIStore = create<IUIStore>()(
    (set, get) => ({
        isSidebarOpen: false,
        toggleSidebar: () => {
            set({
                isSidebarOpen: !get().isSidebarOpen,
            })
        }
    })
);
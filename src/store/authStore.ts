import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  refresh_token: string | null;
  isAuthenticated: boolean | null;
  logout: () => void;
  tokenUpdate: (token: string, refresh_token: string) => void;
  login: (token: string, refresh_token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(persist(
    (set, get) => ({
      token: null,
      refresh_token: null,
      isAuthenticated: null,
      expires_in: null,
      logout: () => {
        set({
          token: null,
          refresh_token: null,
          isAuthenticated: false,
        });
      },
      tokenUpdate: (token: string, refresh_token: string) => {
        set({
          token: token,
          refresh_token: refresh_token,
          isAuthenticated: true,
        })
      },
      login: (token: string, refresh_token: string) => {
        set({
          token,
          refresh_token,
          isAuthenticated: true,
        });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
));


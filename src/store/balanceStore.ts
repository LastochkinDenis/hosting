import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface IBalanceStore {
  balance_rub: number;
  currency: string;
  hold_amount: number;
  changeBalance: (
    balance_rub: number,
    currency?: string,
    hold_amount?: number
  ) => void;
}

export const useBalanceStore = create<IBalanceStore>()(
  devtools(
    persist(
      (set, get) => ({
        balance_rub: 0,
        currency: "RUB",
        hold_amount: 0,
        changeBalance: (
          balance_rub: number,
          currency?: string,
          hold_amount?: number
        ) => {
          set({
            balance_rub: balance_rub,
            currency: currency ?? get().currency,
            hold_amount: hold_amount ?? get().hold_amount,
          });
        },
      }),
      {
        name: "balance-store",
      }
    )
  )
);

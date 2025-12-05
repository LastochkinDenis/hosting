import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface INotification {
    id?: string
    messeage: string;
    type: 'error' | 'info' | 'success' | 'warning'
}

export interface INotificationStore {
    placement: string;
    notifications: Array<INotification>;
    pushNotification: (notification: INotification) => void;
    onDelete: (id: string) => void
}

export const useNotificationStore = create<INotificationStore>()(
    devtools(
        (set, get) => ({
            notifications: [],
            pushNotification: (notification) => {
                notification.id = notification.messeage + get().notifications.length;

                set(() => ({
                    ...get(),
                    notifications: [...get().notifications, notification],
                }));
            },
            onDelete: (id) => {
                set(() => ({
                    ...get(),
                    notifications: get().notifications.filter(notification => notification.id != id)
                }));
            }
        }),
        {
            name: 'notifications',
        }
    )
)
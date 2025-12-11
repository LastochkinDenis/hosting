import { IUser } from '@/types/user';

import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';


export interface IUserStore extends IUser {
    clearUserData: () => void
}


export const useUserStore = create<IUserStore>()(
    devtools(persist(
        (set, get) => ({
            id: 0,
            user_name: '',
            first_name: '',
            last_name: '',
            phone: '',
            email_verified: false,
            phoen_verified: false,
            isp_account_id: '',
            created_at: '',
            hosting_account: {
                ftp_username: '',
                home_directory: ''
            },
            isp_login_link: '',
            clearUserData: () => {
                set(() => ({
                    id: 0,
                    userName: '',
                    first_name: '',
                    last_name: '',
                    phone: '',
                    email_verified: false,
                    phoen_verified: false,
                    isp_account_id: '',
                    created_at: '',
                    hosting_account: {
                        ftp_username: '',
                        home_directory: ''
                    },
                    isp_login_link: ''
                }))
            }
        }),
        {
            name: 'user',
            storage: createJSONStorage(() => localStorage)
        }
    ))
)
'use client';
import { POPOVER_STYLE } from "@/lib/styleConst";
import { useUserStore } from "@/store/userStore";
import { useAuthStore } from "@/store/authStore";

import { Popover } from "antd";
import { useState } from 'react';
import Link from "next/link";

export default function UserPopover({ children }: { children: React.ReactNode }) {
    const { logout } = useAuthStore();
    const { clearUserData } = useUserStore();

    const logoutUser = () => {
        logout();
        clearUserData();
    }

    return <Popover
        styles={{...POPOVER_STYLE}}
        trigger={'hover'}
        placement='rightBottom'
        content={<ul className="popever">
            <li className="popever__item">
                <Link href={"/account/"}>
                    <span className="material-symbols-outlined">person</span>
                    <span>Личный кабинет</span>
                </Link>
            </li>
            <li className="popever__item">
                <button onClick={logoutUser}>
                    <span className="material-symbols-outlined">logout</span>
                    <span>Выйти</span>
                </button>
            </li>
        </ul>}
    >
        {children}
    </Popover>
}
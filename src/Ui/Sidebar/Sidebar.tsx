'use client';
import './Sidebar.scss';

import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';

export default function Sidebar() {
    const [isShow, setIsShow] = useState<boolean>(true);

    return <aside className='sidebar'>
        <div className="sidebar-head">
            <button className='sidevar-head__burger'>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <Link href={'/'}  className='sedebar-head__logo'>
                HostPanel
            </Link>
        </div>
    </aside>
}
'use client';
import './Sidebar.scss';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const menuItems = [
  { icon: 'dashboard', label: 'Обзор', href: '/dashboard' },
  { icon: 'public', label: 'Домены', href: '/dashboard/domains' },
  { icon: 'folder_open', label: 'Файлы', href: '/dashboard/files' },
  { icon: 'database', label: 'Базы данных', href: '/dashboard/databases' },
  { icon: 'receipt_long', label: 'Счета', href: '/dashboard/billing' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuthStore();
  const { first_name, clearUserData } = useUserStore();
  const [ isShow, setIsShow ] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('.dashboard-sidebar__item')?.forEach(item => {
        item.classList.toggle('dashboard-sidebar__item--hide', !isShow);
      })
    }, 500)
  }, [isShow])

  return (
    <aside className={`dashboard-sidebar ${isShow ? '' : 'hide'}`}>
      <div className="dashboard-sidebar__header">
        <button className='dashboard-sidebar__burger' onClick={() => {
          setIsShow(prev => !prev);
        }}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        {isShow && <h1 className="dashboard-sidebar__logo">HostPanel</h1>}
        {!isShow && <h1 className='dashboard-sidebar__logo'>H</h1>}
      </div>      
      <nav className="dashboard-sidebar__nav">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`dashboard-sidebar__item ${isActive ? 'dashboard-sidebar__item--active' : ''}`}
            >
              <span className="material-symbols-outlined dashboard-sidebar__icon">
                {item.icon}
              </span>
              <p className="dashboard-sidebar__label">{item.label}</p>
            </Link>
          );
        })}
      </nav>
      <div className="dashboard-sidebar__footer">
        <div className="dashboard-sidebar__user">
          <div
            className="dashboard-sidebar__avatar"
            // style={{
            //   backgroundImage: user?.avatar ? `url("${user.avatar}")` : undefined,
            // }}
          />
          {
            isShow &&
            <div className="dashboard-sidebar__user-info">
                <h2 className="dashboard-sidebar__user-name">{first_name || 'Пользователь'}</h2>
                <button
                  className="dashboard-sidebar__logout"
                  onClick={() => {
                    logout();
                    clearUserData();
                  }}
                >
                  Выйти
                </button>
            </div>
          }
        </div>
      </div>
    </aside>
  );
}

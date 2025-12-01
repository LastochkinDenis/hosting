'use client';
import './QuickActions.scss';
import Link from 'next/link';

const actions = [
  { icon: 'folder', label: 'Файлы', href: '/dashboard/files' },
  { icon: 'file_upload', label: 'FTP-аккаунты', href: '/dashboard/ftp' },
  { icon: 'database', label: 'Базы данных', href: '/dashboard/databases' },
  { icon: 'mail', label: 'Почта', href: '/dashboard/mail' },
];

export default function QuickActions() {
  return (
    <div className="quick-actions">
      <h3 className="quick-actions__title">Быстрые действия</h3>
      <div className="quick-actions__grid">
        {actions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="quick-actions__item"
          >
            <span className="material-symbols-outlined quick-actions__icon">
              {action.icon}
            </span>
            <span className="quick-actions__label">{action.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

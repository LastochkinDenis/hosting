'use client';
import './Header.scss';
import { mockDashboardData } from '@/lib/mockApi';

export default function Header() {
  const balance = mockDashboardData.balance;

  return (
    <header className="dashboard-header">
      <div className="dashboard-header__search">
        <label className="dashboard-header__search-label">
          <div className="dashboard-header__search-wrapper">
            <div className="dashboard-header__search-icon-wrapper">
              <span className="material-symbols-outlined dashboard-header__search-icon">
                search
              </span>
            </div>
            <input
              className="dashboard-header__search-input"
              type="text"
              placeholder="Поиск доменов, файлов..."
            />
          </div>
        </label>
      </div>
      <div className="dashboard-header__actions">
        <div className="dashboard-header__balance">
          <span className="dashboard-header__balance-label">Баланс:</span>
          <span className="dashboard-header__balance-value">{balance.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽</span>
          <button className="dashboard-header__balance-button">Пополнить</button>
        </div>
        <div className="dashboard-header__divider"></div>
        <button className="dashboard-header__icon-button">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="dashboard-header__icon-button">
          <span className="material-symbols-outlined">help</span>
        </button>
      </div>
    </header>
  );
}

'use client';
import './ServicesCard.scss';
import { mockDashboardData } from '@/lib/mockApi';

export default function ServicesCard() {
  const { plan, renewalDate, status } = mockDashboardData.services;

  return (
    <div className="services-card">
      <h3 className="services-card__title">Мои услуги</h3>
      <div className="services-card__content">
        <div className="services-card__item">
          <div className="services-card__info">
            <p className="services-card__plan">{plan}</p>
            <p className="services-card__date">Продление: {renewalDate}</p>
          </div>
          <span className={`services-card__status services-card__status--${status === 'Активен' ? 'active' : 'inactive'}`}>
            {status}
          </span>
        </div>
        <button className="services-card__button">Управлять</button>
      </div>
    </div>
  );
}

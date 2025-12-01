'use client';
import './BillingCard.scss';
import { mockDashboardData } from '@/lib/mockApi';

export default function BillingCard() {
  const { nextPayment, amount } = mockDashboardData.billing;

  return (
    <div className="billing-card">
      <h3 className="billing-card__title">Счета и оплата</h3>
      <div className="billing-card__content">
        <div className="billing-card__item">
          <div className="billing-card__info">
            <p className="billing-card__label">Следующий платеж</p>
            <p className="billing-card__date">{nextPayment}</p>
          </div>
          <p className="billing-card__amount">{amount.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽</p>
        </div>
        <button className="billing-card__button">Оплатить счет</button>
      </div>
    </div>
  );
}

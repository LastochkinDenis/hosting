'use client';
import './ServicesCard.scss';
import { mockDashboardData } from '@/lib/mockApi';
import { BILLING_SUBSCRIPTIONS_CURRENT } from '@/lib/api_endpoint';
import { instance } from '@/lib/axios_settings';

import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';

interface IPlanData { 
  plan: string | null;
  status: string | null;
  renewalDate: string | null;
}

export default function ServicesCard() {
  const [ planData, setPlanData ] = useState<IPlanData>();

  useEffect(() => {
      instance.get(BILLING_SUBSCRIPTIONS_CURRENT)
      .then(response => response.data)
      .then(data => {
        setPlanData({
          plan: data.plan.name,
          status: data.is_active,
          renewalDate: data.end_date
        });
      })
      .catch(e => {
        if(isAxiosError(e)) {
          setPlanData({
            plan: JSON.parse(e.request.response).detail,
            status: null,
            renewalDate: null
          });
        }
      });
  }, []);

  return (
    <div className="services-card">
      <h3 className="services-card__title">Мои услуги</h3>
      <div className="services-card__content">
        <div className="services-card__item">
          <div className="services-card__info">
            <p className="services-card__plan">Активный тариф {planData?.plan}</p>
            { planData?.renewalDate != null && <p className="services-card__date">Продление: {planData?.renewalDate}</p> }
          </div>
          {
            planData?.status != null &&
            <span className={`services-card__status services-card__status--${planData?.status ? 'active' : 'inactive'}`}>
              {planData?.status ? 'Активен' : 'Не активен'}
            </span>
          }
        </div>
        <button className="services-card__button">Управлять</button>
      </div>
    </div>
  );
}

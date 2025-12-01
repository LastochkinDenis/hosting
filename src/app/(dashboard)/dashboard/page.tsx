'use client';
import './dashboard-page.scss';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import ResourceUsage from '@/components/Dashboard/ResourceUsage/ResourceUsage';
import ServicesCard from '@/components/Dashboard/ServicesCard/ServicesCard';
import BillingCard from '@/components/Dashboard/BillingCard/BillingCard';
import DomainsTable from '@/components/Dashboard/DomainsTable/DomainsTable';
import QuickActions from '@/components/Dashboard/QuickActions/QuickActions';

export default function DashboardPage() {
  const firstName = useUserStore(state => state.first_name) ?? 'Пользователь';
  // const firstName = user?.name.split(' ')[0] || 'Пользователь';

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-page__title">Добро пожаловать, {firstName}!</h1>
      <div className="dashboard-page__grid dashboard-page__grid--top">
        <div className="dashboard-page__resource-usage">
          <ResourceUsage />
        </div>
        <div className="dashboard-page__services">
          <ServicesCard />
        </div>
        <div className="dashboard-page__billing">
          <BillingCard />
        </div>
      </div>
      <div className="dashboard-page__grid dashboard-page__grid--bottom">
        <div className="dashboard-page__domains">
          <DomainsTable />
        </div>
        <div className="dashboard-page__quick-actions">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}

'use client';
import './ResourceUsage.scss';
import { mockDashboardData } from '@/lib/mockApi';

export default function ResourceUsage() {
  const { disk, traffic, email, databases } = mockDashboardData.resources;

  const getPercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  const getStatusColor = (percentage: number) => {
    if (percentage >= 80) return '#DE350B';
    if (percentage >= 50) return '#FFAB00';
    return '#135bec';
  };

  return (
    <div className="resource-usage">
      <h3 className="resource-usage__title">Использование ресурсов</h3>
      <div className="resource-usage__grid">
        <div className="resource-usage__item">
          <div className="resource-usage__header">
            <span className="resource-usage__label">Диск</span>
            <span className="resource-usage__value">
              {disk.used} {disk.unit} / {disk.total} {disk.unit}
            </span>
          </div>
          <div className="resource-usage__bar">
            <div
              className="resource-usage__bar-fill"
              style={{
                width: `${getPercentage(disk.used, disk.total)}%`,
                backgroundColor: getStatusColor(getPercentage(disk.used, disk.total)),
              }}
            />
          </div>
        </div>
        <div className="resource-usage__item">
          <div className="resource-usage__header">
            <span className="resource-usage__label">Трафик</span>
            <span className="resource-usage__value">
              {traffic.used} {traffic.unit} / {traffic.total} {traffic.unit}
            </span>
          </div>
          <div className="resource-usage__bar">
            <div
              className="resource-usage__bar-fill"
              style={{
                width: `${getPercentage(traffic.used, traffic.total)}%`,
                backgroundColor: getStatusColor(getPercentage(traffic.used, traffic.total)),
              }}
            />
          </div>
        </div>
        <div className="resource-usage__item">
          <div className="resource-usage__header">
            <span className="resource-usage__label">Email-аккаунты</span>
            <span className="resource-usage__value">
              {email.used} / {email.total}
            </span>
          </div>
          <div className="resource-usage__bar">
            <div
              className="resource-usage__bar-fill"
              style={{
                width: `${getPercentage(email.used, email.total)}%`,
                backgroundColor: getStatusColor(getPercentage(email.used, email.total)),
              }}
            />
          </div>
        </div>
        <div className="resource-usage__item">
          <div className="resource-usage__header">
            <span className="resource-usage__label">Базы данных</span>
            <span className="resource-usage__value">
              {databases.used} / {databases.total}
            </span>
          </div>
          <div className="resource-usage__bar">
            <div
              className="resource-usage__bar-fill"
              style={{
                width: `${getPercentage(databases.used, databases.total)}%`,
                backgroundColor: getStatusColor(getPercentage(databases.used, databases.total)),
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

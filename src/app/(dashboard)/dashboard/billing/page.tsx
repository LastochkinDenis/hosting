"use client";
import "./page.scss";
import { instance } from "@/lib/axios_settings";
import { useNotificationStore } from "@/store/notificationStrore";
import {
  ICurrentSubscription,
  EMPTY_CURRENT_SUBSCRIPTION,
} from "@/types/biling";
import { TRANSLATE_RESOURCE_USAGE, UNIT_RESOURCE_USAGE } from "@/lib/constData";
import ResourceUsageItem from "@/Ui/ResourceUsageItem/ResourceUsageItem";
import { getCurrentSubsctiption } from "@/lib/apiFucntion";

import { useState, useEffect } from "react";

export default function Page() {
  const { pushNotification } = useNotificationStore();
  const [currentSubscription, setCurrentSubscription] =
    useState<ICurrentSubscription>(EMPTY_CURRENT_SUBSCRIPTION);

  useEffect(() => {
    getCurrentSubsctiption()
      .then((data) => {
        setCurrentSubscription(data);
      })
      .catch((e) => {
        console.log(e);
        pushNotification({
          messeage: "Произошла ошибка загрузки тарифа",
          type: "error",
        });
      });
  }, []);

  return (
    <>
      <h1 className="dashboard-page__title h1">Счета</h1>
      <section className="current-subscription">
        <div className="current-subscription__top">
          <h2 className="current-subscription__title h2">
            {currentSubscription?.plan.name}
          </h2>
          {currentSubscription?.end_date && (
            <p className="h4 current-subscription__data-end">
              Действует до
              {
                new Date(currentSubscription.end_date)
                  .toLocaleString("ru-RU")
                  .split(", ")[0]
              }
            </p>
          )}
        </div>
        <div className="current-subscription__content">
          <div className="current-subscription__info">
            <div className="current-subscription__info-item">
              <p className="current-subscription__info-item-title">
                Статус подписки
              </p>
              {currentSubscription.is_active ? (
                <p className="item-successful p2">Активный</p>
              ) : (
                <p className="item-error">Истек</p>
              )}
            </div>
            <div className="current-subscription__info-item">
              <p className="current-subscription__info-item-title">
                Авто обнавление
              </p>
              {currentSubscription.auto_renew ? (
                <p className="item-successful p2">Активный</p>
              ) : (
                <p className="item-error">Истек</p>
              )}
            </div>
            <div className="current-subscription__info-item">
              <p className="current-subscription__info-item-title">
                Стоимость в день
              </p>
              <p className="h3">
                {currentSubscription.plan.daily_price.toLocaleString("ru-RU", {
                  minimumFractionDigits: 2,
                })} ₽
              </p>
            </div>
            <div className="current-subscription__info-item">
              <p className="current-subscription__info-item-title">
                Стоимость подписки
              </p>
              <p className="h3">
                {currentSubscription.plan.price_rub} ₽
              </p>
            </div>
          </div>
          {Object.keys(currentSubscription.plan.resource).length > 0 && (
            <div className="current-subscription__resourse-useage">
              {Object.entries(currentSubscription.plan.resource).map((item) => (
                <ResourceUsageItem
                  key={item[0]}
                  title={item[1].title}
                  used={item[1].used}
                  limit={item[1].limit}
                  unit={item[1].unit}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

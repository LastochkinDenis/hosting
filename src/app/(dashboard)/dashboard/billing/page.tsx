"use client";
import "./page.scss";
import { instance } from "@/lib/axios_settings";
import { useNotificationStore } from "@/store/notificationStrore";
import {
  ICurrentSubscription,
  EMPTY_CURRENT_SUBSCRIPTION,
  ISubscription,
} from "@/types/biling";
import ResourceUsageItem from "@/Ui/ResourceUsageItem/ResourceUsageItem";
import { getCurrentSubsctiption } from "@/lib/apiFucntion";
import { BILLING_PLANS } from "@/lib/api_endpoint";
import SubscriptionItem from "@/components/Dashboard/SubsriptionsItem/SubscriptionItem";

import { useState, useEffect } from "react";
import { isAxiosError } from "axios";

export default function Page() {
  const { pushNotification } = useNotificationStore();
  const [currentSubscription, setCurrentSubscription] =
    useState<ICurrentSubscription>();
  const [subscriptions, setSubscriptions] = useState<Array<ISubscription>>([]);

  useEffect(() => {
    getCurrentSubsctiption()
      .then((data) => {
        setCurrentSubscription(data);
      })
      .catch((e) => {
        if (isAxiosError(e)) {
          if(e.status != 404) {
            pushNotification({
              messeage: e.response?.data.detail,
              type: 'error'
            })
          }
        } else {
          console.log(e);
          pushNotification({
            messeage: "Произошла ошибка загрузки тарифа",
            type: "error",
          });
        }
      });
  }, []);

  useEffect(() => {
    const getData = async () => {
      instance
        .get(BILLING_PLANS)
        .then((response) => response.data)
        .then((data) => {
          if (Array.isArray(data)) {
            setSubscriptions(
              data.map((plan) => {
                return {
                  id: plan.id,
                  name: plan.name,
                  price_rub: plan.price_rub,
                  daily_price: Number(plan.daily_price),
                  isp_type: plan.isp_type,
                  is_active: plan.is_active,
                  resource: Object.entries(plan).reduce((result, item) => {
                    let key = item[0];
                    const value = item[1];

                    if (
                      typeof value != "number" ||
                      key == "id" ||
                      value == 0 ||
                      key == "price_rub"
                    )
                      return result;

                    //Приводим ключи к единой форме
                    key = key
                      .replace(/_limit$|limit_|limit/, "")
                      .replace(/^max_/, "");

                    result[key] = Number(value);

                    return result;
                  }, {} as Record<string, number>),
                } as ISubscription;
              })
            );
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    getData();
  }, []);

  return (
    <>
      <h1 className="dashboard-page__title h1">Счета</h1>
      {typeof currentSubscription != "undefined" && (
        <section className="current-subscription">
          <div className="current-subscription__top">
            <h2 className="current-subscription__title h2">
              {currentSubscription.plan.name}
            </h2>
            {currentSubscription?.end_date && (
              <p className="p3 current-subscription__data-end">
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
                <p className="current-subscription__info-item-title h6">
                  Статус подписки
                </p>
                {currentSubscription.is_active ? (
                  <p className="item-successful p2">Активный</p>
                ) : (
                  <p className="item-error">Истек</p>
                )}
              </div>
              <div className="current-subscription__info-item">
                <p className="current-subscription__info-item-title h6">
                  Авто обнавление
                </p>
                {currentSubscription.auto_renew ? (
                  <p className="item-successful p2">Активный</p>
                ) : (
                  <p className="item-error">Истек</p>
                )}
              </div>
              <div className="current-subscription__info-item">
                <p className="current-subscription__info-item-title h6">
                  Стоимость в день
                </p>
                <p className="h3">
                  {currentSubscription.plan.daily_price.toLocaleString(
                    "ru-RU",
                    {
                      minimumFractionDigits: 2,
                    }
                  )}{" "}
                  ₽
                </p>
              </div>
              <div className="current-subscription__info-item">
                <p className="current-subscription__info-item-title h6">
                  Стоимость подписки
                </p>
                <p className="h3">{currentSubscription.plan.price_rub} ₽</p>
              </div>
            </div>
            {Object.keys(currentSubscription.plan.resource).length > 0 && (
              <div className="current-subscription__resourse-useage">
                {Object.entries(currentSubscription.plan.resource).map(
                  (item) => (
                    <ResourceUsageItem
                      key={item[0]}
                      title={item[1].title}
                      used={item[1].used}
                      limit={item[1].limit}
                      unit={item[1].unit}
                    />
                  )
                )}
              </div>
            )}
          </div>
        </section>
      )}
      {subscriptions.length > 0 && (
        <div className="subscription-list">
          {subscriptions.map((item) => (
            <SubscriptionItem
              key={item.id}
              {...item}
              is_subscipted={item.id == currentSubscription?.plan.id}
            />
          ))}
        </div>
      )}
    </>
  );
}

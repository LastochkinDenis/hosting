"use cleint";
import "./SubscriptionItem.scss";
import { ICurrentSubscription, ISubscription } from "@/types/biling";
import { TRANSLATE_RESOURCE_USAGE, UNIT_RESOURCE_USAGE } from "@/lib/constData";
import { instance } from "@/lib/axios_settings";
import {
  BILLING_SUBSCRIPTIONS_CURRENT,
  BILLING_SUBSCRIPTIONS,
  SUBSCRIPTIONS_LIMIT
} from "@/lib/api_endpoint";
import { useNotificationStore } from "@/store/notificationStrore";
import "@ant-design/v5-patch-for-react-19";

import { Popconfirm } from "antd";
import { isAxiosError } from "axios";
import { platform } from "os";

interface IProps extends ISubscription {
  is_subscipted: boolean;
  is_have_subscipted?: boolean;
  handleUpdateSubscription?: () => void
}

export default function SubscriptionItem({
  id,
  name,
  price_rub,
  daily_price,
  isp_type,
  is_active,
  resource,
  is_subscipted,
  is_have_subscipted,
  handleUpdateSubscription
}: IProps) {
  const { pushNotification } = useNotificationStore();

  const handleChangeSubcription = () => {
    const requestSubsciptionItem = is_have_subscipted
      ? instance.put(BILLING_SUBSCRIPTIONS_CURRENT, {
          plan_id: id,
          auto_renew: true,
        })
      : instance.post(BILLING_SUBSCRIPTIONS, {
          plan_id: id,
          auto_renew: true,
        });

    requestSubsciptionItem
      .then((response) => response.data)
      .then((data) => {
        if(typeof handleUpdateSubscription != 'undefined') {
          handleUpdateSubscription();
        }

        pushNotification({
          messeage: `Тариф ${name} подключен`,
          type: "success",
        });
      })
      .catch((e) => {
        if (isAxiosError(e)) {
          if (typeof e.response?.data.detail == "string") {
            const min_balance = Number(
              e.response.data.detail.match(/\d+\.\d+|\d+/)
            ).toFixed(2);
            if (min_balance != "NaN") {
              pushNotification({
                messeage: e.response.data.detail.replace(
                  /\d+\.\d+|\d+/,
                  min_balance
                ),
                type: "error",
              });
            } else {
              pushNotification({
                messeage: e.response.data.detail,
                type: "error",
              });
            }
          }
        }
      });
  };

  return (
    <div className="subscription-item">
      <div className="subscription-item__content">
        <p className="subscription-item__title h3">{name}</p>
        {typeof resource != "undefined" && (
          <div className="subscription-item__resource">
            {Object.entries(resource).map((item) => {
              const [key, value] = item;

              return (
                <div key={key} className="subscription-item__resource-item">
                  <p className="subscription-item__resource-item-name p2">
                    {TRANSLATE_RESOURCE_USAGE[key]}
                  </p>
                  <span></span>
                  <p className="subscription-item__resource-value p2">
                    {value} {UNIT_RESOURCE_USAGE[key]}
                  </p>
                </div>
              );
            })}
          </div>
        )}
        <div className="subscription-item__cost">
          <p className="subscription-item__price h3">
            <span className="subscription-item__cost-title p3">
              Стоимость подписки:
            </span>
            {price_rub ? price_rub.toString() + " ₽" : "Бесплатно"}
          </p>
          {daily_price > 0 && (
            <p className="subscription-item__daily-price h3">
              <span className="subscription-item__cost-title p3">
                Стоимость в день:
              </span>
              {daily_price.toFixed(2)} ₽
            </p>
          )}
        </div>
      </div>
      {is_subscipted ? (
        <button className="btn mini second">Уже активна</button>
      ) : (
        <Popconfirm
          trigger={"click"}
          cancelText="Нет"
          okText="Да"
          onConfirm={handleChangeSubcription}
          title={`Хотите пописаться на тариф ${name}?`}
        >
          <button className="btn mini">Подписаться</button>
        </Popconfirm>
      )}
    </div>
  );
}

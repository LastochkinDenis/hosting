"use client";
import "./ResourceUsage.scss";
import { mockDashboardData } from "@/lib/mockApi";
import ResourceUsageItem from "@/Ui/ResourceUsageItem/ResourceUsageItem";
import { SUBSCRIPTIONS_LIMIT } from "@/lib/api_endpoint";
import { instance } from "@/lib/axios_settings";
import { TRANSLATE_RESOURCE_USAGE, UNIT_RESOURCE_USAGE } from '@/lib/constData';

import { useState, useEffect } from "react";

interface IResouseUsage {
  [key: string]: {
    title: string;
    used: number;
    limit: number;
    unit: string;
  };
}

export default function ResourceUsage() {
  const { disk, traffic, email, databases } = mockDashboardData.resources;
  const [resourceUsege, setResourceUsage] = useState<IResouseUsage>({});

  useEffect(() => {
    instance
      .get(SUBSCRIPTIONS_LIMIT)
      .then((response) => response.data)
      .then((data) => {
        if ("subscription" in data && "resources_usage" in data) {
          let resource = {};

          Object.entries(data.subscription.plan).forEach((item) => {
            let [key, value] = item;

            if (key == "price_rub" || key == "id" || key == "daily_price")
              return;

            if (value === 0 || typeof value != 'number') return;

            key = key.replace(/_limit$|limit_|limit/, "").replace(/^max_/, '');

            resource[key] = {
              title: TRANSLATE_RESOURCE_USAGE[key] ?? '',
              limit: value,
              unit: UNIT_RESOURCE_USAGE[key] ?? ''
            };
          });

          Object.entries(data.resources_usage).forEach(item => {
            let [key, value] = item;

            key = key.replace('used_', '');
                      
            if(!(key in resource)) return;

            resource[key].used = Number(value);
          })

          setResourceUsage(resource);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="resource-usage">
      <h3 className="resource-usage__title">Использование ресурсов</h3>
      <div className="resource-usage__grid">
        {Object.keys(resourceUsege).length > 0 &&
          Object.entries(resourceUsege).map((item) => {
            const [key, data] = item;
            return (
              <ResourceUsageItem
                key={key}
                title={data.title}
                used={data.used}
                limit={data.limit}
                unit={data.unit}
              />
            );
          })}
        {Object.keys(resourceUsege).length == 0 && (
          <p className="p2">Нет используемых ресурсов</p>
        )}
      </div>
    </div>
  );
}

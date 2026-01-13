"use client";
import "./ResourceUsage.scss";
import { mockDashboardData } from "@/lib/mockApi";
import ResourceUsageItem from "@/Ui/ResourceUsageItem/ResourceUsageItem";
import { instance } from "@/lib/axios_settings";
import { IResouseUsage } from '@/types/biling';
import { getCurrentSubsctiption } from "@/lib/apiFucntion";

import { useState, useEffect } from "react";

export default function ResourceUsage() {
  const { disk, traffic, email, databases } = mockDashboardData.resources;
  const [resourceUsege, setResourceUsage] = useState<IResouseUsage>({});

  useEffect(() => {
    getCurrentSubsctiption()
    .then(data => {
      setResourceUsage(data.plan.resource);
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

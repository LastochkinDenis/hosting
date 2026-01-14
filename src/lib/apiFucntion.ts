import { instance } from "@/lib/axios_settings";
import { SUBSCRIPTIONS_LIMIT } from "@/lib/api_endpoint";
import { ICurrentSubscription, IResouseUsage, EMPTY_CURRENT_SUBSCRIPTION } from "@/types/biling";
import { TRANSLATE_RESOURCE_USAGE, UNIT_RESOURCE_USAGE } from "@/lib/constData";

export function getCurrentSubsctiption(): Promise<ICurrentSubscription> {
    return instance.get(SUBSCRIPTIONS_LIMIT)
    .then(respnse => respnse.data)
    .then(data => {
        return [{
        id: data.subscription.id,
        is_active: data.subscription.is_active,
        auto_renew: data.subscription.auto_renew,
        start_date: data.subscription.start_date,
        end_date: data.subscription.end_date,
        plan: {
            id: data.subscription.plan.id,
            name: data.subscription.plan.name,
            price_rub: data.subscription.plan.price_rub,
            daily_price: Number(data.subscription.plan.daily_price),
            isp_type: data.subscription.plan.isp_type,
            is_active: data.subscription.plan.is_active,
            resource: Object.entries(data.subscription.plan).reduce((result, item) => {
            let [key, value] = item;
            
            if (typeof value != "number" || value == 0 || key == "id")
                return result;

            //Приводим ключи к единой форме
            key = key
                .replace(/_limit$|limit_|limit/, "")
                .replace(/^max_/, "");

            result[key] = {
                title: TRANSLATE_RESOURCE_USAGE[key] ?? "",
                used: 0,
                limit: value,
                unit: UNIT_RESOURCE_USAGE[key] ?? "",
            };

            return result;
            }, {} as IResouseUsage),
        },
        }, data.resources_usage];
    })
    .then(data => {
        const [subscription, usegeResurce] = data;

        Object.entries(usegeResurce).forEach(item => {
            let [key, value] = item;

            //Приводим ключи к единой форме
            key = key.replace("used_", "");

            if(!(key in subscription.plan.resource)) return;

            subscription.plan.resource[key].used = Number(value);
        })

        return subscription;
    })
}


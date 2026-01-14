export interface IResouseUsage {
  [key: string]: {
    title: string;
    used: number;
    limit: number;
    unit: string;
  };
}

export interface ICurrentSubscription {
    id: number;
    is_active: boolean;
    auto_renew: boolean;
    start_date: string;
    end_date: string;
    plan: {
        id: number;
        name: string
        price_rub: number;
        daily_price: number;
        resource: IResouseUsage;
        isp_type: string;
        is_active: boolean;
    }
}

export interface ISubscription {
  id: number;
  name: string;
  price_rub: number;
  daily_price: number;
  isp_type: string;
  is_active: boolean;
  resource?: Record<string, number>
}

export const EMPTY_CURRENT_SUBSCRIPTION:ICurrentSubscription = {
  id: 0,
  is_active: false,
  auto_renew: false,
  start_date: "",
  end_date: "",
  plan: {
    id: 0,
    name: "",
    price_rub: 0,
    daily_price: 0,
    resource: {},
    isp_type: "",
    is_active: false,
  },
};
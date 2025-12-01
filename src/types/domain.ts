export interface IDomenResponse {
    dname: string;
    price: number | null;
    available: boolean;
}

export interface IDomainTable {
  key: React.Key
  domen: string,
  status: 'Активен' | 'Истек',
  expires: string,
  settings: undefined,
}

export interface IDomain {
    id: number;
    name: string;
    status: string;
    registered_at: string;
    expires_at: string;
    auto_renew: true;
    nameservers: Array<string>;
    isp_domain_id: string;
}

export function isIDomain(x: unknown): x is IDomain {
  return typeof x == 'object' &&
  x !== null &&
  'id' in x &&
  'name' in x &&
  'status' in x &&
  'registered_at' in x &&
  'expires_at' in x &&
  'auto_renew' in x &&
  'isp_domain_id' in x;
}
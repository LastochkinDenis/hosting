export interface IDomenSearch {
    dname: string;
    price: number | null;
    available: boolean;
}

export interface IDomainTable {
  key: React.Key
  id: number,
  domen: string,
  status: 'active' | 'inactive',
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

export enum recordType {
  A = 'A',
  AAAA = 'AAAA',
  CNAME = 'CNAME',
  MX = 'MX',
  NS = 'NS',
  TXT = 'TXT',
  SRV = 'SRV',
  CAA = 'CAA'
}

export interface IResourceRecords {
  id: number,
  domain_id: number,
  record_type: recordType,
  name: string,
  value: string,
  ttl: string,
  priority: number,
  created_at: string
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
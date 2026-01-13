
// AUTH
export const REFRESH_TOKEN = '/auth/refresh';
export const REGISTER_USER = '/auth/register';
export const LOGIN_USER = '/auth/login';

// USER
export const USER_ME = '/users/me';

// REGRU
export const CHECK_DOMAIN = '/regru/check';
export const SUGGESTIONS_DOMAIN = '/regru/suggest/';
export const REGISTER_DOMAIN = '/regru/register'

//DOMENS
export const GET_USER_DOMAINS = '/domains';
export const GET_DOMAIN_DETAILS = (id: string) => `/domains/${id}`;
export const GET_DOMAIN_DNS = (id: string) => `/domains/${id}/dns`;
export const CREATE_DNS_RECORD = (id:string) => `/domains/${id}/dns`;
export const UPDATE_DNS_RECORD = (domain_id: string, record_id: string) => `/domains/${domain_id}/dns/${record_id}`
export const DELETE_DNS_RECORD = (domain_id: string, record_id: string) => `/domains/${domain_id}/dns/${record_id}`

//PROFILES
export const PROFILES_INDIVIDUAL = '/profiles/individual';
export const PROFILES_ORGANIZATION = '/profiles/organization';
export const PROFILES_INDIVIDUAL_UPDATE = (profile_id: string) => `/profiles/individual/${profile_id}`;
export const PROFILES_ORGANIZATION_UPDATE = (profile_id: string) => `/profiles/organization/${profile_id}`;
export const PROFILES_INDIVIDUAL_DELETE = (profile_id: string) => `/profiles/individual/${profile_id}`;
export const PROFILES_ORGANIZATION_DELETE = (profile_id: string) => `/profiles/organization/${profile_id}`;

//BILLING
export const BILLING_PLANS = '/billing/plans';
export const BILLING_PLANS_BY_ID = (id: string) => `/billing/plans/${id}`;
export const BILLING_SUBSCRIPTIONS_CURRENT = '/billing/subscriptions/current';
export const BALANCE = '/billing/balance';
export const USED_RESOURCES = '/billing/resources';
export const SUBSCRIPTIONS_LIMIT = '/billing/subscription/limits';

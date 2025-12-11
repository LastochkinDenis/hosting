
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
export const GET_DOMAIN_DETAILS: (id: string) => string = (id: string) => `/domains/${id}`;
export const GET_DOMAIN_DNS: (id: string) => string = (id: string) => `/domains/${id}/dns`;
export const CREATE_DNS_RECORD = (id:string) => `/domains/${id}/dns`;
export const UPDATE_DNS_RECORD = (domain_id: string, record_id: string) => `/domains/${domain_id}/dns/${record_id}`
export const DELETE_DNS_RECORD = (domain_id: string, record_id: string) => `/domains/${domain_id}/dns/${record_id}`
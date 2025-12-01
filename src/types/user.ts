export type TypeUser = 'fizl' | 'uril';

export interface IHostingAcount {
    ftp_username: string;
    home_directory: string
}

export interface IUser {
    id: number;
    userName: string;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    email_verified: boolean;
    phoen_verified: boolean;
    isp_account_id: string;
    created_at: string;
    hosting_account: IHostingAcount;
    isp_login_link: string;
}

export function isTypeUser(obj: unknown): obj is TypeUser {
    return obj === 'fizl' || obj === 'uril'; 
}
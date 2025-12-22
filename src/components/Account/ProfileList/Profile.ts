import { TypeUser } from "@/types/user";

export interface IProfile {
    id: number,
    user_id: number,
    profile_name: string,
    typeProfile: TypeUser,
    profile_data: IProfileFiz | IProfileUrl
}

export interface IProfileFiz {
    id: number,
    user_id: number,
    profile_name: string,
    is_default: boolean,
    person_r_name: string,
    person_r_surname: string,
    person_r_patronimic: string,
    passport_series: string,
    passport_number: string,
    passport_date: string,
    passport_place: string,
    birth_date: string,
    email: string,
    phone: string,
    country: string,
    p_addr_zip: string,
    p_addr_area: string,
    p_addr_city: string,
    p_addr_addr: string,
    p_addr_recipient: string,
    created_at: string,
    updated_at: string,
}

export interface IProfileUrl {
    id: number,
    user_id: number,
    profile_name: string,
    is_default: boolean,
    org_name: string,
    org_name_r: string,
    inn: string,
    kpp: string,
    ogrn: string,
    email: string,
    phone: string,
    country: string,
    legal_addr_zip: string,
    legal_addr_area: string,
    legal_addr_city: string,
    legal_addr_addr: string,
    p_addr_zip: string,
    p_addr_area: string,
    p_addr_city: string,
    p_addr_addr: string,
    p_addr_recipient: string,
    contact_person_name: string,
    contact_person_position: string,
    created_at: string,
    updated_at: string
}
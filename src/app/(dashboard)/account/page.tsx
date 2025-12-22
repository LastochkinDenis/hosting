'use client'
import { instance } from "@/lib/axios_settings"
import  ProfileList from '@/components/Account/ProfileList/ProfileList'; 

export default function Page() {

    return <>
        <ProfileList />        
    </>
}
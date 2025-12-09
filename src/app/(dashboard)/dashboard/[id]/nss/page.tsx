'use client';
import { instance } from "@/lib/axios_settings";
import { GET_DOMAIN_DETAILS } from '@/lib/api_endpoint';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ResourceRecords from "@/components/Dashboard/ResourceRecords/ResourceRecords";

export default function Page() {
    const { id } = useParams();
    const [domainName, setDomainName] = useState<string>('');

    useEffect(() => {
        instance.get(GET_DOMAIN_DETAILS(id?.toString() ?? ''))
        .then(response => {
            if(response.status != 200) {
                throw Error();
            }
            return response.data
        })
        .then(data => {
            if(data) {
                setDomainName(data.name);
            }
        })
        .catch(e => {
            console.error(e);
        })
    })
  
    return <>
        <h1 className="dashboard-page__title h1">Измение ресурсные записей у домена {domainName}</h1>
        <ResourceRecords id={id?.toString() ?? ''} />
    </>
}
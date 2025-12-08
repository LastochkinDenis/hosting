'use clinet';
import './ResourceRecords.scss';
import { instance } from "@/lib/axios_settings";
import { GET_DOMAIN_DNS } from "@/lib/api_endpoint";
import { IResourceRecords, type record_type } from '@/types/domain';
import ResourceRecordItem from '@/components/Dashboard/ResourceRecords/ResourceRecordItem';


import { useState, useEffect } from "react";

export default function ResourceRecords({ id } : {id : string}) {

    const [resourceRecords, setResourceRecords] = useState<Array<IResourceRecords>>([]);

    useEffect(() => {
        instance.get(GET_DOMAIN_DNS(id))
        .then(response => {
            if(response.status != 200) {
                throw Error();
            }
            return response.data
        })
        .then(data => {
            console.log(data)
        })
    }, []);

    const handleRecordsClear = () => {

    }

    const handleRecordsAdd = () => {

    }

    return <div className="nss-editor">
        <div className="nss-editor__header">
            <p className="nss-editor__title h2">Ресурсные записи</p>
            <button className="btn" onClick={handleRecordsClear}>
                <span className="material-symbols-outlined">delete</span>
                Очистить зону
            </button>
        </div>
        <div className="nss-editor__content">
            <button onClick={handleRecordsAdd} className="nss-editor__item nss-editor__item--add-record">
                <span className="material-symbols-outlined">add</span>
                <span className='nss-editor__item-add-text'>Добавить запись</span>
            </button>
            {resourceRecords.map((item) => {
                return <ResourceRecordItem resourceRecords={item}  />
            })}
        </div>
    </div>
}
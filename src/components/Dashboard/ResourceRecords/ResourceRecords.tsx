'use clinet';
import './ResourceRecords.scss';
import { instance } from "@/lib/axios_settings";
import { GET_DOMAIN_DNS, DELETE_DNS_RECORD } from "@/lib/api_endpoint";
import { IResourceRecords, recordType } from '@/types/domain';
import ResourceRecordItem from '@/components/Dashboard/ResourceRecords/ResourceRecordItem';
import ModalRecord from './ModalRecord/ModalRecord';
import { useNotificationStore } from '@/store/notificationStrore';

import { useState, useEffect } from "react";
import { Popconfirm } from 'antd'
import type { PopconfirmProps } from 'antd';

export default function ResourceRecords({ id } : {id : string}) {
    const [resourceRecords, setResourceRecords] = useState<Array<IResourceRecords>>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { pushNotification } = useNotificationStore();
    const [tRecord, setTRecord] = useState<recordType | undefined>();
    const [isUpdate, setIsUpdate] = useState<boolean>(false);

    const getResourceRecords = () => {
        instance.get(GET_DOMAIN_DNS(id))
        .then(response => {
            if(response.status != 200) {
                throw Error();
            }
            return response.data
        })
        .then(data => {
            setResourceRecords(data);
        })
    }

    useEffect(() => {
        getResourceRecords();
    }, []);
    

    const handleRecordsClear = () => {
        Promise.all(resourceRecords.map(item => {
            return instance.delete(DELETE_DNS_RECORD(item.domain_id.toString(), item.id.toString()))
        }))
        .then(response => {
            pushNotification({
                messeage: `Удаленно ${resourceRecords.length} записей`,
                type: 'success'
            })
            setResourceRecords([]);
        })
        .catch(e => {
            console.log(e);
            pushNotification({
                messeage: `Произошла ошибка при отчистек записей`,
                type: 'error'
            })
        })
    }

    const handleRecordsAdd = () => {
        setModalOpen(true);
    }

    return <>
        <div className="nss-editor">
            <div className="nss-editor__header">
                <p className="nss-editor__title h2">Ресурсные записи</p>
                <Popconfirm
                    title = 'Отчиска всей зоны'
                    description = 'Вы уверены что хотете удалить все записи?'
                    okText='Да'
                    cancelText='Нет'
                    onConfirm={handleRecordsClear}
                >
                    <button className="btn">
                        <span className="material-symbols-outlined">delete</span>
                        Очистить зону
                    </button>
                </Popconfirm>
            </div>
            <div className="nss-editor__content">
                <button onClick={handleRecordsAdd} className="nss-editor__item nss-editor__item--add-record">
                    <span className="material-symbols-outlined">add</span>
                    <span className='nss-editor__item-add-text'>Добавить запись</span>
                </button>
                {resourceRecords.map((item) => {
                    return <ResourceRecordItem key={item.id} resourceRecords={item} updateRecords={() => getResourceRecords()}  />
                })}
            </div>
        </div>
        {
            modalOpen && <ModalRecord 
            setIsOpen={(v) => setModalOpen(v)}
            updateRecords={() => getResourceRecords()} />
        }
    </>
}
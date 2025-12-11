'use client';

import './ResourceRecords.scss';
import { IResourceRecords, recordType } from '@/types/domain';
import ModalRecord from './ModalRecord/ModalRecord';
import { DELETE_DNS_RECORD } from '@/lib/api_endpoint';
import { instance } from '@/lib/axios_settings';

import '@ant-design/v5-patch-for-react-19';
import { useState } from 'react';
import { useNotificationStore } from '@/store/notificationStrore';
import { Popconfirm } from 'antd'
import type { PopconfirmProps } from 'antd';

interface IProps {
    resourceRecords: IResourceRecords,
    updateRecords: () => void
}

export default function ResourceRecordItem({ resourceRecords, updateRecords } : IProps) {

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { pushNotification } = useNotificationStore();

    const handleEdir = () => {
        setIsOpen(true);
    }

    const handleDelete: PopconfirmProps['onConfirm'] = () => {
        instance.delete(DELETE_DNS_RECORD(resourceRecords.domain_id.toString(), resourceRecords.id.toString()))
        .then(respnse => {
            updateRecords();
            pushNotification({
                messeage: `${resourceRecords.record_type} была удалена`,
                type: 'success'
            })
        })
        .catch(e => {
            console.log(e);
            pushNotification({
                messeage: `Произошла ошибка вовремя удаления ${resourceRecords.record_type} записи`,
                type: 'error'
            })
        });
    }

    return <>
        <div className='nss-editor__item'>
            <div className="nss-editor__item-value" onClick={handleEdir}>
                <span className='nss-editor__item-record-type'>{resourceRecords.record_type}</span>
                <span className='nss-editor__item-name'>{resourceRecords.name}</span>
                <span className="nss-editor__item-value">{resourceRecords.value}</span>
            </div>
            <div className="nss-editor__item-buttons">
                <button className='nss-editor__item-edit' onClick={handleEdir}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <Popconfirm
                    title={`Удаление ${resourceRecords.record_type} записи`}
                    description={`Вы точно хотите удалить ${resourceRecords.record_type} запись`}
                    onConfirm={handleDelete}
                    okText="Да"
                    cancelText="Нет"
                >
                    <button className='nss-ebitor__item-delete' >
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </Popconfirm>
            </div>
        </div>
        {isOpen && <ModalRecord 
            setIsOpen={(v:boolean) => setIsOpen(v)}
            type={resourceRecords.record_type}
            idRecord={resourceRecords.id.toString()}
            updateRecords={() => updateRecords()}
            dataRecord={{
                'name': resourceRecords.name,
                'value': resourceRecords.value,
                'priority': resourceRecords.priority.toString()
            }}
        />}
    </>
};
'use client'
import { recordType } from "@/types/domain"
import { MODAL_PADDING, MODAL_WIDTH } from "@/lib/styleConst";
import InputWrapper from "@/Ui/Input/InputWrapper";
import { instance } from "@/lib/axios_settings";
import { DomenContext } from "@/app/(dashboard)/dashboard/[id]/dns/page";
import { CREATE_DNS_RECORD, UPDATE_DNS_RECORD } from '@/lib/api_endpoint'
import { useNotificationStore } from '@/store/notificationStrore'
import '../ResourceRecords.scss';
import {
    IDataFieldServer,
    FieldType,
    IFieldA,
    IFieldAAAA,
    IFieldCname,
    IFieldTXT,
    IFieldMX,
    IFieldNS,
    IFieldSRV,
    IFieldCAA,
    fieldsByRecordType
} from './modalRecordType'
import { fieldsByRecord } from "./modalRecordTemplates";

import { Modal, Form, Input, Select } from "antd"
import type { FormProps } from "antd";
import { Rule } from 'antd/es/form';
import { useState, useContext } from "react";

interface IProps {
    setIsOpen: (v: boolean) => void;
    updateRecords: () => void;
    idRecord?: string;
    type?: recordType;
    dataRecord?: IDataFieldServer
}

export default function ModalRecord( {setIsOpen, type, idRecord, updateRecords, dataRecord}: IProps ) {
    const [recordT, setRecordT] = useState<recordType | undefined>(type);
    const [isLoad, setIsload] = useState<boolean>(false);
    const {domen, id} = useContext(DomenContext);
    const { pushNotification } = useNotificationStore();

    const renderChooseRecordT = () => {
        if(typeof recordT !== 'undefined') return undefined;

        return <div className="modal-record__choose-type">
            {
                Object.values(recordType).map(record => {
                    return (<div key={record} className="modal-record__choose-type-item--wrapper">
                            <input type="radio"  name="record-type" id={`record-${record}`} onChange={() => {setRecordT(record)}}  />
                            <label htmlFor={`record-${record}`} className="modal-record__choose-type-item">
                        <span className="modal-record__choose-type-item-text">{record}</span>
                    </label>
                </div>)
                })
            }
        </div>
    }

    const onFinish:FormProps<FieldType>['onFinish'] = async (values) => {

        let name: string = '';
        let value: string = '';
        let priority: null | number = null;

        if('subdomain' in values) {
            values.subdomain = values.subdomain.replace(`.${domen}`, '');
        }

        switch(recordT) {
            case(recordType.A):
                values = values as IFieldA;

                name = values.subdomain + '.' + domen;
                value = values.iPAddress;

                break;
            case(recordType.AAAA):
                values = values as IFieldAAAA;

                name = values.subdomain + '.' + domen;
                value = values.iPv6Address;

                break;
            case(recordType.CAA):
                values = values as IFieldCAA;
                
                break;
            case(recordType.CNAME):
                values = values as IFieldCname;

                name = values.subdomain + '.' + domen;
                value = values.canonicalName;

                break;
            case(recordType.MX):
                values = values as IFieldMX;

                name = values.subdomain + '.' + domen;
                value = values.mailServer;
                priority = values.priority

                break;
            case(recordType.NS):
                values = values as IFieldNS;

                name = values.subdomain + '.' + domen;
                value = values.dnsServer;
                priority = values.priority;

                break;
            case(recordType.SRV):
                values = values as IFieldSRV;
                break;
            case(recordType.TXT):
                values = values as IFieldTXT;

                name = values.subdomain + '.' + domen;
                value = values.text;

                break;
        }
        
        setIsload(true);

        const handleDnsChange = typeof idRecord == 'undefined' ? instance.post(CREATE_DNS_RECORD(id), {
                record_type: recordT,
                name: name,
                value: value,
                priority: priority,
                ttl: 3600
            }) : instance.put(UPDATE_DNS_RECORD(id, idRecord), {
                value: value,
                ttl: 3600,
                priority: 0
            });
        
        handleDnsChange
        .then(response => {
            updateRecords();
            pushNotification({
                messeage: `Запись ${recordT} успешно ${typeof idRecord == 'undefined' ? 'добавлена' : 'изменина' }`,
                type: 'success'
            });
            setIsOpen(false);
        })
        .catch(() => {
            pushNotification({
                messeage: `Не удалсь ${typeof idRecord == 'undefined' ? 'добавить' : 'изменить'} запись ${recordT} `,
                type: 'error'
            });
        })
        .finally(() => {
            setIsload(true);
        })

    }

    const renderSelect = (values: [number, number] | Array<string>, id: string) => {

        let option = [];

        if(typeof values[0] == 'number' && typeof values[1] == 'number') {
            for(let i = values[0]; i < values[1]; i++) {
                option.push({value: i, label: i});
            }
        }
        else {
            option = values.map(item => ({
                value: item,
                label: item
            }));
        }

        return <Select
            id={id}
            options={option}
        />;
    }

    return <Modal
    footer={null}
    width={MODAL_WIDTH}
    styles={{
        content: {
            padding: MODAL_PADDING
        }
    }}
    open={true}
    onCancel={() => setIsOpen(false)}
    >
        {renderChooseRecordT()}
        {typeof recordT !== 'undefined' &&
            <Form
                name="modal-record"
                onFinish={onFinish}
                validateTrigger="onSubmit"
            >
                <p className="modal-record__title h3">{typeof idRecord != 'undefined' ? 'Измение' : 'Создание'} {recordT} записи</p>
                <Form.Item<FieldType> 
                    name="type"
                    initialValue={recordT}
                    hidden={true}
                >
                    <Input />
                </Form.Item>
                {
                   Object.entries(fieldsByRecord[recordT]).map(item => {
                    const [key, field] = item;

                    if(key == 'type') {
                        return null;
                    }

                    return <InputWrapper key={key} label={field.title} labelId={`modal-record-${field.keyField}`}>
                        <Form.Item<FieldType>
                            name={field.keyField}
                            rules={field.rules}
                            initialValue={typeof dataRecord != 'undefined' && dataRecord[field.dataServer]
                             ? dataRecord[field.dataServer].replace(`.${domen}`, '') : field.defaultValue}
                            >
                            {Array.isArray(field.typeField) && renderSelect(field.typeField, `modal-record-${field.keyField}`)}
                            {!Array.isArray(field.typeField) && 
                                <Input type={field.typeField} placeholder={field.title} id={`modal-record-${field.keyField}`} />
                            }
                        </Form.Item>
                    </InputWrapper>
                   })
                }
                <div className="modal-record__footer">
                    {
                        isLoad ? 
                            <button className='btn' disabled>
                                <span className="material-symbols-outlined load">progress_activity</span> <span className=''></span>
                                Загрузка...
                            </button>
                        :
                        <button className="btn" type="submit">
                            Сохранить
                        </button>
                    }
                </div>
            </Form>
        }
    </Modal>
}
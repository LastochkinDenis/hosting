'use client'
import { recordType, IResourceRecords } from "@/types/domain"
import { MODAL_PADDING, MODAL_WIDTH } from "@/lib/styleConst";
import InputWrapper from "@/Ui/Input/InputWrapper";
import { instance } from "@/lib/axios_settings";
import { DomenContext } from "@/app/(dashboard)/dashboard/[id]/dns/page";
import { CREATE_DNS_RECORD, UPDATE_DNS_RECORD } from '@/lib/api_endpoint'
import { useNotificationStore } from '@/store/notificationStrore'
import '../ResourceRecords.scss';

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

interface IFieldRecordType {
    type: recordType | undefined
}

interface IFieldBase {
    subdomain: string;
}

interface IDataFieldServer {
    [key: string]: string
}

interface IFieldA extends IFieldBase, IFieldRecordType {
    iPAddress: string;
    type: recordType.A;
};

interface IFieldAAAA extends IFieldBase, IFieldRecordType  {
    iPv6Address: string;
    type: recordType.AAAA;
};

interface IFieldCname extends IFieldBase, IFieldRecordType {
    canonicalName: string;
    type: recordType.CNAME;
};

interface IFieldTXT extends IFieldBase, IFieldRecordType {
    text: string;
    type: recordType.TXT;
}

interface IFieldMX extends IFieldBase, IFieldRecordType {
    priority: number;
    mailServer: string;
    type: recordType.MX;
}

interface IFieldNS extends IFieldBase, IFieldRecordType {
    dnsServer: string;
    priority: number;
    type: recordType.NS;
}

interface IFieldSRV extends IFieldRecordType {
    service: string;
    priority: number;
    weight: number;
    port: number;
    type: recordType.SRV;
}

interface IFieldCAA extends IFieldRecordType, IFieldBase {
    flag: string;
    tag: string;
    value: string;
    type: recordType.CAA;
}

type FieldType = IFieldA | IFieldAAAA | IFieldCname | IFieldTXT | IFieldMX | IFieldNS | IFieldSRV | IFieldCAA;

type fieldsByRecordType = {
    [recordType.A]: IFieldA,
    [recordType.AAAA]: IFieldAAAA,
    [recordType.CNAME]: IFieldCname,
    [recordType.TXT]: IFieldTXT,
    [recordType.MX]: IFieldMX,
    [recordType.NS]: IFieldNS,
    [recordType.SRV]: IFieldSRV,
    [recordType.CAA]: IFieldCAA,
}

type fieldsRecord<Type> = {
    [P in keyof Type]: {
        keyField: P,
        title: string;
        typeField: 'text' | [number, number] | Array<string> | 'number';
        rules?: Array<Rule>;
        defaultValue?: string | number;
        dataServer?: string;
    }
}

type FormField = Record<recordType, fieldsRecord<fieldsByRecordType[keyof fieldsByRecordType]>>

// Шаблон формы для каждой ресусной записи
const fieldsByRecord: FormField = {
    [recordType.A] : {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ],
            dataServer: 'name'
        },
        'iPAddress': {
            keyField: 'iPAddress',
            title: 'IP Address',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести ip address'},
                {pattern: /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, message: "Некоректный ip address"}
            ],
            dataServer: 'value'
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        } 
    }, 
    [recordType.AAAA]: {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ],
            dataServer: 'name'
        },
        'iPv6Address': {
            keyField: 'iPv6Address',
            title: 'IPv6Address',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести ipv6 address'}
            ],
            dataServer: 'value'
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.CNAME]: {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ],
            dataServer: 'name',
        },
        'canonicalName': {
            keyField: 'canonicalName',
            title: 'Canonical Name',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести canonical name'}
            ],
            dataServer: 'value',
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        }
    },
    [recordType.MX]: {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ],
            dataServer: 'name',
        },
        'mailServer': {
            keyField: 'mailServer',
            title: 'Mail server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести mail server'}
            ],
            dataServer: 'value',
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: [1, 21],
            defaultValue: 1,
            rules: [
                {required: true, message: 'Необходимо выбрать priority'}
            ],
            dataServer: 'priority',
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.NS]: {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ],
            dataServer: 'name',
        },
        'dnsServer': {
            keyField: 'dnsServer',
            title: 'Dns server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести dns server'}
            ],
            dataServer: 'value',
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести priority'}
            ],
            dataServer: 'priority',
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.TXT]: {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ],
            dataServer: 'name',
        },
        'text': {
            keyField: 'text',
            title: 'Text',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести text'}
            ],
            dataServer: 'value',
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.SRV]: {
        'service': {
            keyField: 'service',
            title: 'Service',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести service'}
            ],
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: 'number',
            rules: [
                {pattern: /\d+/, message: 'Priority должен быть числом'},
                {required: true, message: 'Необходимо ввести priority'},
                {min: 0, message: 'Priority не должно быть меньше 0'}
            ],
            defaultValue: 0,
        },
        'weight': {
            keyField: 'weight',
            title: 'Weight',
            typeField: 'number',
            rules: [
                {pattern: /\d+/, message: 'Weight должен быть числом'},
                {required: true, message: 'Необходимо ввести weight'},
                {min: 0, message: 'Weight не должно быть меньше 0'}
            ],
            defaultValue: 0,
        },
        'port': {
            keyField: 'port',
            title: 'Port',
            typeField: 'number',
            rules: [
                {pattern: /\d+/, message: 'Port должен быть числом'},
                {required: true, message: 'Необходимо ввести port'},
                {min: 0, message: 'Port не должно быть меньше 0'}
            ],
            defaultValue: 0,
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        }
    },
    [recordType.CAA]: {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'flag': {
            keyField: 'flag',
            title: 'Flag',
            typeField: ['0', '128'],
            rules: [
                {required: true, message: 'Необходимо выбрать flag'}
            ],
            defaultValue: '0'
        },
        'tag': {
            keyField: 'tag',
            title: 'Tag',
            typeField: ['issue', 'issuewild', 'iodef'],
            rules: [
                {required: true, message: 'Необходимо выбрать tag'}
            ],
            defaultValue: 'issue'
        },
        'value': {
            keyField: 'value',
            title: 'Value',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести value'}
            ]
        },
        'type': {
            keyField: 'type',
            title: '',
            typeField: 'text'
        } 
    },
};

export default function ModalRecord( {setIsOpen, type, idRecord, updateRecords, dataRecord}: IProps ) {
    const [recordT, setRecordT] = useState<recordType | undefined>(type);
    const [isLoad, setIsload] = useState<boolean>(false);
    const {domen, id} = useContext(DomenContext);
    const { pushNotification } = useNotificationStore()

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
            console.log(response);
            updateRecords();
            pushNotification({
                messeage: `Запись ${recordT} успешно ${typeof idRecord == 'undefined' ? 'добавлена' : 'изменина' }`,
                type: 'success'
            });
            setIsOpen(false);
        })
        .catch(e => {
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
                            // initialValue={typeof dataRecord != 'undefined' && dataRecord[field.dataServer] ? dataRecord[field.dataServer] : field.defaultValue}
                            initialValue={field.defaultValue}
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
                    <button className="btn" type="submit">
                        Сохранить
                    </button>
                </div>
            </Form>
        }
    </Modal>
}
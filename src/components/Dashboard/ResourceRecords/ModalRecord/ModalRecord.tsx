'use client'
import { recordType, IResourceRecords } from "@/types/domain"
import { MODAL_PADDING, MODAL_WIDTH } from "@/lib/styleConst";
import '../ResourceRecords.scss';

import { Modal, Form, Input, ConfigProvider } from "antd"
import type { FormProps } from "antd";
import { Rule } from 'antd/es/form';
import { useState, useEffect } from "react";
import InputWrapper from "@/Ui/Input/InputWrapper";

interface IProps {
    setIsOpen: (v: boolean) => void;
    updateRecords: () => void;
    type?: recordType;
    resource?: IResourceRecords;
}

interface IFieldRecordType {
    type: recordType | undefined
}

interface IFieldBase {
    subdomain: string;
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

type fieldsByRecord<Type> = {
    [P in keyof Type]: {
        name: string,
        title: string;
        typeField: 'text' | [number, number] | Array<string> | 'number';
        rules?: Array<Rule>;
        defaultValue?: string | number
    }
}

type FormField = Record<recordType, fieldsByRecord<fieldsByRecordType[keyof fieldsByRecordType]>>

const fieldsByRecord: FormField = {
    [recordType.A] : {
        'subdomain': {
            name: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'iPAddress': {
            name: 'iPAddress',
            title: 'IP Address',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести ip address'}
            ]
        },
        'type': {
            name: '',
            title: '',
            typeField: 'text'
        } 
    }, 
    [recordType.AAAA]: {
        'subdomain': {
            name: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'iPv6Address': {
            name: 'iPv6Address',
            title: 'IPv6Address',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести ipv6 address'}
            ]
        },
        'type': {
            name: '',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.CNAME]: {
        'subdomain': {
            name: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'canonicalName': {
            name: 'canonicalName',
            title: 'Canonical Name',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести canonical name'}
            ]
        },
        'type': {
            name: '',
            title: '',
            typeField: 'text'
        }
    },
    [recordType.MX]: {
        'subdomain': {
            name: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'mailServer': {
            name: 'mailServer',
            title: 'Mail server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести mail server'}
            ]
        },
        'priority': {
            name: 'priority',
            title: 'Priority',
            typeField: [0, 20],
            defaultValue: 0,
            rules: [
                {required: true, message: 'Необходимо выбрать priority'}
            ]
        },
        'type': {
            name: '',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.NS]: {
        'subdomain': {
            name: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'dnsServer': {
            name: 'dnsServer',
            title: 'Dns server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести dns server'}
            ]
        },
        'priority': {
            name: 'priority',
            title: 'Priority',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести priority'}
            ]
        },
        'type': {
            name: '',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.TXT]: {
        'subdomain': {
            name: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'text': {
            name: 'text',
            title: 'Text',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести text'}
            ]
        },
        'type': {
            name: '',
            title: '',
            typeField: 'text'
        } 
    },
    [recordType.SRV]: {
        'service': {
            name: 'service',
            title: 'Service',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести service'}
            ]
        },
        'priority': {
            name: 'priority',
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
            name: 'weight',
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
            name: 'port',
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
            name: '',
            title: '',
            typeField: 'text'
        }
    },
    [recordType.CAA]: {
        'subdomain': {
            name: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'}
            ]
        },
        'flag': {
            name: 'flag',
            title: 'Flag',
            typeField: ['0', '128'],
            rules: [
                {required: true, message: 'Необходимо выбрать flag'}
            ],
            defaultValue: '0'
        },
        'tag': {
            name: 'tag',
            title: 'Tag',
            typeField: ['issue', 'issuewild', 'iodef'],
            rules: [
                {required: true, message: 'Необходимо выбрать tag'}
            ],
            defaultValue: 'issue'
        },
        'value': {
            name: 'value',
            title: 'value',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести value'}
            ]
        },
        'type': {
            name: '',
            title: '',
            typeField: 'text'
        } 
    },
}

export default function ModalRecord( {setIsOpen, type, resource}: IProps ) {
    const [tRecord, setTRecord] = useState<recordType | undefined>(type);

    const renderChoosetRecord = () => {
        if(typeof tRecord !== 'undefined') return undefined

        return <div className="modal-record__choose-type">
            {
                Object.values(recordType).map(record => {
                    return (<div key={record} className="modal-record__choose-type-item--wrapper">
                            <input type="radio"  name="record-type" id={`record-${record}`} onChange={() => {setTRecord(record)}}  />
                            <label htmlFor={`record-${record}`} className="modal-record__choose-type-item">
                        <span className="modal-record__choose-type-item-text">{record}</span>
                    </label>
                </div>)
                })
            }
        </div>
    }

    const onFinish:FormProps<FieldType>['onFinish'] = (values) => {
        
    }

    useEffect(() => {
        if(typeof tRecord != 'undefined') {
            Object.entries(fieldsByRecord[tRecord]).map(item => {
                const [key, obj] = item;
            })
        }
    }, [tRecord]);

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
        {renderChoosetRecord()}
        {typeof tRecord !== 'undefined' &&
            <Form
                name="modal-record"
                onFinish={onFinish}
                validateTrigger="onSubmit"
            >
                <Form.Item<FieldType> 
                    name="type"
                    initialValue={tRecord}
                >
                    <Input />
                </Form.Item>
                {
                   Object.entries(fieldsByRecord[tRecord]).map(item => {
                    const [key, field] = item;
                    return <InputWrapper key={key} label={field.title} id={`modal-record-${field.name}`}>
                        <Form.Item<FieldType>
                            >
                                
                        </Form.Item>               
                    </InputWrapper>
                   })
                }
            </Form>
        }
    </Modal>
}
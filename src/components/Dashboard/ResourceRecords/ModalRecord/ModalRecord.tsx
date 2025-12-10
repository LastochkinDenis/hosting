'use client'
import { recordType, IResourceRecords } from "@/types/domain"
import { MODAL_PADDING, MODAL_WIDTH } from "@/lib/styleConst";
import '../ResourceRecords.scss';

import { Modal, Form, Input, Select } from "antd"
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

type fieldsRecord<Type> = {
    [P in keyof Type]: {
        keyField: P,
        title: string;
        typeField: 'text' | [number, number] | Array<string> | 'number';
        rules?: Array<Rule>;
        defaultValue?: string | number
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
            ]
        },
        'iPAddress': {
            keyField: 'iPAddress',
            title: 'IP Address',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести ip address'}
            ]
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
            ]
        },
        'iPv6Address': {
            keyField: 'iPv6Address',
            title: 'IPv6Address',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести ipv6 address'}
            ]
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
            ]
        },
        'canonicalName': {
            keyField: 'canonicalName',
            title: 'Canonical Name',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести canonical name'}
            ]
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
            ]
        },
        'mailServer': {
            keyField: 'mailServer',
            title: 'Mail server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести mail server'}
            ]
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: [1, 21],
            defaultValue: 1,
            rules: [
                {required: true, message: 'Необходимо выбрать priority'}
            ]
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
            ]
        },
        'dnsServer': {
            keyField: 'dnsServer',
            title: 'Dns server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести dns server'}
            ]
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести priority'}
            ]
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
            ]
        },
        'text': {
            keyField: 'text',
            title: 'Text',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести text'}
            ]
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
            ]
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

export default function ModalRecord( {setIsOpen, type, resource}: IProps ) {
    const [tRecord, setTRecord] = useState<recordType | undefined>(type);

    const renderChoosetRecord = () => {
        if(typeof tRecord !== 'undefined') return undefined;

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

                    if(key == 'type') {
                        return null;
                    }
                    return <InputWrapper key={key} label={field.title} labelId={`modal-record-${field.keyField}`}>
                        <Form.Item<FieldType>
                            name={field.keyField}
                            rules={field.rule}
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
            </Form>
        }
    </Modal>
}
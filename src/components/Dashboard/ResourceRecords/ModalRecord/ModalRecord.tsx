'use client'
import { recordType, IResourceRecords } from "@/types/domain"
import { MODAL_PADDING, MODAL_WIDTH } from "@/lib/styleConst";
import '../ResourceRecords.scss';

import { Modal, Form, Input, ConfigProvider } from "antd"
import type { FormProps } from "antd";
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
    iPAddress?: string;
    type: recordType.A;
};

interface IFieldAAAA extends IFieldBase, IFieldRecordType  {
    iPv6Address?: string;
    type: recordType.AAAA;
};

interface IFieldCname extends IFieldBase, IFieldRecordType {
    canonicalName?: string;
    type: recordType.CNAME;
};

interface IFieldTXT extends IFieldBase, IFieldRecordType {
    text?: string;
    type: recordType.TXT;
}

interface IFieldMX extends IFieldBase, IFieldRecordType {
    priority?: number;
    mailServer?: string;
    type: recordType.MX;
}

interface IFieldNS extends IFieldBase, IFieldRecordType {
    dnsServer?: string;
    priority?: number;
    type: recordType.NS;
}

type FieldType = IFieldA | IFieldAAAA | IFieldCname | IFieldTXT | IFieldMX | IFieldNS;

/*
    a {
        Subdomain, IP Address

        request {
            "record_type": "A",
            "name": "subdomain.kostr.ru",
            "value": "192.168.1.200",
            "ttl": 3600
        }
    },
    aaaa {
        Subdomain, IPv6 Address

        request {
            "record_type": "AAAA",
            "name": "kostr.ru",
            "value": "2001:0db8:85a3:0000:0000:8a2e:0370:7334",
            "ttl": 3600
        }
    },
    CNAME {
        Subdomain, Canonical name


        request {
            "record_type": "CNAME",
            "name": "mail.kostr.ru",
            "value": "kostr.ru",
            "ttl": 3600
        }
    },
    MX {
        Subdomain,
        Priority(Select)[0-20],
        Mail Server


        request {
            "record_type": "MX",
            "name": "kostr.ru",
            "value": "mail.kostr.ru",
            "ttl": 3600,
            "priority": 10
        }
    },
    NS {
        Subdomain,
        DNS Server,
        Priority(number)

        request {
            "record_type": "NS",
            "name": "subdomain.kostr.ru",
            "value": "ns1.example.com",
            "ttl": 3600
        }
    },
    TXT {
        Subdomain,
        Text

        request {
            "record_type": "TXT",
            "name": "kostr.ru",
            "value": "v=spf1 include:_spf.google.com ~all",
            "ttl": 3600
        }
    },
    SRV {
        Service,
        Priority(number) Weight(number) Port(number)
        Target
    }
    CAA {
        Subdomain
        Flag(Select)[0 128] Tag(Select)()[issue, issuewild, iodef]
        Value
    }

    уникалные mx, ns, srv, caa
    не уникльные a, aaaa, cname, txt
*/

const filedsByRecordType: Record<recordType, Record<string, {value: string, input: 'text' | [number, number] | Array<string>}>> = {
    [recordType.A] : {
        'subdomain': {
            value: 'subdomain',
            input: 'text'
        },
        'ip-address': {
            value: 'IPAddress',
            input: 'text',
        }
    }, 
    [recordType.AAAA]: {
        'subdomain': {
            value: 'subdomain',
            input: 'text'
        },
        'ipv6-address': {
            value: 'iPv6Address',
            input: 'text'
        }
    },
    [recordType.CNAME]: {
        'subdomain': {
            value: 'subdomain',
            input: 'text'
        },
        'canonical-name': {
            value: 'canonicalName',
            input: 'text'
        }
    },
    [recordType.MX]: {
        'subdomain': {
            value: 'subdomain',
            input: 'text'
        },
    },
    [recordType.NS]: {
        'subdomain': {
            value: 'subdomain',
            input: 'text'
        },
    },
    [recordType.TXT]: {
        'subdomain': {
            value: 'subdomain',
            input: 'text'
        },
    },
    [recordType.SRV]: {},
    [recordType.CAA]: {
        'subdomain': {
            value: 'subdomain',
            input: 'text'
        },
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
                    'subdomain' in filedsByRecordType[tRecord] &&
                    <InputWrapper label={filedsByRecordType[tRecord].subdomain.toString()} labelId="modal-record-subdomain">
                        <Form.Item<FieldType>
                            name="subdomain"
                            rules={[
                                {required: true, message: 'Необходимо ввести subdomain'}
                            ]}
                            >
                                <Input id="modal-record-subdomain" placeholder="Subdomain" type="text" />
                        </Form.Item>
                    </InputWrapper>
                }
                {   [recordType.A, recordType.AAAA, recordType.CNAME, recordType.TXT].some(item => tRecord) &&
                    <InputWrapper >
                    
                    </InputWrapper>
                }
            </Form>
        }
    </Modal>
}
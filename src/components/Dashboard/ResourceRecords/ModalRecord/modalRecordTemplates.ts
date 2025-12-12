import { recordType } from "@/types/domain";
import { FormField } from "./modalRecordType";


// Шаблон формы для каждой ресусной записи
export const fieldsByRecord: FormField = {
    [recordType.A] : {
        'subdomain': {
            keyField: 'subdomain',
            title: 'Subdomain',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
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
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
            ],
            dataServer: 'name'
        },
        'iPv6Address': {
            keyField: 'iPv6Address',
            title: 'IPv6Address',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести ipv6 address'},
                {pattern: /[0-9a-zA-Z]{4}:[0-9a-zA-Z]{4}:[0-9a-zA-Z]{4}:[0-9a-zA-Z]{4}:[0-9a-zA-Z]{4}:[0-9a-zA-Z]{4}:[0-9a-zA-Z]{4}:[0-9a-zA-Z]{4}/, message: 'Некоректный Ipv6 address'}
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
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
            ],
            dataServer: 'name',
        },
        'canonicalName': {
            keyField: 'canonicalName',
            title: 'Canonical Name',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести canonical name'},
                {max: 50, message: "Максимальный размере canonical name 50 символов"}
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
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
            ],
            dataServer: 'name',
        },
        'mailServer': {
            keyField: 'mailServer',
            title: 'Mail server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести mail server'},
                {max: 50, message: 'Максимальный размере mail server 50 символов'}
            ],
            dataServer: 'value',
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: [1, 21],
            defaultValue: 1,
            rules: [
                {required: true, message: 'Необходимо выбрать priority'},
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
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
            ],
            dataServer: 'name',
        },
        'dnsServer': {
            keyField: 'dnsServer',
            title: 'Dns server',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести dns server'},
                {max: 100, message: 'Максимальный размере dns server 100 символов'}
            ],
            dataServer: 'value',
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести priority'},
                {pattern: /\d|\d{2}/, message: 'Некоректный priority'}
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
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
            ],
            dataServer: 'name',
        },
        'text': {
            keyField: 'text',
            title: 'Text',
            typeField: 'text',
            rules: [
                {required: true, message: 'Необходимо ввести text'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
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
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
            ],
        },
        'priority': {
            keyField: 'priority',
            title: 'Priority',
            typeField: 'number',
            rules: [
                {required: true, message: 'Необходимо ввести priority'},
                {min: 0, message: 'Priority не должно быть меньше 0'},
                {pattern: /\d|\d{2}/, message: 'Некоректный priority'}
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
                {required: true, message: 'Необходимо ввести subdomain'},
                {pattern: /^\@$|^[^@][a-z]+$/, message: 'Некоректное имя subdomain'},
                {max: 50, message: "Максимальный размере subdomain 50 символов"}
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
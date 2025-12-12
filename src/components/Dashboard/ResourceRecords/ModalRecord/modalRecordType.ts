import { recordType } from "@/types/domain";

import type { Rule } from "antd/es/form";

export interface IFieldRecordType {
    type: recordType | undefined
}

export interface IFieldBase {
    subdomain: string;
}

export interface IDataFieldServer {
    [key: string]: string
}

export interface IFieldA extends IFieldBase, IFieldRecordType {
    iPAddress: string;
    type: recordType.A;
};

export interface IFieldAAAA extends IFieldBase, IFieldRecordType  {
    iPv6Address: string;
    type: recordType.AAAA;
};

export interface IFieldCname extends IFieldBase, IFieldRecordType {
    canonicalName: string;
    type: recordType.CNAME;
};

export interface IFieldTXT extends IFieldBase, IFieldRecordType {
    text: string;
    type: recordType.TXT;
}

export interface IFieldMX extends IFieldBase, IFieldRecordType {
    priority: number;
    mailServer: string;
    type: recordType.MX;
}

export interface IFieldNS extends IFieldBase, IFieldRecordType {
    dnsServer: string;
    priority: number;
    type: recordType.NS;
}

export interface IFieldSRV extends IFieldRecordType {
    service: string;
    priority: number;
    weight: number;
    port: number;
    type: recordType.SRV;
}

export interface IFieldCAA extends IFieldRecordType, IFieldBase {
    flag: string;
    tag: string;
    value: string;
    type: recordType.CAA;
}

export type FieldType = IFieldA | IFieldAAAA | IFieldCname | IFieldTXT | IFieldMX | IFieldNS | IFieldSRV | IFieldCAA;

export type fieldsByRecordType = {
    [recordType.A]: IFieldA,
    [recordType.AAAA]: IFieldAAAA,
    [recordType.CNAME]: IFieldCname,
    [recordType.TXT]: IFieldTXT,
    [recordType.MX]: IFieldMX,
    [recordType.NS]: IFieldNS,
    [recordType.SRV]: IFieldSRV,
    [recordType.CAA]: IFieldCAA,
}

export type fieldsRecord<Type> = {
    [P in keyof Type]: {
        keyField: P,
        title: string;
        typeField: 'text' | [number, number] | Array<string> | 'number';
        rules?: Array<Rule>;
        defaultValue?: string | number;
        dataServer?: string;
    }
}

export type FormField = Record<recordType, fieldsRecord<fieldsByRecordType[keyof fieldsByRecordType]>>
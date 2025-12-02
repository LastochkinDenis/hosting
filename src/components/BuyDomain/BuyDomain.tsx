import './BuyDomain.scss';
import { IDomenSearch } from "@/types/domain";
import InputWrapper from '@/Ui/Input/InputWrapper'

import { Modal, Form, Input, Select, DatePicker, Col, Row, ConfigProvider } from "antd";
import type { FormProps } from 'antd'
import { Rule } from 'antd/es/form';
import { useEffect } from 'react';

interface IProps {
    isOpen: boolean;
    domain: IDomenSearch | undefined
    callbackSetIsOpen: (v: boolean) => void
}

type FieldType = {
    registationPeriod: 1 | 2 | 3 | 5 | 10,
    ns1: string,
    ns2: string,
    fistName: string,
    lastName: string,
    secondName?: string
    email: string,
    phone: string,
    country: string,
    passporSerialNumber?: string,
    dateBirth?: Date,
    dateGetPassport?: Date,
    issuedByPassport?: string,
    index?: string,
    city?: string,
    region?: string,
    address?: string,
    recipeint?: string
}

const NS1_DEFAULT_VALUE = 'ns1.reg.ru'
const NS2_DEFAULT_VALUE = 'ns2.reg.ru'

export default function BuyDomain({ isOpen, domain, callbackSetIsOpen }: IProps) {

    useEffect(() => {
        if(typeof domain == 'undefined') {
            callbackSetIsOpen(false);
        }
    }, [domain])    

    //TODO Доделать валидацию телефлна и сдлеать на него маску

    const onSubmit:FormProps<FieldType>['onFinish'] = (values) => {
        console.log(values)
    }

    return <Modal
        open={isOpen}
        onCancel={() => callbackSetIsOpen(false)}
        closable={false}
        footer={null}
        width={'62.5rem'}
    >   
        <div className='buy-domain__top'>
            <p className='h4'>Регистрация домена</p>
            <button className='clouse' onClick={() => {
                    callbackSetIsOpen(false);
            }}>
                <span className="material-symbols-outlined">close</span>
            </button>
        </div>
        <div className='buy-domain'>
            <div className='buy-domain__register'>
                <span className="material-symbols-outlined buy-domain__register-icon">language</span>
                <div className="buy-domain__register-data">
                    <p className='buy-domain__register-data-title p3'>Регистрируется домен</p>
                    { typeof domain != undefined && <p className='buy-domain__register-data-dname h4'>{domain?.dname}</p>}
                </div>
            </div>
            <ConfigProvider theme={{
                components: {
                    Form: {
                        itemMarginBottom: 16
                    }}}}>
                <Form
                    name="domain_register"
                    onFinish={onSubmit}
                >
                    <InputWrapper label="Период регистрации (лет)" id="domain_register_registation_period">
                        <Form.Item<FieldType>
                            name="registationPeriod"
                            rules={[{required: true, message: 'Необходимо ввести период регистрации'}]}
                        >
                            <Select
                            placeholder="Период регистрации (лет)"
                            id="domain_register_registation_period"
                            style={{width: '100%'}}
                            options={[
                                {value: 1, label: '1 год'},
                                {value: 2, label: '2 года'},
                                {value: 3, label: '3 года'},
                                {value: 5, label: '5 лет'},
                                {value: 10, label: '10 лет'}
                            ]}
                            />
                        </Form.Item>
                    </InputWrapper>
                    <Row gutter={[16, 8]}>
                        <Col span={24} lg={12}>
                            <InputWrapper label="NS1 сервер" id="domain_register_ns1">
                                <Form.Item<FieldType>
                                    name="ns1"
                                    initialValue={NS1_DEFAULT_VALUE}
                                    rules={[{required: true, message: 'Необходимо ввести ns1'}]}
                                    >
                                        <Input type="text"  id="domain_register_ns1" placeholder="NS1 сервер" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} lg={12}>
                            <InputWrapper label="NS2 сервер" id="domain_register_ns2">
                                <Form.Item<FieldType>
                                    name="ns2"
                                    initialValue={NS2_DEFAULT_VALUE}
                                    rules={[{required: true, message: 'Необходимо ввести ns2'}]}
                                >
                                    <Input type="text" id="domain_register_ns2" placeholder="NS2 сервер" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                    </Row>
                    <div className="buy-domain-part">
                        <p className="buy-domain-part__title h5">
                            Данные владельца
                        </p>
                    </div>
                    <Row gutter={[16, 8]}>
                        <Col span={24} sm={12} lg={8}>
                            <InputWrapper label="Имя *" id="domain_register_first_name">
                                <Form.Item<FieldType>
                                    name="fistName"
                                    rules={[
                                        {required: true, message: "Небходимо ввести имя"}
                                    ]}
                                    >
                                        <Input type="text" id="domain_register_first_name" placeholder="Имя" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} sm={12} lg={8}>
                            <InputWrapper label="Фамилия *" id="domain_register_last_name">
                                <Form.Item<FieldType>
                                    name='lastName'
                                    rules={[
                                        {required: true, message: "Небходимо ввести фамилию"}
                                    ]}
                                    >
                                        <Input type="text" id="domain_register_last_name" placeholder="Фамилия" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} lg={8}>
                            <InputWrapper label="Отчество" id="domain_register_second_name">
                                <Form.Item<FieldType>
                                    name='secondName'
                                    >
                                        <Input type="text" id="domain_register_second_name" placeholder="Отчество" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                    </Row>
                    <Row gutter={[16, 8]}>
                        <Col span={24} lg={12}>
                            <InputWrapper label="Email *" id="domain_register_email">
                                <Form.Item<FieldType>
                                    name="email"
                                    rules={[{ required: true, message: 'Небходимо ввести email' },
                                        {type: 'email', message: 'Некоекртный email'}
                                    ]}
                                >
                                    <Input id="domain_register_email" type="email" placeholder="Email" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} lg={12}>
                            {/* TODO Сдлетаь маску */}
                            <InputWrapper label="Телефон *" id="domain_register_phone">
                                <Form.Item<FieldType>
                                    name="phone"
                                    rules={[
                                        { required: true, message: 'Небходимо ввести телефон' },
                                        { max: 15, message: 'Максимальный размер телефона 15' },
                                        { min: 11, message: 'Минимальный размер телефона 11' }
                                    ]}
                                    >
                                        <Input id="domain_register_phone" type="tel" placeholder="Телефон" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                    </Row>
                    <InputWrapper label="Страна" id="domain_register_country">
                        <Form.Item<FieldType>
                            name="country"
                            rules={[
                                { required: true, message: 'Небходимо выбрать страну' }
                            ]}
                            initialValue={'Россия'}
                        >
                            <Select
                            id="domain_register_country"
                            placeholder="Выберите страну"
                            style={{width: '100%'}}
                            options={[
                                {label: 'Россия', value: 'Россия'},
                                {label: 'Казастан', value: 'Казастан'}
                            ]}
                            />
                        </Form.Item>
                    </InputWrapper>
                    <div className="buy-domain-part">
                        <p className="buy-domain-part__title h5">
                            Паспортные данные (опционально)
                        </p>
                        <p className="buy-domain-part__subtitle p2">
                            Заполните для полного соответствия требованиям реестра.RU
                        </p>
                    </div>
                    <Row gutter={[16, 8]}>
                        <Col span={24} lg={12}>
                            {/* TODO Сдлетаь маску */}
                            <InputWrapper label="Серия и номер паспорта" id="domain_register_passpor_serial_number">
                                <Form.Item<FieldType>
                                    name="passporSerialNumber"
                                    >
                                        <Input type="text" placeholder="Серия и номер паспорта" id="domain_register_passpor_serial_number" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} lg={12}>
                            <InputWrapper label="Дата рождения" id="domain_register_date_birth">
                                <Form.Item<FieldType>
                                    name="dateBirth"
                                    >
                                        <DatePicker 
                                            id="domain_register_date_birth"
                                            style={{width: "100%"}}
                                        />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                    </Row>
                    <Row gutter={[16, 8]}>
                        <Col span={24} lg={12}>
                            <InputWrapper label="Дата рождения" id="domain_register_date_get_passport">
                                <Form.Item<FieldType>
                                    name="dateGetPassport"
                                    >
                                        <DatePicker 
                                            id="domain_register_date_get_passport"
                                            style={{width: "100%"}}
                                        />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} lg={12}>
                            <InputWrapper label="Кем выдан" id="domain_register_issued_by_passport">
                                <Form.Item<FieldType>
                                    name="issuedByPassport"
                                    >
                                        <Input type="text" placeholder="Кем выдан" id="domain_register_issued_by_passport" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                    </Row>
                    <div className="buy-domain-part">
                        <p className="buy-domain-part__title h5">
                            Почтовый адрес (опционально)
                        </p>
                    </div>
                    <Row gutter={[16, 8]}>
                        <Col span={24} sm={12} lg={8}>
                            <InputWrapper label="Индекс" id="domain_register_index">
                                <Form.Item<FieldType>
                                    name="index"
                                    >
                                    <Input type="text" id="domain_register_index" placeholder="Индекс" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} sm={12} lg={8}>
                            <InputWrapper label="Город" id="domain_register_city">
                                <Form.Item<FieldType>
                                    name="city"
                                    >
                                    <Input type="text" id="domain_register_city" placeholder="Город" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                        <Col span={24} lg={8}>
                            <InputWrapper label="Область" id="domain_register_region">
                                <Form.Item<FieldType>
                                    name="region"
                                    >
                                    <Input type="text" id="domain_register_region" placeholder="Область" />
                                </Form.Item>
                            </InputWrapper>
                        </Col>
                    </Row>
                    <InputWrapper label="Адрес" id="domain_register_address">
                        <Form.Item<FieldType> 
                            name="address"
                            >
                            <Input  type="text" id="domain_register_address" placeholder="Адрес" />
                        </Form.Item>
                    </InputWrapper>
                    <InputWrapper label="Получатель" id="domain_register_recipeint">
                        <Form.Item<FieldType>
                            name="recipeint"
                            >
                            <Input type="text" id="domain_register_recipeint" placeholder="Получатель"/>
                        </Form.Item>
                    </InputWrapper>
                    <div className="buy-domain__bottom">
                        <button className="btn border" type="button" onClick={() => {
                            callbackSetIsOpen(false);
                        }}>
                            Отменить
                        </button>
                        <button className="btn" type="submit">
                            Зарегистрировать домен
                        </button>
                    </div>
                </Form>
            </ConfigProvider>
        </div>
    </Modal>
}
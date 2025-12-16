'use client';
import { CHECK_DOMAIN, SUGGESTIONS_DOMAIN } from '@/lib/api_endpoint';
import './SearchDomain.scss';
import { instance } from '@/lib/axios_settings';
import { IDomainSearch } from '@/types/domain';
import DomainList from '../DomainList/DomainList';

import { Form, Input, ConfigProvider } from 'antd';
import type { FormProps } from 'antd/lib';
import React, { useState } from "react";

type FieldType = {
    domain: string
}

export default function Searchdomain() {
    const [dataDomains, setDataDomains] = useState<Array<IDomainSearch>>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);

    const onSubmit: FormProps<FieldType>['onFinish'] =  async (values) => {
            setIsLoad(true);

            const searchValue = values.domain.trim();
            const responseDomains:Array<IDomainSearch> = [];
            
            //Получение похожих доменов
            await instance.get(SUGGESTIONS_DOMAIN + `${searchValue}`, { params: { limit: 10 } })
            .then(response => {
                if(response.status != 200) throw Error();
                return response.data;
            })
            .then(data => {
                if(Array.isArray(data)) {
                    responseDomains.push(...data);
                } else {
                    responseDomains.push(data);
                }
            })
            .catch(e => {
                console.log(e);
            });
            
            //Получение запрашиваемого домена
            await instance.post(CHECK_DOMAIN, {
                domain_name: searchValue
            })
            .then(response => {
                if(response.status != 200) throw Error();
                return response.data;
            })
            .then(data => {
                // Добавляем заращиваемый домен если он не пришел вместе с первым запросом
                if(!responseDomains.some(domain => domain.dname == data?.dname && domain.available == data?.available)) {
                    responseDomains.unshift(data);
                }
            })
            .catch(e => {
                console.log(e);
            });

            setDataDomains(responseDomains);
            setIsLoad(false);
    }

    return <>
        <div className="search-domain">
            <h2 className="h3 search-domain__title">
                Найдите свой идеальный домен
            </h2>
            <ConfigProvider theme={{
                components: {
                    Form: {
                        itemMarginBottom: 0,
                        controlHeight: 45,
                    },
                    Input: {
                        controlHeight: 43,
                    }
                }
            }}>
                <Form
                    name="search-domain"
                    onFinish={onSubmit}
                    validateTrigger="onSubmit"
                >
                    <div className="search-domain__search">
                        <Form.Item<FieldType>
                            name="domain"
                            rules={[{
                                required: true, message: 'Поле не должно быть пустым'
                            }]}
                            style={{width: '100%', flexGrow: 1}}
                            >
                            <Input
                            placeholder='Введите желаемое имя домена'
                            prefix={<span className="material-symbols-outlined dashboard-header__search-icon">search</span>}
                            />
                        </Form.Item>
                        {
                            isLoad ? <button className='btn' disabled><span className="material-symbols-outlined load">progress_activity</span> <span className=''></span> Загрузка...</button> :
                            <button className="btn" type='submit' >Проверить</button>
                        }
                    </div>
                </Form>
            </ConfigProvider>
            <DomainList domainList={dataDomains} isLoad={isLoad} />
        </div>
    </>
}
'use client';
import { CHECK_DOMAIN, SUGGESTIONS_DOMAIN } from '@/lib/api_endpoint';
import './SearchDomen.scss';
import { instance } from '@/lib/axios_settings';
import BuyDomain from '@/components/BuyDomain/BuyDomain';
import { IDomenSearch } from '@/types/domain';
import { useNotificationStore } from '@/store/notificationStrore';

import { AutoComplete} from 'antd';
import { AutoCompleteProps, GetRef } from 'antd';
import React, { useState, useRef, JSX } from "react";

const debounce = <F extends (...args: Parameters<F>) => ReturnType<F>>(
  func: F,
  waitFor: number,
) => {
  let timeout: ReturnType<typeof setTimeout>

  const debounced = (...args: Parameters<F>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced
}

type seacrhItem = {value: string, label: JSX.Element}
type autoCompleteRefType = GetRef<typeof AutoComplete>;

export default function SearchDomen() {
    const [dataDomains, setDataDomains] = useState<Array<IDomenSearch>>([]);
    const [selectDomain, setSelectDomain] = useState<IDomenSearch>();
    const [searchValue, setSearchValue] = useState<string>('');
    const [error, setError] = useState<Array<string>>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const { pushNotification } = useNotificationStore();
    
    const renderSerchOption = (): AutoCompleteProps['options'] => {
        return dataDomains.reduce((result, item) => {
            result.push({
                value: item.dname,
                label: (<div className='domain-serch-item'>
                    <div className='domain-serch-item__data'>
                        { item.available ? <span className="available item-successful">Доступен</span> :
                        <span className="available item-error">Занят</span> }
                        <span className='domain-serch-item__dname h4'>{item.dname}</span>
                    </div>
                    {item.price && <span className='domain-serch-item__price h4'>{item.price.toLocaleString('ru-RU')} &#8381;</span>}
                </div>)
            })
            return result;
        }, [] as Array<seacrhItem>);
    }

    const onSearch = (searchText:string) => {
        const value = searchText.trim();
        
        setSearchValue(value);
        setError(prev => {
            if(value) {
                prev = prev.filter(item => item != 'AutoComplete');
            }

            return prev;
        })
    };

    const onSelect = (data:string) => {
        const domain = dataDomains.find(item => item.dname == data);

        
        if(domain === undefined) return
        
        if(!domain.available) {
            pushNotification({
                messeage: 'Домен занят',
                type: 'error'
            });
            
            return;
        }
        
        setSelectDomain(domain);
        setIsOpenModal(true);
    }

    const getDomains = async () => {
        if(searchValue) {
            setIsLoad(true);
    
            const responseDomains:Array<IDomenSearch> = [];
            
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
        } else {
            const errorList = [];

            if(!searchValue) {
                errorList.push('AutoComplete');
            }

            setError(errorList);
        }
    }

    return <>
        <div className="search-domen">
            <h2 className="h3 search-domen__title">
                Найдите свой идеальный домен
            </h2>
            <div className="search-domen__serch">
                <AutoComplete
                    style={{width: '100%', flexGrow: 1, height: '45px'}}
                    options={renderSerchOption()}
                    onSearch={onSearch}
                    onSelect={onSelect}
                    showSearch={true}
                    status={error.find(item => item == 'AutoComplete') ? 'error' : ''}
                    placeholder="Введите желаемое имя домена"
                    prefix={<span className="material-symbols-outlined dashboard-header__search-icon">search</span>}
                    onInputKeyDown={(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                        if(e.code == 'Enter') {
                            getDomains();
                        }
                    }}
                />
                {
                    isLoad ? <button className='btn' disabled><span className="material-symbols-outlined load">progress_activity</span> <span className=''></span> Загрузка...</button> :
                    <button className="btn" onClick={() => getDomains()}>Проверить</button>
                }
            </div>
        </div>
        <BuyDomain isOpen={isOpenModal} callbackSetIsOpen={() => setIsOpenModal(false)} domain={selectDomain} />
    </>
}
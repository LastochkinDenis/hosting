'use client';
import { CHECK_DOMAIN, SUGGESTIONS_DOMAIN } from '@/lib/api_endpoint';
import './SearchDomen.scss';
import { instance } from '@/lib/axios_settings';
import Tabs from '@/Ui/tabs/Tabs';
import { IDomenResponse } from '@/types/domain';

import { AutoComplete} from 'antd';
import type { AutoCompleteProps, GetRef } from 'antd';
import React, { useState, useRef, JSX } from "react";
import { useRouter } from 'next/navigation';

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

const TOP_LEVEL_DOMEN = [{key: '.ru', text: '.ru'}, {key: '.com', text: '.com'}, {key: '.org', text: '.org'}];

const DEFAULT_TOP_LEVEL_DOMEN = '.ru';

export default function SearchDomen() {
    const [optionSearch, setOptionSearch] = useState<AutoCompleteProps['options']>([]);
    const [topLevelDomain, setTopLevelDomain] = useState<string>(DEFAULT_TOP_LEVEL_DOMEN);
    const [searchValue, setSearchValue] = useState<string>('');
    const [error, setError] = useState<Array<string>>([]);
    const [isLoad, setIsLoad] = useState<boolean>(false);
    const [isShowDomainsList, setIsShowDomainsList] = useState<boolean>(false);
    const ref = useRef<autoCompleteRefType | null>(null);
    const router = useRouter();

    const renderSerchOption = (dataDomain: IDomenResponse): seacrhItem => {
        return {
            value: dataDomain.dname,
            label: (<div className='domain-serch-item'>
                <div className='domain-serch-item__data'>
                    { dataDomain.available ? <span className="available item-successful">Доступен</span> :
                    <span className="available item-error">Занят</span> }
                    <span className='domain-serch-item__dname h4'>{dataDomain.dname}</span>
                </div>
                {dataDomain.price && <span className='domain-serch-item__price h4'>{dataDomain.price.toLocaleString('ru-RU')} &#8381;</span>}
            </div>)
        }
    }

    const onSearch = debounce((searchText:string) => {
        const value = searchText.trim();
        const tld:string | undefined = TOP_LEVEL_DOMEN.find(item => value.endsWith(item.key))?.key;
        setSearchValue(value);
        setError(prev => {

            if(value) {
                prev = prev.filter(item => item != 'AutoComplete');
            }

            if(tld) {
                prev = prev.filter(item => item != 'Tabs');
            }

            return prev;
        })

        if(typeof tld == 'string') {
            setTopLevelDomain(tld);
        }
    }, 500);

    const onSelect = (data:string) => {
        router.push(`/dashboard/?dname=${data}`);
    }

    const onChangeTab = (key: string, isChecked: boolean) => {         
        setTopLevelDomain(key);

        setError(prev => {
            return prev.filter(item => item != 'Tabs')
        });
    }

    const getDomains = async () => {
        if(searchValue && topLevelDomain) {
            setIsLoad(true);
            const serchDomain:string = searchValue + (searchValue.endsWith(topLevelDomain) ? '' : topLevelDomain);
    
            const responseDomains:Array<IDomenResponse> = [];
            
            //Получение похожих доменов
            await instance.get(SUGGESTIONS_DOMAIN + `${serchDomain}`, { params: { limit: 10 } })
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
                domain_name: serchDomain
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

            setOptionSearch(
                responseDomains.reduce((result, item) => {
                    result.push(renderSerchOption(item));
                    return result;
                }, [] as Array<seacrhItem>)
            );

            setIsLoad(false);
            
            ref.current?.focus();            
        } else {
            const errorList = [];

            if(!searchValue) {
                errorList.push('AutoComplete');
            }
            if(!topLevelDomain) {
                errorList.push('Tabs');
            }

            setError(errorList);
        }
    }

    return <div className="search-domen">
        <h2 className="h3 search-domen__title">
            Найдите свой идеальный домен
        </h2>
        <div className="search-domen__serch">
            <AutoComplete
                style={{width: '100%', height: 'auto'}}
                options={optionSearch}
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
                open={isShowDomainsList}
                onFocus={() => {
                    setIsShowDomainsList(true);
                }}
                onBlur={() => {
                    setIsShowDomainsList(false);
                }}
                ref={ref}
            />
            {
                isLoad ? <button className='btn' disabled><span className="material-symbols-outlined load">progress_activity</span> <span className=''></span> Загрузка...</button> :
                <button className="btn" onClick={() => getDomains()}>Проверить</button>
            }
        </div>
        <Tabs type='radio' tabs={TOP_LEVEL_DOMEN} name='top-domen' currentValue={topLevelDomain} callBack={onChangeTab} className={error.find(item => item == 'Tabs') ? 'error' : ''} />
    </div>
}
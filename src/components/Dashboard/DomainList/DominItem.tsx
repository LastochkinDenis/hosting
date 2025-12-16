'use client';
import './DomainList.scss';
import { IDomainSearch } from "@/types/domain";
import BuyDomain from "@/components/BuyDomain/BuyDomain";
import { Skeleton, Flex } from 'antd';

import { useState } from 'react';

interface IProps {
    domain?: IDomainSearch
}

const PATTERN = /(\.[a-zа-я]{1,}){1,}/;

export default function DomainItem({ domain } : IProps ) {

    if(domain) {
        const [showModal, setShowModal] = useState<boolean>(false);
        const dname:string = domain.dname.replace(PATTERN, '');
        const topLevelDomain:RegExpMatchArray | null = domain.dname.match(PATTERN);
        
        return <>
                <div className="domain-item">
                    <div className='domain-item__data'>
                        { domain.available ? <span className="available item-successful">Доступен</span> :
                        <span className="available item-error">Занят</span> }
                        <span className='domain-item__domain'>
                            <span className='domain-item__dname h4'>{dname}</span>
                            { topLevelDomain != null && <span className='domain-item__top-level-domain h4'>{topLevelDomain[0].toString()}</span>}
                        </span>
                    </div>
                    {
                        (domain.price || domain.available) &&
                        <div className="domain-item__buy-data">
                            {domain.price && <span className='domain-item__price h4'>{domain.price.toLocaleString('ru-RU')} &#8381;</span>}
                            {
                                domain.available ? <button className="btn" onClick={() => setShowModal(true)}>
                                    Оформить
                                </button> : 
                                undefined
                            }
                        </div>
                    }
                </div>
            {showModal && <BuyDomain isOpen={showModal}  callbackSetIsOpen={(v) => setShowModal(v)} domain={domain} />}
        </>
    }

    return <div className="domain-item">
        <Flex gap='middle' align='center' style={{
            width: '100%'
        }}>
            <Skeleton.Button active={true} size={'large'} shape={'square'} block={false} />
            <Skeleton
            active={true}
            title={false}
            paragraph={{
                rows: 1,
                width: '100%'
            }} />
            <Skeleton.Button active={true} size={'large'} shape={'square'} block={false} />
            <Skeleton.Button active={true} size={'large'} shape={'square'} block={false} />
        </Flex>
    </div>
}
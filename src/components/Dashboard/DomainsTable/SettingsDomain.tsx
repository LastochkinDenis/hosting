'use client';
import './DomainsTable.scss';
import { POPOVER_STYLE } from '@/lib/styleConst';
import { Popover } from 'antd'
import { useState } from 'react';
import Link from 'next/link';



export default function SettingsDomain({id} : {id: number}) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return <div className="domains-table__settings">
        <Popover content={<ul className='popever'>
                <li className='popever__item'>
                    <Link href={`/dashboard/${id}/dns`}><span className="material-symbols-outlined text-xl">dns</span> 
                    DNS-записи</Link>
                </li>
                <li className='popever__item'>
                    <Link href={`/dashboard/${id}/dns`}><span className="material-symbols-outlined text-xl">dns</span> 
                    DNS-записи</Link>
                </li>
            </ul>}
            styles={POPOVER_STYLE}
            trigger='click'
            open={isOpen}
            onOpenChange={setIsOpen}>
            <button className='domains-table__settings-btn'>
            <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
        </Popover>
    </div>
}
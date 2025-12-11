'use client';
import './DomainsTable.scss';
import { Popover } from 'antd'
import { useState } from 'react';



export default function SettingsDomain({id} : {id: number}) {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return <div className="domains-table__settings">
        <Popover content={<ul className='domains-table__settings-navigation'>
                <li className='domains-table__settings-navigation-item'>
                    <a href={`/dashboard/${id}/dns`}><span className="material-symbols-outlined text-xl">dns</span> 
                    DNS-записи</a>
                </li>
            </ul>}
            styles={{
                root: {
                    overflow: 'hidden',
                    background: 'transparent',
                    borderRadius: '0.3125rem'
                },
                body: {
                    padding: '0',
                    overflow: 'hidden',
                    borderRadius: '0'
                }
            }}
            trigger='click'
            open={isOpen}
            onOpenChange={setIsOpen}>
            <button className='domains-table__settings-btn'>
            <span className="material-symbols-outlined text-xl">more_vert</span>
            </button>
        </Popover>
    </div>
}
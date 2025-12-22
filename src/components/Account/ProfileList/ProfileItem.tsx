'use client';
import './ProfilesList.scss';
import { IProfileFiz, IProfileUrl } from './Profile';
import { POPOVER_STYLE } from "@/lib/styleConst";
import { TypeUser } from "@/types/user";

import { Popover } from "antd";
import { useState } from 'react';

interface IProps {
    profile: IProfileFiz | IProfileUrl,
    typeUser: TypeUser
}

export default function ProfileItem({ profile, typeUser } : IProps) {
    const [isOpen, setIsOpen] = useState<Boolean>(false);

    const setDefaultProfile = () => {

    }

    const deleteProfile = () => {

    }

    return <>
        <div className='editor__item'>
            <div className="editor__item-data">
                <span>{typeUser == 'fizl' ? 'Проф. физ.л' : 'Проф. юр.л'}</span>
                <span>{profile.profile_name}</span>
            </div>
            <div className="editor__item-buttons">
                {
                    profile.is_default && 
                    <Popover
                        trigger='hover'
                        styles={{...POPOVER_STYLE}}
                        content={
                            <p className='p2'>{`Этот профиль по умолчению для ${typeUser == 'fizl' ?  'Физ.л' : 'юр.л'} `}</p>
                        }
                    >   
                        <Popover 
                            trigger={'click'}
                            styles={{...POPOVER_STYLE}}
                        >
                            <button className="editor__item-button">
                                <span className="material-symbols-outlined">person</span>
                            </button>
                        </Popover>
                    </Popover>
                }
                <button className="editor__item-button">
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <button className="editor__item-button">
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    </>
}
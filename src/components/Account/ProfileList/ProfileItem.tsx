'use client';
import './ProfilesList.scss';
import { IProfileFiz, IProfileUrl } from './Profile';
import { TypeUser, getTranslateTypeUser } from "@/types/user";
import { PROFILES_INDIVIDUAL_UPDATE, PROFILES_ORGANIZATION_UPDATE,
    PROFILES_INDIVIDUAL_DELETE, PROFILES_ORGANIZATION_DELETE } from '@/lib/api_endpoint';
import { instance } from '@/lib/axios_settings';
import { useNotificationStore } from '@/store/notificationStrore';
import ModalProfileEditor from './ModalProfileEditor/ModalProfileEditor';


import '@ant-design/v5-patch-for-react-19';
import { Popover, Popconfirm } from "antd";
import { useState } from 'react';

interface IProps {
    profile: IProfileFiz | IProfileUrl,
    typeUser: TypeUser,
    handleUpdate: () => void
}

export default function ProfileItem({ profile, typeUser, handleUpdate } : IProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [notificationOpen, setNotificationOpen] = useState<boolean>(false);
    const { pushNotification } = useNotificationStore();

    const setDefaultProfile = () => {

        const updateRequst = typeUser == 'fizl' ? instance.put(PROFILES_INDIVIDUAL_UPDATE(profile.id.toString()), {
            is_default: !profile.is_default
        }) : instance.put(PROFILES_ORGANIZATION_UPDATE(profile.id.toString()), {
            is_default: !profile.is_default
        });

        updateRequst
        .then(response => {
            return response.data;
        })
        .then(data => {
            handleUpdate();

            pushNotification({
                messeage: `Профиль ${profile.profile_name} был обновлен`,
                type: 'success'
            });
        })
        .catch(e => {
            console.log(e);
            pushNotification({
                messeage: `Произошла ошибка при обновление профиля ${profile.profile_name}`,
                type: 'error'
            });
        })
    }

    const handleDeleteProfile = () => {
        const deleteRequst =  typeUser == 'fizl' ? 
        instance.delete(PROFILES_INDIVIDUAL_DELETE(profile.id.toString())) :
        instance.delete(PROFILES_ORGANIZATION_DELETE(profile.id.toString()));

        deleteRequst
        .then(() => {
            handleUpdate();

            pushNotification({
                messeage: `Профиль ${profile.profile_name} был удален`,
                type: 'success'
            });
        })
        .catch(e => {
            console.log(e);
            pushNotification({
                messeage: `Произошла ошибка при удаление профиля ${profile.profile_name}`,
                type: 'error'
            });
        });
    }

    return <>
        <div className='editor__item'>
            <div className="editor__item-data">
                <span>Проф. {getTranslateTypeUser(typeUser)}</span>
                <span>{profile.profile_name}</span>
            </div>
            <div className="editor__item-buttons">
                {
                    profile.is_default && 
                    <Popover
                        trigger='hover'
                        onOpenChange={setNotificationOpen}
                        open={notificationOpen}
                        content={<p className='p3'>Это профиль по умолнию для {getTranslateTypeUser(typeUser)}</p>}
                    >   
                        <Popconfirm
                            placement='top'
                            title={'Убрать профиль по умолчанию'}    
                            onConfirm={setDefaultProfile}
                            okText='Да'
                            cancelText='Нет'
                            trigger={'click'}
                            onOpenChange={() => setNotificationOpen(false)}
                        >
                            <button className="editor__item-button activate">
                                <span className="material-symbols-outlined">person</span>
                            </button>
                        </Popconfirm>
                    </Popover>
                }
                {
                    !profile.is_default &&
                    <Popconfirm
                        placement='top'
                        title={`Установить профиль по умолчанию для ${typeUser == 'fizl' ? 'физ.л' : 'юр.л'}`}
                        onConfirm={setDefaultProfile}
                        okText='Да'
                        cancelText='Нет'
                    >
                        <button className="editor__item-button">
                            <span className="material-symbols-outlined">person</span>
                        </button>
                    </Popconfirm>
                }
                <button className="editor__item-button" onClick={() => setIsOpen(prev => !prev)}>
                    <span className="material-symbols-outlined">edit</span>
                </button>
                <Popconfirm
                    placement='top'
                    title={`Удалить запись ${profile.profile_name}?`}
                    onConfirm={handleDeleteProfile}
                    okText='Да'
                    cancelText='Нет'
                >
                    <button className="editor__item-button">
                        <span className="material-symbols-outlined">delete</span>
                    </button>
                </Popconfirm>
            </div>
        </div>
        {isOpen && <ModalProfileEditor modalOpen={isOpen} setModalOpen={(v: boolean) => {setIsOpen(v)}} handleUpdate={handleUpdate} profile={profile} typeUser={typeUser} />}
    </>
}
'use client';
import { instance } from "@/lib/axios_settings"
import { PROFILES_INDIVIDUAL, PROFILES_ORGANIZATION } from "@/lib/api_endpoint";
import { useNotificationStore } from "@/store/notificationStrore";
import ProfileItem from "./ProfileItem";
import { IProfile, IProfileFiz, IProfileUrl } from "./Profile";
import './ProfilesList.scss';
import ModalProfileEditor from '@/components/Account/ProfileList/ModalProfileEditor/ModalProfileEditor';

import { useState, useEffect } from "react";

export default function AccountList() {
    const [profiles, setPrefiels] = useState<Array<IProfile>>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { pushNotification } = useNotificationStore();

    useEffect(() => {
        const getData = async () => {
            const profilesRequst:Array<IProfile> = [];
    
            const requsProfilesFiz =  instance.get(PROFILES_INDIVIDUAL);
            const requstProfilesUrl =  instance.get(PROFILES_ORGANIZATION);
    
            Promise.all([requsProfilesFiz, requstProfilesUrl])
            .then(response => {
                response.forEach(itemResponse => {
                    if(!Array.isArray(itemResponse.data)) throw Error();

                    itemResponse.data.forEach(item => {
                        profilesRequst.push({
                            typeProfile: 'person_r_name' in item ? 'fizl' : 'uril',
                            profile_data: item
                        });
                    })
                })
            })
            .catch(e => {
                pushNotification({
                    'messeage': 'Вовремя загрузки профилей произошла ошибка',
                    'type': 'error'
                })
            });

            setPrefiels(profilesRequst);
        }

        getData();
    }, []);

    const handleUpdateProfileList = (profile: IProfileFiz | IProfileUrl, typeOperation: 'update' | 'delete' = 'update') => {
        const profilesRequst:Array<IProfile> = [];
    
        const requsProfilesFiz =  instance.get(PROFILES_INDIVIDUAL);
        const requstProfilesUrl =  instance.get(PROFILES_ORGANIZATION);

        Promise.all([requsProfilesFiz, requstProfilesUrl])
        .then(response => {
            response.forEach(itemResponse => {
                if(!Array.isArray(itemResponse.data)) throw Error();

                itemResponse.data.forEach(item => {
                    profilesRequst.push({
                        typeProfile: 'person_r_name' in item ? 'fizl' : 'uril',
                        profile_data: item
                    });
                })
            })
        })
        .catch(e => {
            pushNotification({
                'messeage': 'Вовремя загрузки профилей произошла ошибка',
                'type': 'error'
            })
        });

        setPrefiels(profilesRequst);
    }
    
    return <div className="profile-editor">
        <div className="profile-editor__header">
            <p className="title_block h2">
                Профили
            </p>
        </div>
        <div className="editor__list">
            <button className="editor__item-add-record editor__item" onClick={() => {setIsOpen(true)}}>
                <span className="material-symbols-outlined">add</span>
                <span className='editor__item-add-text'>Добавить профиль</span>
            </button>
            {
                profiles.map(profile => {
                    return <ProfileItem 
                    key={profile.profile_data.id} 
                    profile={profile.profile_data} 
                    typeUser={profile.typeProfile}
                    handleUpdate={handleUpdateProfileList}
                    />
                })
            }
        </div>
        {isOpen && <ModalProfileEditor modalOpen={isOpen} setModalOpen={(v: boolean) => setIsOpen(v) } handleUpdate={handleUpdateProfileList} />}
    </div>
}
'use client';
import { instance } from "@/lib/axios_settings"
import { PROFILES_INDIVIDUAL, PROFILES_ORGANIZATION } from "@/lib/api_endpoint";
import { useNotificationStore } from "@/store/notificationStrore";
import ProfileItem from "./ProfileItem";
import { IProfile, IProfileFiz, IProfileUrl } from "./Profile";
import './ProfilesList.scss';
import ModalProfileEditor from '@/components/Account/ProfileList/ModalProfileEditor/ModalProfileEditor';

import { useState, useEffect, createContext } from "react";

export const ProfileContext = createContext((profile:IProfile, type: 'update' | 'delete' = 'update') => {});

export default function AccountList() {
    const [profiles, setPrefiels] = useState<Array<IProfile>>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { pushNotification } = useNotificationStore();

    const handleUpdate = (profile:IProfile, type: 'update' | 'delete' = 'update') => {
        if(type == 'update') {
            setPrefiels(prev => {
                const updateIndex = prev.findIndex(item => item.profile_data.id == profile.profile_data.id);

                prev = prev.map(item => {
                    if(profile.typeProfile != item.typeProfile) return item;
                    if(profile.profile_data.id == item.profile_data.id) return item;

                    if(item.profile_data.is_default && profile.profile_data.is_default) {
                        item.profile_data.is_default = false;
                    }

                    return item;
                });

                if(updateIndex == -1) return [...prev, profile];

                prev[updateIndex] = profile;


                return prev;   
            });
        } else {
            setPrefiels(prev => prev.filter(item => item.profile_data.id != profile.profile_data.id));
        }
    }

    useEffect(() => {
        const getData = async () => {
            const profilesRequst:Array<IProfile> = [];
    
            const requsProfilesFiz =  instance.get(PROFILES_INDIVIDUAL);
            const requstProfilesUrl =  instance.get(PROFILES_ORGANIZATION);
            
            try {
                const response = await Promise.all([requsProfilesFiz, requstProfilesUrl]);
                response.forEach(responseItem => {
                    if(!Array.isArray(responseItem.data)) throw Error();
    
                    responseItem.data.forEach(item => {
                        profilesRequst.push({
                            typeProfile: 'person_r_name' in item ? 'fiz' : 'url',
                            profile_data: item
                        });
                    });
                });
            }
            catch (e) {
                console.log(e);
                pushNotification({
                    'messeage': 'Вовремя загрузки профилей произошла ошибка',
                    'type': 'error'
                })    
            }
    
            setPrefiels(profilesRequst);
        }

        getData();
    }, []);
    
    return <div className="profile-editor">
        <div className="profile-editor__header">
            <p className="title_block h2">
                Профили
            </p>
        </div>
        <ProfileContext value={handleUpdate}>
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
                        />
                    })
                }
            </div>
            {isOpen && <ModalProfileEditor modalOpen={isOpen} setModalOpen={(v: boolean) => setIsOpen(v) }/>}
        </ProfileContext>
    </div>
}
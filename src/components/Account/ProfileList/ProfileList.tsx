'use client';
import { instance } from "@/lib/axios_settings"
import { PROFILES_INDIVIDUAL, PROFILES_ORGANIZATION } from "@/lib/api_endpoint";
import { useNotificationStore } from "@/store/notificationStrore";
import ProfileItem from "./ProfileItem";
import { IProfile, IProfileFiz, IProfileUrl } from "./Profile";
import './ProfilesList.scss';

import { useState, useEffect } from "react";


export default function AccountList() {
    const [profiles, setPrefiels] = useState<Array<IProfile>>([]);
    const [isOpen, setIsOpen] = useState<Boolean>(false);
    const { pushNotification } = useNotificationStore();

    useEffect(() => {
        const getData = async () => {
            let profilesRequst:Array<IProfile> = [];
    
            const requsProfilesFiz =  instance.get(PROFILES_INDIVIDUAL);
            const requstProfilesUrl =  instance.get(PROFILES_ORGANIZATION);
    
            await Promise.all([requsProfilesFiz, requstProfilesUrl])
            .then(response => {
                response.forEach(itemResponse => {
                    if(!Array.isArray(itemResponse.data)) throw Error();

                    itemResponse.data.forEach(item => {
                        profilesRequst.push({
                            id: item.id,
                            user_id: item.user_id,
                            profile_name:  item.profile_name,
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
    
    return <div className="profile-editor">
        <div className="profile-editor__header">
            <p className="profile-editor__title h2">
                Профили
            </p>
        </div>
        <div className="editor__list">
            <button className="editor__item-add-record editor__item">
                <span className="material-symbols-outlined">add</span>
                <span className='editor__item-add-text'>Добавить запись</span>
            </button>
            {
                profiles.map(profile => {
                    return <ProfileItem key={profile.id} profile={profile.profile_data} typeUser={profile.typeProfile} />
                })
            }
        </div>
    </div>
}
'use client';
import { instance } from "@/lib/axios_settings";
import { PROFILES_INDIVIDUAL_UPDATE, PROFILES_ORGANIZATION_UPDATE } from "@/lib/api_endpoint";
import { IProfileFiz, IProfileUrl } from "../Profile";
import { TypeUser, getTranslateTypeUser } from "@/types/user";
import { MODAL_WIDTH, MODAL_PADDING } from "@/lib/styleConst";
import './ModalProfileEditor.scss';
import ProfileEditorIndividual from "./ProfileEditorIndividual";
import ProfileEditoroOganization from "./ProfileEditoroOganization";

import { Modal } from "antd";
import { useState } from 'react';

interface IProps {
    profile?: IProfileFiz | IProfileUrl;
    typeUser?: TypeUser;
    modalOpen: boolean;
    setModalOpen: (v: boolean) => void;
    handleUpdate: (profile: IProfileFiz | IProfileUrl, typeOperation?: 'update' | 'delete') => void;
}

export default function ModalProfileEditor({profile, typeUser, handleUpdate, modalOpen, setModalOpen} : IProps) {

    const [tUser, setTUser] = useState<TypeUser | undefined>(typeUser);

    //Выбор тип профиля 
    const printTUser = () => {
        const tUserList: Array<TypeUser> = ['fizl', 'uril'];

        return <div className="profile-editor">
            {
                tUserList.map((item, index) => 
                    <button key={index} className="profile-editor__type-user" onClick={() => setTUser(item)}>
                        {getTranslateTypeUser(item).toUpperCase()}
                    </button>
                )
            }
        </div>
    }

    return <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={MODAL_WIDTH}
        styles={{
            content: {
                padding: MODAL_PADDING
            }
        }}
    >
        { typeof tUser == 'undefined' && printTUser() }
        { tUser == 'fizl' && <div>
            <ProfileEditorIndividual profile={profile as IProfileFiz | undefined} handleUpdate={handleUpdate} />
        </div> }
        { tUser == 'uril' && <div>
            <ProfileEditoroOganization />
        </div> }
    </Modal>
}
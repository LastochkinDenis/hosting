'use client';
import { instance } from "@/lib/axios_settings";
import { PROFILES_INDIVIDUAL_UPDATE, PROFILES_ORGANIZATION_UPDATE } from "@/lib/api_endpoint";
import { IProfile, IProfileFiz, IProfileUrl } from "../Profile";
import { TypeUser, getTranslateTypeUser } from "@/types/user";
import { MODAL_WIDTH, MODAL_PADDING } from "@/lib/styleConst";
import './ModalProfileEditor.scss';
import ProfileEditorIndividual from "./ProfileEditorIndividual";
import ProfileEditoroOganization from "./ProfileEditoroOganization";
import { ProfileContext } from "../ProfileList";

import { Modal } from "antd";
import { useState, useContext } from 'react';

interface IProps {
    profile?: IProfileFiz | IProfileUrl;
    typeUser?: TypeUser;
    modalOpen: boolean;
    setModalOpen: (v: boolean) => void;
}

export default function ModalProfileEditor({profile, typeUser, modalOpen, setModalOpen} : IProps) {

    const [tUser, setTUser] = useState<TypeUser | undefined>(typeUser);

    //Выбор тип профиля 
    const printTUser = () => {
        const tUserList: Array<TypeUser> = ['fiz', 'url'];

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
        { tUser == 'fiz' && <div>
            <ProfileEditorIndividual profile={profile as IProfileFiz | undefined} handleClouseModal={() => setModalOpen(false)} />
        </div> }
        { tUser == 'url' && <div>
            <ProfileEditoroOganization profile={profile as IProfileUrl | undefined} handleClouseModal={() => setModalOpen(false)} />
        </div> }
    </Modal>
}
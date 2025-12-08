import type { record_type, IResourceRecords } from "@/types/domain"

import { Modal } from "antd"

interface IProps {
    type?: record_type
    resource?: IResourceRecords
}

export default function ModalRecord( {type, resource}: IProps ) {
    return <div></div>
}
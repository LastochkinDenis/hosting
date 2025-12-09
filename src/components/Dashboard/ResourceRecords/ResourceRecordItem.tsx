'use client';

import './ResourceRecords.scss';
import { IResourceRecords, recordType } from '@/types/domain';

import { memo } from 'react';

export default memo(function ResourceRecordItem({ resourceRecords } : { resourceRecords: IResourceRecords }) {

    const handleEdir = () => {

    }

    const handleDelete = () => {

    }

    return <div className='nss-editor__item'>
        <div className="nss-editor__item-value" onClick={handleEdir}>
            <span className='nss-editor__item-record-type'>{resourceRecords.record_type}</span>
            <span className='nss-editor__item-name'>{resourceRecords.name}</span>
            <span className="nss-editor__item-value">{resourceRecords.value}</span>
        </div>
        <div className="nss-editor__item-buttons">
            <button className='nss-editor__item-edit' onClick={handleEdir}>
                <span className="material-symbols-outlined">edit</span>
            </button>
            <button className='nss-ebitor__item-delete' onClick={handleDelete}>
                <span className="material-symbols-outlined">delete</span>
            </button>
        </div>
    </div>
});
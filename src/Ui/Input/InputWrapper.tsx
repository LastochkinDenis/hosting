import './Input.scss';
import Input from "./Input"
import InputPassword from "./InputPassword"
import React, { useRef, useEffect } from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // type: 'tel' | 'number' | 'text' | 'date' | 'email' | 'datetime' | 'datetime-local' | 'time' | 'password'
    labelId?: string
    label?: string
    error?: string
    description?: string
    children?: React.ReactNode
}

export default function InputWrapper({labelId, label, error, children, description, ...inputAttribute}: IProps): React.JSX.Element {
    const ref = useRef<HTMLDivElement | null>(null);

    return <div className="input-wrapper" ref={ref}>
        {label && <label htmlFor={labelId} className="input-span p1">{label}</label>}
        {/* {type == 'password'  && <InputPassword error={Boolean(error)} {...inputAttribute} />}
        {type != 'password' && <Input type={type} error={Boolean(error)} {...inputAttribute} />} */}
        { children }
        { description && <p className='input-description p3'>{description}</p> }
        {/* { error && <div className="input-error-message">{error}</div> } */}
    </div>
}
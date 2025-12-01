import './Input.scss';

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import React, { useState } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
}

export default function InputPassword({error, ...inputAttribute}: IProps): React.JSX.Element {

    const [showPassword, setShowPassword] = useState<boolean>(false);

    return <div className={`input-holder ${error ? "error" : ""}`}>
            <input className="input password"
                {...inputAttribute}
                type={showPassword ? 'text' : 'password'}
            />
            <button className="input__btn-show-password" onClick={() => setShowPassword(prev => !prev)} type='button'>
                {showPassword && <FaEye />}
                {!showPassword && <FaEyeSlash />}
            </button>
        </div>
}
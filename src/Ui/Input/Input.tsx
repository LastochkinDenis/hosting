import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: boolean
    type: 'tel' | 'number' | 'text' | 'date' | 'email' | 'datetime' | 'datetime-local' | 'time'
}

export default function Input({error, type, ...inputAttribute}: IProps): React.JSX.Element {
    return <div className={`input-holder ${error ? "error" : ""}`}>
            <input className="input"
                {...inputAttribute}
                type={type}
            />
        </div>
}
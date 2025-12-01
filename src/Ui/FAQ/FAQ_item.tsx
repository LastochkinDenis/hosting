'use client';
import { IProps } from '@/Ui/FAQ/FAQ'
import './FAQ.scss';

import { useState, useRef, useEffect, MouseEvent } from "react";

interface IPropsFAQItem extends IProps {
    icon?: React.ReactNode
}

export default function FAQ_item({ title, className = '', icon, children } : IPropsFAQItem) {
    const [isHide, setIsHide] = useState<boolean>(true);
    const ref = useRef<HTMLDivElement>(null);
    const hieght = useRef<number>(0);

    const onClick = (e: MouseEvent) => {

        if(ref.current) {
            ref.current.style.height = !isHide ? '0px' : hieght.current + 'px';
        }   

        setIsHide(prev => !prev);
    }

    useEffect(() => {
        if(ref.current && hieght.current == 0) {
            hieght.current = ref.current.offsetHeight;
            ref.current.style.height = '0px';
        }
    }, [ref, hieght])

    return <div className={`FAQ-item ${className} ${isHide ? '' : 'active' }`}>
        <div className="FAQ-item__header" onClick={onClick}>
            { title && <h3 className="FAQ-item__header-title">{title}</h3> }
            <button className="FAQ-item__header-btn">
                { icon && icon }
                { !icon && <span className="material-symbols-outlined">keyboard_arrow_down</span> }
            </button>
        </div>
        <div className='FAQ-item__content' ref={ref}>
            {children}
        </div>
    </div>
}
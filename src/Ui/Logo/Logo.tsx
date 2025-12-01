import './Logo.scss';

import Link from "next/link"

interface IProps {
    isLink?: boolean, 
    showText?: boolean
}

export default function Logo({isLink, showText}: IProps) {
    const textLoog = 'Shared Hosting';

    if(isLink) {
        return <Link href="/" className="logo">
            <div className="logo-icon">◆</div>
            
            { (textLoog && showText) && <span className="logo-text h4">Shared Hosting</span> }
        </Link>
    }

    return <div className="logo">
        <div className="logo-icon">◆</div>

        { (textLoog && showText) && <span className="logo-text h4">Shared Hosting</span> }
    </div>
}
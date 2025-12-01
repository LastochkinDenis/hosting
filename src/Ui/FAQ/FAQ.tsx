import './FAQ.scss';

export interface IProps {
    title: string,
    className?: string,
    children: React.ReactNode | Array<React.ReactNode>
}

export default function FAQ({ title, className = '', children } : IProps ) {
    return <div className={`FAQ ${className}`}>
        { title && <h2 className="title_block">{title}</h2> }
        <div className="FAQ__holder">
            { children }
        </div>
    </div>
}
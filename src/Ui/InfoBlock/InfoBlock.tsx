import './InfoBlock.scss';

interface IProps {
    image?: React.ReactNode;
    children: React.ReactNode | Array<React.ReactNode>;
    button?: React.ReactNode;
}

export default function InfoBlock({ image, children, button } : IProps) {

    const printImage = () => {
        if(image) {
            return <div className="info-block__image--wrapper">
                {image}
            </div>
        }
        return undefined
    }

    return <div className="info-block">
        { printImage() }

        <div className={`info-block__holder ${image ? 'image' : ''}`}>
            <div className="info-block__content">
                {children}
            </div>
            <button className="btn">
                <span className='one-line-text'>Открыть менеджер файлов</span>
                <span className='material-symbols-outlined'>open_in_new</span>
            </button>
        </div>
    </div>
}
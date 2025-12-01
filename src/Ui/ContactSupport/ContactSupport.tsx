import './ContactSupport.scss'

export default function ContactSupport() {
    return <div className="contact-support">
        <p className="contact-support__title h5">
            Не нашли ответ? Наша поддержка поможет.
        </p>
        <button className="btn">
            <span className="material-symbols-outlined">support_agent</span>
            Связаться с поддержкой
        </button>
    </div>
}
import './Tabs.scss';

interface IProps {
    type: 'radio' | 'checkbox';
    name: string;
    tabs: Array<{key: string, text: string}>;
    className?: string;
    callBack: (key: string, isChecked: boolean) => void;
}

interface IPropsRadio extends IProps {
    type: 'radio';
    currentValue: string;
}

interface IPropsCheckbox extends IProps {
    type: 'checkbox';
    currentValue: Array<string>;
}

export default function Tabs({type, name, tabs, currentValue,  className = '', callBack}: IPropsRadio | IPropsCheckbox) {

    return <div className={`tabs ${className}`}>
        {
            tabs.map((tab) => {
                return <div key={tab.key} className='tab'>
                    <input
                    id={tab.key + name}
                    type={type}
                    onChange={(e) => callBack(tab.key, e.target.checked) }
                    value={tab.key}
                    name={type == 'checkbox' ? tab.key : name }
                    checked={
                        Array.isArray(currentValue) ? currentValue.findIndex((item) => item == tab.key) != -1 : currentValue == tab.key
                    } 
                    hidden/>
                    <label htmlFor={tab.key + name} className="tab-content p2">
                        {tab.text}
                    </label>
                </div>
            })
        }
    </div>
}
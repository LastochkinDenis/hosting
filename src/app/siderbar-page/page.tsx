'use client';
import { useSearchParamsStore, getSerhParam } from "@/lib/hooks";

export default function Page() {
    const [value, setValue] = useSearchParamsStore<string>('value', getSerhParam(window.location.search, 'value'));

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setValue(value);
    }

    return <div>
        <input type="text" onChange={onChange} defaultValue={value ?? ''} />
    </div>
}
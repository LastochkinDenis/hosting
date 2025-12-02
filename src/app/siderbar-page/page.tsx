'use client';
import { useSearchParamsStore, getSerhParam } from "@/lib/hooks";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const [value, setValue] = useSearchParamsStore<string>('value');

    useEffect(() => {
        setValue(searchParams.get('value') ?? '');
    }, [searchParams]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        setValue(value);
    }

    return <div>
        <input type="text" onChange={onChange} defaultValue={value ?? ''} />
    </div>
}
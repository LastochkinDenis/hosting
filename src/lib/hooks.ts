import React, { useCallback, useEffect, useState, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
// export function useDebounce<T extends Function>(func: T, delay: number): T {
//   const [debouncedFunc, setDebouncedFunc] = useState<T>(func);
    
//   useEffect(() => {
//     const timeoutId = setTimeout(() => {
//       setDebouncedFunc(func);
//     }, delay);

//     return () => clearTimeout(timeoutId);
//   }, [func, delay]);

//   return debouncedFunc;
// }

export function getSerhParam(search: string, param: string): string {
    const searchParam = new URLSearchParams(search);

    return searchParam.get(param) ?? '';
}

export function setSearchParam(search: string, param: string, value: string) {
    const searchParam = new URLSearchParams(search);

    searchParam.set(param, value);

    return '?' + searchParam.toString();
}

export function useLatest<T>(current: T): React.RefObject<T> {
    const storeValue = useRef(current)

    useLayoutEffect(() => {
        storeValue.current = current
    }, []);

    return storeValue;
}

type UpdateFuction<T> = (prev: T | null) => T;

function isUpdateFuction<T>(obj: unknown): obj is UpdateFuction<T> {
    if(typeof obj === 'function') {
        return true;
    }
    return false;
}

export function useSearchParamsStore<T>(
    param: string,
    defaultValue: T,
    serializer?: StringConstructor): [T, (value: T | UpdateFuction<T>) => void]
export function useSearchParamsStore<T>(
    param: string,
    defaultValue?: T,
    serializer?: StringConstructor): [T | null, (value: T | UpdateFuction<T>) => void] {
        
    if(typeof serializer == 'undefined') {
        serializer = String;
    }

    const [data, setData] = useState<T | null>(typeof defaultValue != 'undefined' ? defaultValue : null);
    const lastestValue = useLatest(data);

    const onUpdate = useCallback((newValue: T | UpdateFuction<T>) => {

        let value: T;

        if(isUpdateFuction<T>(newValue)) {
            value = newValue(lastestValue.current);
        } else {
            value = newValue;
        }

        setData(value);

        history.pushState(null, '', window.location.pathname + setSearchParam(window.location.search, param, serializer(newValue)));
    }, [param, lastestValue]);
        
    return [data, onUpdate];
}
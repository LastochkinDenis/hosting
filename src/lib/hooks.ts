import { useCallback, useEffect, useState, useRef, useLayoutEffect } from "react";

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

export function useLatest<T>(current: T) {
    const storeValue = useRef(current)

    useLayoutEffect(() => {
        storeValue.current = current
    }, []);

    return storeValue.current;
}

export function useSearchParamsStore<T>(
    param: string,
    defaultValue?: T,
    serializer = String,
    deserializer: (v:string) => T = (v) => v as T ): [T | undefined, (value: T) => void] {

    const [data, setData] = useState<T | undefined>(() => {
        if(typeof defaultValue == 'undefined') {
            setSearchParam(window.location.search, param, serializer(defaultValue));
        }

        return defaultValue;
    });

    const onUpdate = useCallback((value: T) => {
        setData(value);
        history.pushState(null, '', window.location.pathname + setSearchParam(window.location.search, param, serializer(value)));
    }, [param, deserializer]);
        
    return [data, onUpdate];
}
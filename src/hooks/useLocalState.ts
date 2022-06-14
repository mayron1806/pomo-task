import { useCallback, useEffect, useState } from "react";

export const useLocalState = <T>(key_name: string, defaultValue: T) => {
    const [state, setState] = useState<T>(defaultValue);
    const getItem = useCallback(() => {
        const item = localStorage.getItem(key_name);
        if(item){
            return JSON.parse(item) as T
        }
        set(defaultValue);
        return defaultValue;
    }, [key_name, defaultValue]);
    useEffect(()=>{
        setState(getItem());
    }, [getItem])
    const set = (value: T) => {
        localStorage.setItem(key_name, JSON.stringify(value));
        setState(getItem());
    }
    return {state, setState: set }
}
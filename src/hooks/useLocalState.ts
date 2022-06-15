import { useCallback, useEffect, useState } from "react";

const getLocalStorageData = <T>(key_name: string): T | null => {
    const item = localStorage.getItem(key_name);
    if(item){
        return JSON.parse(item) as T;
    }
    return null;
};
export const useLocalState = <T>(key_name: string, defaultValue: T) => {
    const [state, setState] = useState<T>(defaultValue);
    const set = useCallback((value: T) => {
        localStorage.setItem(key_name, JSON.stringify(value));
        setState(value);
    }, [])
    useEffect(()=>{
        const data = getLocalStorageData<T>(key_name);
        if(data){
            setState(data);
        }else{
            // se data é igual a null vai difinir no localstorage o default value
            set(defaultValue);
            setState(defaultValue);
        }
    }, [])
    
    return {state, setState: set }
}
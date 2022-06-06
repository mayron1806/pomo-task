import { useEffect, useState } from "react";

export const useLocalState = <T>(key_name: string, initialValue: T) => {
    const [state, setState] = useState<T>(initialValue);
    const get = () => {
        const item = localStorage.getItem(key_name);
        if(item){
            setState(JSON.parse(item) as T);
        }
    }
    useEffect(()=>{
       get();
    }, [])
    const set = (value: T) => {
        localStorage.setItem(key_name, JSON.stringify(value));
        get();
    }
    return {state, set}
}
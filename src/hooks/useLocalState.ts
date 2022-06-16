import { useEffect, useState } from "react";

function getStorageValue<T>(key: string, defaultValue: T) {
    // getting stored value
    const saved = localStorage.getItem(key);
    
    let initial = undefined;
    if(saved) initial = JSON.parse(saved);
    console.log(key + ":" + initial);
    if(initial !== undefined) return initial;
    return defaultValue;
  }
export const useLocalState = <T>(key_name: string, defaultValue: T) => {
    const [state, setState] = useState<T>(() => {
        return getStorageValue(key_name, defaultValue);
    });
    
    useEffect(() => {
        localStorage.setItem(key_name, JSON.stringify(state));
    }, [key_name, state]);
    
    return {state, setState};
}
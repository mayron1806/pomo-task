import {useEffect, useReducer, useState} from "react";
import { getMinutes, getSeconds, addZeroLeft, convertToNumberFormat } from "../../utils/TimeFormat";
import * as C from "./style";
type props = {
    time: number,
    onChange: (value: number) => void,
    minSeconds?: number,
    maxSeconds?: number,
    minMinutes?: number,
    maxMinutes?: number,
}
const TimeInput = ({time, maxMinutes, maxSeconds, minMinutes, minSeconds, onChange}:props) => {
    const [minutes, setMinutes] = useState<string>(getMinutes(time).toString());
    const [seconds, setSeconds] = useState<string>(getSeconds(time).toString());
    useEffect(()=>{
        setMinutes(getMinutes(time).toString());
        setSeconds(getSeconds(time).toString());
    }, [time])

    const clamp = (value: string | number, min: number = 0, max: number = 59) => {
        const number = typeof(value) === "string" ? parseInt(value) : value;
        if(number < min) return addZeroLeft(min);
        if(number > max) return addZeroLeft(max);
        return addZeroLeft(number);
    }
    const updateMinutes = (value: string | number) => setMinutes(clamp(value, minMinutes, maxMinutes));
    const updateSeconds = (value: string | number) => setSeconds(clamp(value, minSeconds, maxSeconds));

    

    useEffect(()=>{
        onChange(convertToNumberFormat(minutes, seconds));
    }, [minutes, seconds])

    return(
        <C.Time>
            <C.Input 
                value={minutes}
                onChange={(e)=> updateMinutes(e.target.value)}
            />
            <span>:</span>
            <C.Input
                value={seconds}
                onChange={(e)=> updateSeconds(e.target.value)}
            />
        </C.Time>
    )
}
export default TimeInput;
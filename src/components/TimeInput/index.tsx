import {useEffect, useState} from "react";

import { getMinutes, getSeconds, addZeroLeft, convertToNumberFormat } from "../../utils/TimeFormat";

import * as C from "./style";

const clamp = (value: number, min: number = 0, max: number = 59) => {
    if(value < min) return addZeroLeft(min);
    if(value > max) return addZeroLeft(max);
    return addZeroLeft(value);
}

type props = {
    time: number,
    onChange: React.Dispatch<React.SetStateAction<number>>,
    minSeconds?: number,
    maxSeconds?: number,
    minMinutes?: number,
    maxMinutes?: number,
    id?: string
}
const TimeInput = ({time, maxMinutes, maxSeconds, minMinutes, minSeconds, onChange, id}:props) => {
    const [minutes, setMinutes] = useState<string>(getMinutes(time).toString());
    const [seconds, setSeconds] = useState<string>(getSeconds(time).toString());

    const updateMinutes = (value: number) => setMinutes(clamp(value, minMinutes, maxMinutes));
    const updateSeconds = (value: number) => setSeconds(clamp(value, minSeconds, maxSeconds));

    useEffect(() => {
        setMinutes(getMinutes(time).toString());
        setSeconds(getSeconds(time).toString());
    }, [time])
    // quando mudar algum valor dos inputs vai chamar a função onChange
    useEffect(()=>{
        onChange(convertToNumberFormat(minutes, seconds));
    }, [minutes, seconds])

    return(
        <C.Time id={id}>
            <C.Input 
                value={minutes}
                onChange={(e)=> updateMinutes(parseInt(e.target.value))}
            />
            <span>:</span>
            <C.Input
                value={seconds}
                onChange={(e)=> updateSeconds(parseInt(e.target.value))}
            />
        </C.Time>
    )
}
export default TimeInput;
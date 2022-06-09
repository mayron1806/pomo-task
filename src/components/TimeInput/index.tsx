import {useEffect, useReducer} from "react";
import { getMinutes, getSeconds, addZeroLeft, convertToNumberFormat } from "../../utils/TimeFormat";
import * as C from "./style";
type props = {
    time: number,
    onChange: (time: number) => void
    minSeconds?: number,
    maxSeconds?: number,
    minMinutes?: number,
    maxMinutes?: number,
}
type action ={
    min?: number | string,
    max?: number | string,
    current: number | string
}
const reducer = (state: string, {min = 0, max = 59, current}: action) : string => {
    // se for string converte para numero
    if(typeof(min) === "string") min = parseInt(min);
    if(typeof(max) === "string") max = parseInt(max);
    if(typeof(current) === "string") min = parseInt(current);

    if(current > max){
        return addZeroLeft(max.toString());
    }
    if(current < min){
        return addZeroLeft(min.toString());
    }
    return addZeroLeft(current.toString());
}
const TimeInput = ({time, maxMinutes, maxSeconds, minMinutes, minSeconds, onChange}:props) => {
    const [
        minutes, 
        dispatchMinutes
    ] = useReducer(reducer, addZeroLeft(getMinutes(time)));
    const [
        seconds, 
        dispatchSeconds
    ] = useReducer(reducer, addZeroLeft(getSeconds(time)));

    useEffect(()=>{
        onChange(convertToNumberFormat(`${minutes}:${seconds}`));
    }, [minutes, seconds])

    return(
        <C.Time>
            <C.Input 
                value={minutes}
                onChange={(e)=>{
                    dispatchMinutes({current:e.target.value, min: minMinutes, max: maxMinutes})
                }}
            />
            <span>:</span>
            <C.Input
                value={seconds}
                onChange={(e) => {
                    dispatchSeconds({current:e.target.value, min: minSeconds, max: maxSeconds})
                }}
            />
        </C.Time>
    )
}
export default TimeInput;
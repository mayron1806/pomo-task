import {useEffect, useState} from "react";

import { getMinutes, convertToNumberFormat } from "../../utils/TimeFormat";

import * as C from "./style";

type props = {
    reference: React.MutableRefObject<HTMLDivElement | null>,
    time: number,
    onChange: React.Dispatch<React.SetStateAction<number>>,
    id?: string
}
const TimeInput = ({time, onChange, reference, id} : props) => {
    const [minutes, setMinutes] = useState<number>(getMinutes(time));
    const updateMinutes = (value: string) =>{
        let min = parseInt(value);
        if(value === "") min = 0;
        setMinutes(min);
    };
    useEffect(() => {
        setMinutes(getMinutes(time));
    }, [time])
    // quando mudar algum valor dos inputs vai chamar a função onChange
    useEffect(()=>{
        onChange(convertToNumberFormat({minutes: minutes}));
    }, [minutes, onChange])

    return(
        <C.Time ref={reference} id={id}>
            <C.Input 
                value={minutes}
                onChange={(e)=> updateMinutes(e.target.value)}
            />
        </C.Time>
    )
}
export default TimeInput;
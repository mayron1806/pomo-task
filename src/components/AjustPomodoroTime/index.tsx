import { useState, FormEvent, useRef, useEffect, useContext } from "react";
import {GoMute, GoUnmute} from "react-icons/go";

import Label from "../Label";
import SendButton from "../SendButton";
import TimeInput from "../TimeInput";
import ErrorMessage, { ErrorType } from "../ErrorMessage";

import { PomodoroContext } from "../Pomodoro";

import * as C from "./style";

import { getMinutes } from "../../utils/TimeFormat";
import { get } from "https";

// min times value
const WORK_TIME = {
    min: 10
}
const BREAK_TIME = {
    min: 1
}
type Error = {
    message: string,
    type?: ErrorType
}
type props = {
    close: () => void
}

const AjustPomodoroTime = ({ close }: props) => {
    const pomodoro = useContext(PomodoroContext);

    const [settingsWorkTime, setSettingsWorkTime] = useState<number>(pomodoro.workTime.value);
    const [settingsBreakTime, setSettingsBreakTime] = useState<number>(pomodoro.breakTime.value);
    const [settingsCanPlayAudio, setSettingsCanPlayAudio] = useState<boolean>(pomodoro.canPlayAudio.value);

    const workTimeInputRef = useRef<HTMLDivElement | null>(null);
    const breakTimeInputRef = useRef<HTMLDivElement | null>(null);

    const [error, setError] = useState<Error>({type: ErrorType.ERROR, message: ""});

    const saveTimes = (e: FormEvent) => {
        e.preventDefault();
        // valida os dados  
        if(getMinutes(settingsWorkTime) < WORK_TIME.min){
            const message = `O tempo de trabalho precisa ser de no minimo ${WORK_TIME.min} minutos`;
            setError({type: ErrorType.ERROR, message: message});
            workTimeInputRef.current?.classList.add("error");
            return;
        }
        if(getMinutes(settingsBreakTime) < BREAK_TIME.min){
            const message = `O tempo de descanso precisa ser de no minimo ${BREAK_TIME.min} minutos`;
            setError({type: ErrorType.ERROR, message: message});
            breakTimeInputRef.current?.classList.add("error");
            return;
        }
        pomodoro.workTime.setValue(settingsWorkTime);
        pomodoro.breakTime.setValue(settingsBreakTime);
        pomodoro.canPlayAudio.setValue(settingsCanPlayAudio);
        close();
    }
    // remove a classe erro ao mudar o input, e limpa a mensagem de erro
    useEffect(()=>{
        if(settingsWorkTime > WORK_TIME.min){
            workTimeInputRef?.current?.classList.remove("error");
            setError({type: undefined, message: ""});
        }
        if(settingsBreakTime > BREAK_TIME.min){
            breakTimeInputRef?.current?.classList.remove("error");
            setError({type: undefined, message: ""});
        }
        // se o tempo de descanso for maior que a metade do tempo de trabalho
        if(getMinutes(settingsBreakTime) * 2 > getMinutes(settingsWorkTime)){
            const message = `É recomendado que o tempo de descanso tenha no maximo metado do tempo de trabalho.`
            setError({type: ErrorType.WARNING, message: message});
            breakTimeInputRef.current?.classList.add("warning");
            return;
        }
        if(getMinutes(settingsBreakTime) * 2 < getMinutes(settingsWorkTime)){
            setError({type: undefined, message: ""});
            breakTimeInputRef.current?.classList.remove("warning");
            return;
        }
    }, [settingsWorkTime, settingsBreakTime])

    return(
        <C.Form onSubmit={(e)=> saveTimes(e)}>
            <C.TimeBlock>
                <Label htmlFor="work">Tempo de trabalho:(min)</Label>
                <TimeInput 
                    reference={workTimeInputRef}
                    id="work" 
                    onChange={setSettingsWorkTime} 
                    time={pomodoro.workTime.value} 
                />
            </C.TimeBlock>
            <C.TimeBlock>
                <Label htmlFor="break">Tempo de descanso:(min)</Label>
                <TimeInput 
                    reference={breakTimeInputRef}
                    id="break"
                    onChange={setSettingsBreakTime} 
                    time={pomodoro.breakTime.value} 
                />
            </C.TimeBlock>
            <C.TimeBlock>
                <Label htmlFor="break">Ativar som:</Label>
                <C.Audio onClick={() => setSettingsCanPlayAudio(!settingsCanPlayAudio)}>
                    {
                        settingsCanPlayAudio &&
                            <GoUnmute className="icon" size={25}/>
                        ||  
                            <GoMute className="icon" size={25}/>
                    }
                </C.Audio>
            </C.TimeBlock>
            {
                error.type !== undefined &&
                <ErrorMessage type={error.type}>{error.message}</ErrorMessage>
            }
            
            <SendButton value="Salvar"/>
        </C.Form>
    )
}
export default AjustPomodoroTime;
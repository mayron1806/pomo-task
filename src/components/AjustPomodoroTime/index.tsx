import { useState, FormEvent, useRef, useEffect, useContext } from "react";
import {GoMute, GoUnmute} from "react-icons/go";

import Label from "../Label";
import SendButton from "../SendButton";
import TimeInput from "../TimeInput";
import ErrorMessage from "../ErrorMessage";

import { PomodoroContext } from "../Pomodoro";

import * as C from "./style";

import { getMinutes } from "../../utils/TimeFormat";

// min times value
const WORK_TIME = {
    min: 10
}
const BREAK_TIME = {
    min: 1
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

    const [errorMessage, setErrorMessage] = useState<string>("");

    const saveTimes = (e: FormEvent) => {
        e.preventDefault();
        // valida os dados  
        if(getMinutes(settingsWorkTime) < WORK_TIME.min){
            setErrorMessage(`O tempo de trabalho precisa ser de no minimo ${WORK_TIME.min} minutos`);
            workTimeInputRef.current?.classList.add("error");
            return;
        }
        if(getMinutes(settingsBreakTime) < BREAK_TIME.min){
            setErrorMessage(`O tempo de descanso precisa ser de no minimo ${BREAK_TIME.min} minutos`);
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
            setErrorMessage("");
        }
        if(settingsBreakTime > BREAK_TIME.min){
            breakTimeInputRef?.current?.classList.remove("error");
            setErrorMessage("");
        }
    }, [settingsWorkTime, settingsBreakTime])

    return(
        <form onSubmit={(e)=> saveTimes(e)}>
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
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SendButton value="Salvar"/>
        </form>
    )
}
export default AjustPomodoroTime;
import { useState, useEffect } from "react";
import Button from "../Button";
import * as C from "./style";
enum TimeState{
    WORK,
    BREAK
}
type props = {
    workTime: number,
    breakTime:number 
}
const Timer = ({ workTime, breakTime }: props) => {
    const [currentTime, setCurrentTime] = useState<number>(workTime);
    const [timeState, setTimeState] = useState<TimeState>(TimeState.WORK);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    // timer
    useEffect(() => {
        let interval: ReturnType<typeof setTimeout>;
        if(isRunning){
            interval = setTimeout(() => {
                setCurrentTime(time => time - 1);
            }, 1000);
        }
        return () => clearInterval(interval); 
    }, [currentTime, isRunning])

    // actions
    const pause = () =>  setIsRunning(false);
    const resume = () => setIsRunning(true);

    const changeTime = () => {
        if(timeState === TimeState.BREAK){
            setCurrentTime(workTime);
            setTimeState(TimeState.WORK);
        }else{
            setCurrentTime(breakTime); 
            setTimeState(TimeState.BREAK);
        }
        setIsRunning(false);
    }

    // transforma o "currentTime" em minutos e segundos, depois formata eles para terem 2 casas decimais
    const minutes = ("00" + Math.floor(currentTime / 60)).slice(-2);
    const seconds = ("00" + Math.floor(currentTime % 60)).slice(-2);

    return(
        <C.Container>
            <C.Time>{minutes + ":" + seconds}</C.Time>
            <C.Title>{timeState === TimeState.WORK ? "Hora de trabalhar" : "Merecido descanso"}</C.Title>
            <C.ButtonsContainer>
                {
                    isRunning &&
                    <Button action={pause} text="Pausar" filled={true} />
                    ||
                    <Button action={resume} text="Iniciar" filled={true} />
                }
                <Button 
                    action={changeTime} 
                    text={timeState === TimeState.WORK ? "Descansar" : "Trabalhar"} 
                />
            </C.ButtonsContainer>
        </C.Container>
    )
}
export default Timer;
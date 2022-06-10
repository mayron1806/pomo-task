import { useState, useEffect, useContext } from "react";
import { convertToMinutesFormat, getMinutes, getSeconds } from "../../utils/TimeFormat";
import Button from "../Button";
import * as C from "./style";
import wave from "../../assets/wave.svg";
import wave2 from "../../assets/wave2.svg";
import wave3 from "../../assets/wave3.svg";
import { TimesContext } from "../Pomodoro/intex";

enum TimeState {
    WORK,
    BREAK
}
const Timer = () => {
    const times = useContext(TimesContext);
    const [currentTime, setCurrentTime] = useState<number>(times.workTime.value);
    const [timeState, setTimeState] = useState<TimeState>(TimeState.WORK);
    const [isRunning, setIsRunning] = useState<boolean>(false);

    // timer
    useEffect(() => {
        let interval: ReturnType<typeof setTimeout>;
        if (isRunning) {
            if (timeState === TimeState.WORK) {
                document.title = `Trabalho: ${convertToMinutesFormat(currentTime)}`;
            }
            if (timeState === TimeState.BREAK) {
                document.title = `Descanso: ${convertToMinutesFormat(currentTime)}`;
            }

            interval = setTimeout(() => {
                setCurrentTime(time => time - 1);
            }, 1000);
        }
        else {
            document.title = `POMOTASK`;
        }
        return () => clearInterval(interval);
    }, [currentTime, isRunning, timeState])

    // reset timer
    useEffect(() => {
        setIsRunning(false);
        if (timeState === TimeState.WORK) setCurrentTime(times?.workTime.value);
        else setCurrentTime(times?.breakTime.value);
    }, [times, timeState])

    // actions
    const pause = () => setIsRunning(false);
    const resume = () => setIsRunning(true);

    // muda para tempo de trabalho ou descanso
    const changeTime = () => {
        if (timeState === TimeState.BREAK) {
            setCurrentTime(times?.workTime.value);
            setTimeState(TimeState.WORK);
        } else {
            setCurrentTime(times?.breakTime.value);
            setTimeState(TimeState.BREAK);
        }
        setIsRunning(false);
    }

    return (
        <C.Container>
            <C.Timer>
                <C.Time>{getMinutes(currentTime) + ":" + getSeconds(currentTime)}</C.Time>
                <C.WaveContainer animate={isRunning}>
                    <C.Wave className="wave" src={wave2} duration={2} direction="reverse"/>
                    <C.Wave className="wave" src={wave} duration={1}/>
                    <C.Wave className="wave" src={wave3} duration={2}/>
                </C.WaveContainer>
            </C.Timer>
            <C.Title>
                {
                (timeState === TimeState.WORK) && 
                    "Hora de trabalhar" 
                || 
                    "Merecido descanso"
                }
            </C.Title>
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
import { useState, useEffect, useContext, memo } from "react";
import { useTimer } from "react-timer-hook";

import Button from "../Button";
import { TimesContext } from "../Pomodoro";

import * as C from "./style";

import { getRandomItem } from "../../utils/Random";
import { addZeroLeft, convertToNumberFormat } from "../../utils/TimeFormat";

import { canNotify } from "../../utils/Notification";
import notificationMessages from "../../services/NotificationMessages.json";
import work_icon from "../../assets/notification/go-work.svg";
import break_icon from "../../assets/notification/stop-work.svg";

import wave from "../../assets/waves/wave.svg";
import wave2 from "../../assets/waves/wave2.svg";
import wave3 from "../../assets/waves/wave3.svg";

const newTimeToTimer = (time: number) => {
    const new_time = new Date();
    new_time.setSeconds(new_time.getSeconds() + time);
    return new_time;
}
const sendTimerNotification = (is_working : boolean) => {
    if(canNotify()){
        let title: string = "";
        const options: NotificationOptions = {};
        if (is_working){
            title = "Hora de descansar";
            options.body = getRandomItem(notificationMessages["stop-work"]);
            options.icon = break_icon;
        } else {
            title = "Hora de trabalhar";
            options.body = getRandomItem(notificationMessages["go-to-work"]);
            options.icon = work_icon;
        }
        new Notification(title, options);
    }
}
// procentagem do tempo decorrido 
type PercentTimeProps = { max_time: number, current_time: number }
const percentTimeElapsed = ({max_time, current_time}: PercentTimeProps)=> current_time * 100 / max_time;

const Timer = memo(() => {
    // timer
    const times = useContext(TimesContext);
    const [isWorking, setIsWorking] = useState<boolean>(true);
    const {
        pause,
        restart,
        resume,
        minutes,
        seconds,
        isRunning
    } = useTimer({
        expiryTimestamp: newTimeToTimer(times.workTime.value),
        autoStart: false,
        onExpire: () => sendTimerNotification(isWorking)
    });

    // reset timer
    useEffect(() => {
        if (isWorking) restart(newTimeToTimer(times.workTime.value), false);
        if(!isWorking) restart(newTimeToTimer(times.breakTime.value), false);
    }, [times, isWorking])
    
    // muda para tempo de trabalho ou descanso
    const changeTime = () => {
        if (!isWorking) {
            setIsWorking(true);
            restart(newTimeToTimer(times.workTime.value), false);
        } 
        if (isWorking) {
            setIsWorking(false);
            restart(newTimeToTimer(times.breakTime.value), false);
        }
    }
    return (
        <C.Container>
            <C.Timer>
                <C.Time>{addZeroLeft(minutes) + ":" + addZeroLeft(seconds)}</C.Time>
                <Waves 
                    animateWaves={isRunning} 
                    percentComplete={percentTimeElapsed({
                        max_time: isWorking ? times.workTime.value : times.breakTime.value,
                        current_time: convertToNumberFormat(minutes, seconds)
                    })}
                />
            </C.Timer>
            <C.Title>
                { isWorking ? "Hora de trabalhar" : "Merecido descanso" }
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
                    text={isWorking ? "Descansar" : "Trabalhar"}
                />
            </C.ButtonsContainer>
        </C.Container>
    )
})
type waveProps = {
    animateWaves: boolean,
    percentComplete: number
}
const Waves = ({animateWaves, percentComplete}: waveProps) => {
    return(
        <C.WaveContainer animate={animateWaves} percentComplete={percentComplete}>
            <C.Wave className="wave" src={wave2} duration={2} direction="reverse"/>
            <C.Wave className="wave" src={wave} duration={1}/>
            <C.Wave className="wave" src={wave3} duration={2}/>
        </C.WaveContainer>
    )
}   
export default Timer;
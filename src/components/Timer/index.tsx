import { useState, useEffect, useContext, memo } from "react";
import { useTimer } from "react-timer-hook";

import Button from "../Button";
import { PomodoroContext } from "../Pomodoro";

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

import { playAudioInLoop } from "../../utils/Audio";

import alarm from "../../assets/sounds/alarm.wav";

const newTimeToTimer = (time: number) => {
    const new_time = new Date();
    new_time.setSeconds(new_time.getSeconds() + time);
    return new_time;
}
const sendTimerNotification = (is_working : boolean) => {
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
    return new Notification(title, options);
}

// procentagem do tempo decorrido 
type PercentTimeProps = { max_time: number, current_time: number }
const percentTimeElapsed = ({max_time, current_time}: PercentTimeProps)=> current_time * 100 / max_time;

//component
const Timer = memo(() => {
    // timer
    const pomodoro = useContext(PomodoroContext);
    const [isWorking, setIsWorking] = useState<boolean>(true);
    const {
        pause,
        restart,
        resume,
        minutes,
        seconds,
        isRunning
    } = useTimer({
        expiryTimestamp: newTimeToTimer(pomodoro.workTime.value),
        autoStart: false,
        onExpire: () => {
            expire();
            changeTime();
        }
    });
    const expire = () => {
        // notificação 
        // se pode notificar vai enviar a notificação e atribuir a variavel
        let notification = canNotify() && sendTimerNotification(isWorking);
        
        // audio
        if(!pomodoro.canPlayAudio.value) return;
        const audio = playAudioInLoop(alarm);
        if(notification){
            notification.onclose = () => {audio.pause()};
            notification.onclick = () => {audio.pause()};
        }
        if(document.hidden){
            document.addEventListener("visibilitychange", () => {
                if(document.visibilityState === "visible"){
                    audio.pause();
                }
            })
        }else{
            audio.pause();
        }
    }

    // reset timer
    useEffect(() => {
        if (isWorking) restart(newTimeToTimer(pomodoro.workTime.value), false);
        if(!isWorking) restart(newTimeToTimer(pomodoro.breakTime.value), false);
    }, [pomodoro, isWorking])
    
    // muda para tempo de trabalho ou descanso
    const changeTime = () => {
        if (!isWorking) {
            setIsWorking(true);
            restart(newTimeToTimer(pomodoro.workTime.value), false);
        } 
        if (isWorking) {
            setIsWorking(false);
            restart(newTimeToTimer(pomodoro.breakTime.value), false);
        }
    }
    return (
        <C.Container>
            <C.Timer>
                <C.Time>{addZeroLeft(minutes) + ":" + addZeroLeft(seconds)}</C.Time>
                <Waves 
                    animateWaves={isRunning} 
                    percentComplete={percentTimeElapsed({
                        max_time: isWorking ? pomodoro.workTime.value : pomodoro.breakTime.value,
                        current_time: convertToNumberFormat({minutes: minutes, seconds: seconds})
                    })}
                />
            </C.Timer>
            <C.Title>
                { isWorking ? "Hora de trabalhar" : "Merecido descanso" }
            </C.Title>
            <C.ButtonsContainer>
                <Button 
                    action={isRunning ? pause : resume} 
                    text={isRunning ? "Pausar" : "Iniciar"} 
                    active={isRunning}
                    playSound={pomodoro.canPlayAudio.value}
                    filled={true} 
                />
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
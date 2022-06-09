import { useState } from "react";
import Title from "../Title";
import Timer from "../Timer";
import * as C from "./style";
import {IoSettingsOutline} from "react-icons/io5"
import Modal from "../Modal";
import AjustPomodoroTime from "../AjustPomodoroTime";
const MINUTES_MULTIPLY = 60;
const Pomodoro = () => {
    const [workTime, setWorkTime] = useState<number>(25 * MINUTES_MULTIPLY);
    const [breakTime, setBreakTime] = useState<number>(5 * MINUTES_MULTIPLY);

    const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);
    const enableSettings = () => setIsSettingsActive(true);
    const desableSettings = () => setIsSettingsActive(false);

    return(
        <>
            <Modal 
                title="Configurações do pomodoro" 
                template={<AjustPomodoroTime />}
                disableModal={desableSettings} 
                isActive={isSettingsActive}
            />
            <C.Header>
                <Title title="Pomodoro"/>
                <IoSettingsOutline 
                    className="settings" 
                    size={30}
                    onClick={()=> enableSettings()}
                />
            </C.Header>
            <C.TimerContainer>
                <Timer workTime={workTime} breakTime={breakTime}/>
            </C.TimerContainer>
            
        </>
    )
}
export default Pomodoro;
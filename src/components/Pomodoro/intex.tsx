import { useEffect, useState } from "react";
import Title from "../Title";
import Timer from "../Timer";
import * as C from "./style";
import {IoSettingsOutline} from "react-icons/io5"
import Modal from "../Modal";
import AjustPomodoroTime from "../AjustPomodoroTime";
import { useLocalState } from "../../hooks/useLocalState";
const MINUTES_MULTIPLY = 60;

const Pomodoro = () => {
    const {
        state: workTime, 
        setState: setWorkTime
    } = useLocalState<number>("work-time",25 * MINUTES_MULTIPLY);
    const {
        state: breakTime, 
        setState: setBreakTime
    } = useLocalState<number>("break-time",5 * MINUTES_MULTIPLY);


    const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);
    const enableSettings = () => setIsSettingsActive(true);
    const desableSettings = () => setIsSettingsActive(false);

    return(
        <>
            <Modal 
                title="Configurações do pomodoro" 
                template={
                    <AjustPomodoroTime 
                        workTime={{value: workTime, setValue: setWorkTime}}
                        breakTime={{value: breakTime, setValue: setBreakTime}}
                        close={desableSettings}
                    />
                }
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
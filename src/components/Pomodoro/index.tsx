import { createContext, memo, useState } from "react";
import { useLocalState } from "../../hooks/useLocalState";

import Title from "../Title";
import Timer from "../Timer";
import Modal from "../Modal";
import AjustPomodoroTime from "../AjustPomodoroTime";

import * as C from "./style";

import {IoSettingsOutline} from "react-icons/io5"

const MINUTES_MULTIPLY = 60;

const DEFAULT_WORK_TIME = 25 * MINUTES_MULTIPLY;
const DEFAULT_BREAK_TIME = 5;

type PomodoroContextProps = {
    workTime: { value: number, setValue: (newValue: number) => void },
    breakTime: { value: number, setValue: (newValue: number) => void},
    canPlayAudio: {value: boolean, setValue: (newValue: boolean) => void }
}
export const PomodoroContext = createContext<PomodoroContextProps>({
    workTime: { value: DEFAULT_WORK_TIME, setValue: ()=>{} },
    breakTime: { value: DEFAULT_BREAK_TIME, setValue: ()=>{} },
    canPlayAudio: {value: true, setValue: () => {}}
});

const Pomodoro = memo(() => {
    // times
    const {
        state: workTime,
        setState: setWorkTime
    } = useLocalState<number>("work-time", DEFAULT_WORK_TIME);
    const {
        state: breakTime, 
        setState: setBreakTime
    } = useLocalState<number>("break-time", DEFAULT_BREAK_TIME);

    // audio
    const {
        state: canPlayAudio, 
        setState: setCanPlayAudio
    } = useLocalState<boolean>("audio", true);

    // settings
    const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);
    const enableSettings = () => setIsSettingsActive(true);
    const disableSettings = () => setIsSettingsActive(false);

    return(
        <PomodoroContext.Provider value={{
            workTime: { value: workTime, setValue: setWorkTime },
            breakTime: { value: breakTime, setValue: setBreakTime },
            canPlayAudio: { value: canPlayAudio, setValue: setCanPlayAudio }
        }}>
            <Modal 
                title="Configurações do pomodoro" 
                template={ <AjustPomodoroTime close={disableSettings}/> }
                disableModal={disableSettings} 
                isActive={isSettingsActive}
            />
            <C.Header>
                <Title title="Pomodoro"/>
                <IoSettingsOutline className="settings" size={25} onClick={()=> enableSettings()}/>
            </C.Header>
            <C.TimerContainer>
                <Timer />
            </C.TimerContainer>
        </PomodoroContext.Provider>
    )
})
export default Pomodoro;
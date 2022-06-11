import { createContext, memo, useState } from "react";
import Title from "../Title";
import Timer from "../Timer";
import * as C from "./style";
import {IoSettingsOutline} from "react-icons/io5"
import Modal from "../Modal";
import AjustPomodoroTime from "../AjustPomodoroTime";
import { useLocalState } from "../../hooks/useLocalState";

const MINUTES_MULTIPLY = 60;

// valores padrao do pomodoro
const defaultWorkTime = 25 * MINUTES_MULTIPLY;
const defaultBreakTime = 5 * MINUTES_MULTIPLY;
type TimesContextProps = {
    workTime: {
        value: number,
        setValue: (newValue: number) => void
    },
    breakTime: {
        value: number,
        setValue: (newValue: number) => void
    }
}
export const TimesContext = createContext<TimesContextProps>({
    workTime: {
        value: defaultWorkTime,
        setValue: ()=>{}
    },
    breakTime: {
        value: defaultBreakTime,
        setValue: ()=>{}
    }
});

const Pomodoro = memo(() => {
    const {
        state: workTime, 
        setState: setWorkTime
    } = useLocalState<number>("work-time", defaultWorkTime);

    const {
        state: breakTime, 
        setState: setBreakTime
    } = useLocalState<number>("break-time", defaultBreakTime);

    const [isSettingsActive, setIsSettingsActive] = useState<boolean>(false);
    const enableSettings = () => setIsSettingsActive(true);
    const desableSettings = () => setIsSettingsActive(false);

    return(
        <TimesContext.Provider value={
            {
                workTime: {
                    value: workTime, 
                    setValue: setWorkTime
                },
                breakTime: {
                    value: breakTime,
                    setValue: setBreakTime
                }
            }
        }>
            <Modal 
                title="Configurações do pomodoro" 
                template={
                    <AjustPomodoroTime
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
                    size={25}
                    onClick={()=> enableSettings()}
                />
            </C.Header>
            <C.TimerContainer>
                <Timer />
            </C.TimerContainer>
        </TimesContext.Provider>
    )
})
export default Pomodoro;
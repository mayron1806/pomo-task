import { useState, FormEvent, useContext } from "react";
import Label from "../Label/intex";
import { TimesContext } from "../Pomodoro";
import SendButton from "../SendButton";
import TimeInput from "../TimeInput";

type props = {
    close: () => void
}
const AjustPomodoroTime = ({ close }: props) => {
    const times = useContext(TimesContext);

    const [settingsWorkTime, setSettingsWorkTime] = useState<number>(times.workTime.value);
    const [settingsBreakTime, setSettingsBreakTime] = useState<number>(times.breakTime.value);

    const saveTimes = (e: FormEvent) => {
        e.preventDefault();
        times.workTime.setValue(settingsWorkTime);
        times.breakTime.setValue(settingsBreakTime);
        close();
    }
    return(
        <form onSubmit={(e)=> saveTimes(e)}>
            <Label htmlFor="work">Tempo de trabalho:(min)</Label>
            <TimeInput 
                id="work" 
                onChange={setSettingsWorkTime} 
                time={times.workTime.value} 
                minMinutes={10} 
                maxMinutes={50}
            />
            <Label htmlFor="break">Tempo de descanso:(min)</Label>
            <TimeInput 
                id="break"
                onChange={setSettingsBreakTime} 
                time={times.breakTime.value} 
                minMinutes={0} 
                maxMinutes={20}
            />
            <SendButton value="Salvar"/>
        </form>
    )
}
export default AjustPomodoroTime;
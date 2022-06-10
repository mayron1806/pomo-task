import { useState, FormEvent, useContext } from "react";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label/intex";
import { TimesContext } from "../Pomodoro/intex";
import SendButton from "../SendButton";
import TimeInput from "../TimeInput";

type Times = {
    value: number,
    setValue: (value:number) => void
}
type props = {
    close: () => void
}
const AjustPomodoroTime = ({close}: props) => {
    const times = useContext(TimesContext);

    const [settingsWorkTime, setSettingsWorkTime] = useState<number>(times.workTime.value);
    const [settingsBreakTime, setSettingsBreakTime] = useState<number>(times.breakTime.value);
    const updateWorkTime = (newValue: number) => setSettingsWorkTime(newValue);
    const updateBreakTime = (newValue: number) => setSettingsBreakTime(newValue);

    const saveTimes = (e: FormEvent) => {
        e.preventDefault();
        times.workTime.setValue(settingsWorkTime);
        times.breakTime.setValue(settingsBreakTime);
        close();
    }
    
    return(
        <form onSubmit={(e)=> saveTimes(e)}>
            <Label htmlFor="work">Tempo de trabalho:(min)</Label>
            <TimeInput onChange={updateWorkTime} time={times.workTime.value} minMinutes={10} maxMinutes={50}/>
            <Label htmlFor="break">Tempo de descanso:(min)</Label>
            <TimeInput onChange={updateBreakTime} time={times.breakTime.value} minMinutes={0} maxMinutes={20}/>
            <ErrorMessage></ErrorMessage>
            <SendButton value="Salvar"/>
        </form>
    )
}
export default AjustPomodoroTime;
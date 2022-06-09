import { useState, FormEvent } from "react";
import ErrorMessage from "../ErrorMessage";
import Label from "../Label/intex";
import SendButton from "../SendButton";
import TimeInput from "../TimeInput";

type Times = {
    value: number,
    setValue: (value:number) => void
}
type props = {
    workTime: Times,
    breakTime: Times,
    close: ()=> void
}
const AjustPomodoroTime = ({workTime, breakTime, close}: props) => {
    const [workT, setWorkT] = useState<number>(workTime.value);
    const [breakT, setBreakT] = useState<number>(breakTime.value);

    const saveTimes = (e: FormEvent) => {
        e.preventDefault();
        workTime.setValue(workT);
        breakTime.setValue(breakT);
        close();
    }
    return(
        <form onSubmit={(e)=> saveTimes(e)}>
            <Label htmlFor="work">Tempo de trabalho:(min)</Label>
            <TimeInput onChange={setWorkT} time={workTime.value} minMinutes={10} maxMinutes={50}/>
            <Label htmlFor="break">Tempo de descanso:(min)</Label>
            <TimeInput onChange={setBreakT} time={breakTime.value} minMinutes={0} maxMinutes={20}/>
            <ErrorMessage></ErrorMessage>
            <SendButton value="Salvar"/>
        </form>
    )
}
export default AjustPomodoroTime;
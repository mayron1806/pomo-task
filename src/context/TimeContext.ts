import { createContext } from "react";


type TimesContextProps = {
    workTime: {
        value: number | undefined,
        setValue: (newValue: number) => void
    },
    breakTime: {
        value: number | undefined,
        setValue: (newValue: number) => void
    }
}

const TimesContext = createContext<TimesContextProps | null>(null);

export default TimesContext;
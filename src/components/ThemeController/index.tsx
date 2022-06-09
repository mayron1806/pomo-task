import React, { SetStateAction, useState } from "react";
import { setTimeout } from "timers";
import darkTheme from "../../themes/dark";
import lightTheme from "../../themes/light";
import Theme from "../../types/Theme";
import * as C from "./style";
type props = {theme: Theme, setTheme: (theme :Theme) => void}
const ThemeController = ({ theme, setTheme }: props) => {
    return(
        <C.Container className="theme">
            <C.Button 
                className={theme.name === "light" ? "top active" : "top"}
                onClick={()=> setTheme(lightTheme)}
            ><C.TextButton>Claro</C.TextButton></C.Button>
            <C.Button
                onClick={()=> setTheme(darkTheme)}
                className={theme.name === "dark" ? "bottom active" : "bottom"}
            ><C.TextButton>Escuro</C.TextButton></C.Button>
        </C.Container>
    )
}
export default ThemeController;
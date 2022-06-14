import darkTheme from "../../themes/dark";
import lightTheme from "../../themes/light";
import Theme from "../../types/Theme";

import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md"

import * as C from "./style";

type props = { theme: Theme, setTheme: (theme :Theme) => void }
const ThemeController = ({ theme, setTheme }: props) => {
    return(
        <C.Container className="theme">
            <C.Button 
                className={theme.name === "light" ? "top active" : "top"}
                onClick={()=> setTheme(lightTheme)}
            ><C.TextButton><MdOutlineLightMode size={25}/></C.TextButton></C.Button>
            <C.Button
                onClick={()=> setTheme(darkTheme)}
                className={theme.name === "dark" ? "bottom active" : "bottom"}
            ><C.TextButton><MdOutlineDarkMode size={25}/></C.TextButton></C.Button>
        </C.Container>
    )
}
export default ThemeController;
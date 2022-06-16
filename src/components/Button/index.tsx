import * as C from "./style";
import sound from "../../assets/sounds/click.mp3";
import { playAudio } from "../../utils/Audio";

type props = { 
    text: string, 
    action: () => void, 
    active?: boolean, 
    playSound?: boolean,
    filled?: boolean 
}
const Button = ({ text, action, active = false, playSound = false }: props) => {
    const click = () => {
        if(playSound){
            playAudio(sound);
        }
        action();
    }
    return (
        <C.Container active={active} onClick={() => click()}>
            <div className="front">{text}</div>
        </C.Container>
    )
}
export default Button;
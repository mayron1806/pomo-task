import * as C from "./style";
import sound from "../../assets/sounds/click.mp3";
import { useAudio } from "../../hooks/useAudio";

type props = { 
    text: string, 
    action: () => void, 
    active?: boolean, 
    playSound?: boolean,
    filled?: boolean 
}
const Button = ({ text, action, active = false, playSound = false }: props) => {
    const audio = useAudio(sound);
    const click = () => {
        if(playSound){
            audio.setSound(sound);
            audio.play();
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
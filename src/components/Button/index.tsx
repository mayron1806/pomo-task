import * as C from "./style";

type props = {
    text: string,
    action: () => void,
    filled?: boolean 
}
const Button = ({ text, action, filled = false }: props) => {
    return(
        <C.Button filled={filled} onClick={() => action()}>
            {text}
        </C.Button>
    )
}
export default Button;
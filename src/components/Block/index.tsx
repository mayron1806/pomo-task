import * as C from "./style";

type props = {
    name: string
    value: number,
    active: boolean,
    action?: () => void 
}
const Block = ({name, value, active, action}: props) => {
    return(
        <C.Container className={active ? "active" : ""} onClick={() => action ? action() : () => {} }>
            <C.Title>{name}</C.Title>
            <C.Value>{value}</C.Value>
            <p>tarefas</p>
        </C.Container>
    )
}
export default Block;
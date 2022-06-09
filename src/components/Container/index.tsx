import * as C from "./style";
type props ={
    children: JSX.Element,
    className?: string,
}
const Container = ({children, className}: props) => {
    return(
        <C.Container className={className}>
            {children}
        </C.Container>
    )
}
export default Container;
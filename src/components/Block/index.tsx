import styled from "styled-components";

const Container = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    color: var(--purple);
    border: 3px solid var(--purple);
    border-radius: 2rem;
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    transition: 0.5s;
    &:hover, &.active{
        background-color: var(--purple);
        color: var(--white);
    }
`;
type props = {
    name: string
    value: number,
    active: boolean,
    action?: () => void 
}
const Block = ({name, value, active, action}: props) => {
    return(
        <Container className={active ? "active" : ""} onClick={() => action && action()}>
            <h3 style={{fontSize: "2rem"}}>{name}</h3>
            <h2 style={{fontSize: "5rem"}}>{value}</h2>
            <p style={{fontSize: "1.5rem"}}>tarefas</p>
        </Container>
    )
}
export default Block;
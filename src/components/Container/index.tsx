import styled from "styled-components";

const BorderContainer = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 3rem;
    background-color: ${props => props.theme.main};
    box-shadow: 0 0 15px var(--shadow);
    padding: 2rem;
    transition: 0.5s;
`;
type props = { children: JSX.Element, className?: string }
const Container = ({children, className}: props) => {
    return(
        <BorderContainer className={className}>
            {children}
        </BorderContainer>
    )
}
export default Container;
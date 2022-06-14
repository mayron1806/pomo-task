import styled from "styled-components";

const Container = styled.button<{filled: boolean}>`
    width: 100%;
    min-width: fit-content;
    font-size: 2.5rem;
    font-weight: 600;
    padding: 1rem 2rem;
    background-color: ${props => props.filled ? "var(--purple)" : "transparent"};
    color: ${props => props.filled ? "var(--white)" : "var(--purple)"};
    border-radius: 5rem;
    border: 3px solid var(--purple);
    cursor: pointer;
    transition: 0.3s;
    &:hover{
        filter: brightness(1.2);
    }
`;

type props = { text: string, action: () => void, filled?: boolean }

const Button = ({ text, action, filled = false }: props) => {
    return <Container filled={filled} onClick={() => action()}>{text}</Container>
}
export default Button;
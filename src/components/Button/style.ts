import styled from "styled-components";


export const Button = styled.button<{filled: boolean}>`
    width: 50%;
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
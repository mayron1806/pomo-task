import styled, { css } from "styled-components";
const buttonActive = (active: boolean) => {
    if(active){
        return css`.front{ transform: translateY(-1px); }`;
    }
    return css`.front{ transform: translateY(-5px); }`;
}
export const Container = styled.button<{active: boolean}>`
    width: 100%;
    min-width: fit-content;
    background-color: var(--light-purple);
    border-radius: 10px;
    display: flex;
    .front{
        width: 100%;
        height: 100%;
        color: var(--white);
        background-color: var(--purple);
        border-radius: 10px;
        padding: 1rem 2rem;
        font-size: 2.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: 0.3s;
    }
    &:active .front{
        transform: translateY(-1px);
    }
    ${props => buttonActive(props.active)}
`;
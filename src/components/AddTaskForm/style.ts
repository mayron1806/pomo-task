import styled, { keyframes } from "styled-components";

export const Form = styled.form`
    .priority{
        margin-top: 2rem;
    }
`;
const vibrateAnim = keyframes`
    0%, 20%{
        transform: translateX(0);
    }
    10%, 30%{
        transform: translateX(10px);
    }
    40%, 60%{
        transform: translateX(15px);
    }
    50%, 70%{
        transform: translateX(5px);
    }
    80%, 100%{
        transform: translateX(10px);
    }
    90%{
        transform: translateX(0px);
    }
`;
export const Input = styled.input`
    font-size: 1.8rem;
    padding: 0.5rem;
    border: 1px solid var(--purple);
    border-radius: 5px;
    box-shadow: 2px 2px 5px var(--light-purple);
    width: 100%;
    transition:0.5s;
    &.error{
        border-color: var(--red);
        box-shadow: 2px 2px 5px transparent;
        animation:${vibrateAnim} 0.3s linear 1;
    }
`;
export const Text = styled.textarea`
    font-size: 1.8rem;
    width: 100%;
    border: 1px solid var(--purple);
    border-radius: 5px;
    box-shadow: 2px 2px 5px var(--light-purple);
    padding: 0.5rem;
`;
export const Select = styled.select`
    padding: 0.5rem;
    border: 1px solid var(--purple);
    border-radius: 10px;
    box-shadow: 2px 2px 5px var(--light-purple);
    font-size: 1.8rem;
    font-family: 'Roboto Mono', monospace;
    color: var(--black);
`;
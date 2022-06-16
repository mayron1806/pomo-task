import styled, { keyframes } from "styled-components";
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
/* CONTAINER ---------------------------------------------------------------------------------- */
export const Time = styled.div`
    border: 1px solid var(--purple);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    overflow:hidden;
    //error animation
    &.error{
        animation: ${vibrateAnim} 0.3s linear 1;
        border-color: var(--red);
    }
`;
/* INPUT ------------------------------------------------------------------------------------- */
export const Input = styled.input.attrs({type:"number"})`
    font-size:1.8rem;
    height:100%;
    padding:1rem;
    width: 100%;
    background-color: ${props=> props.theme.main};
    color: ${props=> props.theme.text_color};
`;
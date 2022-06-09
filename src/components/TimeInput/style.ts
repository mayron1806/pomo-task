import styled from "styled-components";

export const Time = styled.div`
    border: 1px solid var(--purple);
    border-radius: 10px;
    display: inline-flex;
    align-items: center;
    overflow:hidden;
    span{
        transform:translateY(-2px)
    }
    
`;
export const Input = styled.input.attrs({type:"number"})`
    // remove arrows
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    -moz-appearance: textfield;
    font-size:1.8rem;
    height:100%;
    padding:0.3rem;
    text-align: center;
    width: 30px;
    background-color: ${props=> props.theme.colors.main};
    color: ${props=> props.theme.colors.text_color};
`;
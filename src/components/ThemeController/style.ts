import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 3rem;
    display: flex;
    overflow: hidden;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    gap: 1px;
    background-color: var(--gray);
    .top{
        border-top-left-radius: 3rem;
        border-top-right-radius: 3rem;
    }
    .top.active{
        box-shadow: inset 0 4px 5px var(--shadow);
    }
    .bottom{
        border-bottom-left-radius: 3rem;
        border-bottom-right-radius: 3rem;   
    }
    .bottom.active{
        box-shadow: inset 0 -4px 5px var(--shadow);
    }
`;
export const Button = styled.button`
    background-color: ${props => props.theme.colors.main};
    height: 100%;
    font-size: 2.5rem;
    position: relative;
    transition: 0.5s;
`;
export const TextButton = styled.p`
    color: ${props => props.theme.colors.text_color};
    transform: rotate(90deg) translate(-25%);
    position: absolute;
    top: 50%;
    width: 100%;
`;
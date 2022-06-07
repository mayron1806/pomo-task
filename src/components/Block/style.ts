import styled from "styled-components";

export const Container = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    color: var(--purple);
    border: 3px solid var(--purple);
    border-radius: 2rem;
    padding: 1rem;
    width: 100%;
    cursor: pointer;
    p{
        font-size: 1.5rem;
    }
    transition: 0.5s;
    &:hover, &.active{
        background-color: var(--purple);
        color: var(--white);
        box-shadow: 
            inset 4px 4px 10px rgba(0, 0, 0, 0.2),
            inset -4px -4px 10px rgba(0, 0, 0, 0.2);
    }
`;
export const Title = styled.h3`
    font-size: 2rem;
`;
export const Value = styled.div`
    font-size: 5rem;
`;
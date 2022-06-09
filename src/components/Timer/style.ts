import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-areas: "timer title" "timer buttons";
    grid-template-columns: 1fr 1fr;
    width: 100%;
`;
export const Time = styled.div`
    grid-area: timer;
    width: 350px;
    height: 350px;
    background-color: var(--purple);
    color: var(--white);
    font-size: 4rem;
    font-weight: 500;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export const Title = styled.h3`
    grid-area: title;
    font-size: 3rem;
    font-weight: 500;
    color: var(--purple);
`;
export const ButtonsContainer = styled.div`
    grid-area: buttons;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
`;
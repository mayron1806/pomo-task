import styled from "styled-components";

export const Container = styled.div`
    background-color: ${props => props.theme.colors.main};
    width: 100vw;
    height: 100vh;
    padding: 2rem;
    display: grid;
    grid-template-columns: 25vw 1fr 5vw;
    grid-template-rows: 30vh 1fr;
    grid-template-areas: 
    "tasks wellcome theme"
    "tasks pomodoro pomodoro";
    grid-gap: 2rem; 
    transition: 0.5s;
    .tasks{
        grid-area: tasks;
        min-width: 350px;
    }
    .wellcome{
        grid-area: wellcome;
    }
    .theme{
        grid-area: theme;
    }
    .pomodoro{
        grid-area: pomodoro;
    }
`;
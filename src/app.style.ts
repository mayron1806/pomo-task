import styled from "styled-components";

export const Main = styled.div`
    background-color: ${props => props.theme.main};
    padding: 2rem;
    display: grid;
    min-height: 100vh;
    grid-template-columns: 35vw 1fr auto;
    grid-template-rows: 30vh 1fr;
    grid-template-areas: 
    "tasks wellcome theme"
    "tasks pomodoro pomodoro";
    grid-gap: 2rem; 
    transition: 0.5s;
    .tasks{
        grid-area: tasks;
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
    @media (max-width: 950px){
        grid-template-areas: 
        "pomodoro wellcome theme"
        "pomodoro tasks tasks";
    }
    @media (max-width: 700px){
        grid-template-areas: 
        "wellcome wellcome theme"
        "pomodoro tasks tasks";
        grid-template-columns: 40vw 1fr auto;
        grid-template-rows: 25vh 1fr;
    }
    @media (max-width: 600px){
        grid-template-columns: 1fr 10vw;
        grid-template-rows: 30vh 1fr 1fr auto;
        grid-template-areas: 
        "wellcome wellcome"
        "pomodoro pomodoro"
        "tasks tasks"
        "theme theme";
    }
`;
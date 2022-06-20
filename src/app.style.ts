import styled from "styled-components";
export const Main = styled.div`
    background-color: ${props => props.theme.main};
    min-height: 100vh;
    display: flex;
    justify-content: center;
`;
export const Content = styled.div`
    padding: 2rem;
    display: grid;
    height: 100%;
    max-width: 1000px;
    grid-template-columns: 90% 1fr;
    grid-template-rows: 30vh 1fr 1fr;
    grid-template-areas: 
    "wellcome theme"
    "pomodoro pomodoro"
    "tasks tasks";
    grid-gap: 5rem 2rem; 
    transition: 0.5s;
    .tasks{
        grid-area: tasks;
        border-top: 1px solid var(--gray);
        padding-top: 1rem;
    }
    .wellcome{
        grid-area: wellcome;
    }
    .theme{
        grid-area: theme;
    }
    .pomodoro{
        grid-area: pomodoro;
        border-top: 1px solid var(--gray);
        padding-top: 1rem;
    }
   
    @media (max-width: 600px){
        grid-template-columns: 1fr;
        grid-template-rows: 30vh auto 1fr 1fr;
        grid-template-areas: 
        "wellcome"
        "theme"
        "pomodoro"
        "tasks";
    }
`;
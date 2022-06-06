import styled from "styled-components";
import { priority } from "../../enum/priority";

export const Container = styled.div`
    display: flex;  
    width: 500px;
    justify-content: space-between;
    border-bottom: 1px solid var(--gray);
    padding: 3px;
    margin: 1rem 0;
    .left, .right{
        display: flex;
        align-items: center;
    } 
    .left{
        width: 70%;
        gap: 1rem;
    }
    .right{
        width: 30%;
        justify-content: space-between;
    }
`;
export const Name = styled.p`
    font-size: 1.6rem;
    color: var(--black);
`;

const priorityStyle = (p: priority) => {
    let color;
    let text;
    switch(p){
        case priority.LOW:
            text = "Baixa";
            color = "var(--green)";
        break;
        case priority.MEDIUM:
            text = "Média";
            color = "var(--yellow)";
        break;
        case priority.HIGH:
            text = "Alta";
            color = "var(--red)";
        break;
    }
    return `
        background-color: ${color};
        &::after{
            content: '${text}';
        }
    `;
    
}
export const Priority = styled.p<{priority: priority}>`
    padding: 0 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--white);
    border-radius: 5px;
    ${props => priorityStyle(props.priority)}
`;
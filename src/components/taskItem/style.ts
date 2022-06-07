import styled from "styled-components";
import { priority } from "../../enum/priority";

export const Container = styled.tr`
    .check-box-container{
        position: relative;
        input{
            opacity: 0;
            z-index: 10;
        }
    }
`;
export const CheckBox = styled.div<{active: boolean}>`
    position: absolute;
    width: 15px;
    height: 15px;
    background-color: ${props => props.active ? "var(--purple)" : "transparent"};
    border-radius: 2px;
    border: 1px solid var(--purple);
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`;
export const TableData = styled.td`
    text-align: center;
    &.left{
        text-align: left;
    }
    .close-icon{
        cursor: pointer;
    }
`;
export const Name = styled.p<{complete: boolean}>`
    font-size: 1.6rem;
    color: var(--black);
    text-decoration: ${props => props.complete ? "line-through" : "none"};
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
export const PriorityContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;
export const Priority = styled.p<{priority: priority}>`
    width: fit-content;
    padding: 0 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--white);
    border-radius: 5px;
    ${props => priorityStyle(props.priority)}
`;
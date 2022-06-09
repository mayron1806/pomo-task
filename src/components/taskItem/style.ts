import styled from "styled-components";
import { Priority as P } from "../../enum/priority";

export const CheckBox = styled.div<{active: boolean}>`
    width: 15px;
    height: 15px;
    background-color: ${props => props.active ? "var(--purple)" : "transparent"};
    border-radius: 2px;
    border: 1px solid var(--purple);
    cursor: pointer;
`;
export const TableData = styled.td`
    text-align: center;
    color: ${props => props.theme.colors.text_color};
    &.left{
        text-align: left;
    }
    .close-icon{
        cursor: pointer;
    }
`;
export const Name = styled.p<{complete: boolean}>`
    font-size: 1.6rem;
    color: ${props => props.theme.colors.text_color}    ;
    text-decoration: ${props => props.complete ? "line-through" : "none"};
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
    overflow: hidden;
`;

const priorityStyle = (p: P) => {
    let color;
    let text;
    switch(p){
        case P.LOW:
            text = "Baixa";
            color = "var(--green)";
        break;
        case P.MEDIUM:
            text = "Média";
            color = "var(--yellow)";
        break;
        case P.HIGH:
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
    color: ${props => props.theme.colors.text_color};
    width: 100%;
    display: flex;
    justify-content: center;
`;
export const Priority = styled.p<{priority: P}>`
    cursor: pointer;
    width: fit-content;
    padding: 0 1rem;
    font-size: 1.6rem;
    font-weight: 500;
    color: var(--white);
    border-radius: 5px;
    ${props => priorityStyle(props.priority)}
`;
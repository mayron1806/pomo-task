import { IoClose } from "react-icons/io5";
import { TaskItemType } from "../../types/taskItemType";

import styled from "styled-components";
import { Priority as P } from "../../enum/priority";

export const TableData = styled.td`
    text-align: center;
    color: ${props => props.theme.text_color};
    &.left{
        text-align: left;
    }
    .close-icon{
        cursor: pointer;
    }
`;
export const CheckBox = styled.div<{active: boolean}>`
    width: 15px;
    height: 15px;
    background-color: ${props => props.active ? "var(--purple)" : "transparent"};
    border-radius: 2px;
    border: 1px solid var(--purple);
    cursor: pointer;
`;

export const Name = styled.p<{complete: boolean}>`
    font-size: 1.6rem;
    color: ${props => props.theme.text_color}    ;
    text-decoration: ${props => props.complete ? "line-through" : "none"};
    cursor: pointer;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 140px;
    overflow: hidden;
`;
/* PRIORITY ---------------------------------------------------------------------------------- */
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
    color: ${props => props.theme.text_color};
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

type props = {
    task: TaskItemType,
    deleteTask: (id: string) => void,
    changeTaskState: (id: string, complete?: boolean, priority?: P) => void,
    showDescription: (title: string, description: string | undefined) => void
}
const TaskItem = ({task, deleteTask, changeTaskState, showDescription }: props)=>{
    const changePriority = () => {
        const priorityLenght = Object.keys(Priority).length / 2;
       // se estiver no ultimo indice vai voltar para o comeco
        if(task.priority + 1 >= priorityLenght){
            changeTaskState(task.id, undefined, Priority.LOW);
            return;
        }
        // se não vai adicionar normalmente
        changeTaskState(task.id, undefined, task.priority + 1);
    }
    return(
        <tr>
            <TableData>
                <CheckBox active={task.complete} onClick={()=> changeTaskState(task.id, !task.complete)}/>
            </TableData>
            <TableData onClick={()=>showDescription( task.name, task.description )} className="left">
                <Name complete={task.complete}>{task.name}</Name>
            </TableData>
            <TableData>
                <PriorityContainer>
                    <Priority onClick={()=> changePriority()} priority={task.priority}/>
                </PriorityContainer>
            </TableData>
            <TableData>
                <IoClose className="close-icon" size={20} onClick={() => deleteTask(task.id)} />
            </TableData>
        </tr>
    )
}
export default TaskItem;
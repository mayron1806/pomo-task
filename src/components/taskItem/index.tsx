import { IoClose } from "react-icons/io5";

import { Priority } from "../../enum/priority";
import { TaskItemType } from "../../types/taskItemType";

import * as C from "./style";

type props = {
    task: TaskItemType,
    deleteTask: (id: string) => void,
    changeTaskState: (id: string, complete?: boolean, priority?: Priority) => void,
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
            <C.TableData>
                <C.CheckBox active={task.complete} onClick={()=> changeTaskState(task.id, !task.complete)}/>
            </C.TableData>
            <C.TableData onClick={()=>showDescription( task.name, task.description )} className="left">
                <C.Name complete={task.complete}>{task.name}</C.Name>
            </C.TableData>
            <C.TableData>
                <C.PriorityContainer>
                    <C.Priority onClick={()=> changePriority()} priority={task.priority}/>
                </C.PriorityContainer>
            </C.TableData>
            <C.TableData>
                <IoClose className="close-icon" size={20} onClick={() => deleteTask(task.id)} />
            </C.TableData>
        </tr>
    )
}
export default TaskItem;
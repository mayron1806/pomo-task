import { TaskItemType } from "../../types/taskItemType"
import * as C from "./style";
import { IoClose } from "react-icons/io5";
import { priority } from "../../enum/priority";

type props = {
    task: TaskItemType,
    deleteTask: (id: string) => void,
    changeTaskState: (id: string, complete?: boolean, priority?: priority) => void,
    showDescription: (id: string, title: string, description: string | undefined) => void
}
const TaskItem = ({task, deleteTask, changeTaskState, showDescription }: props)=>{
    const changePriority = () => {
        const priorityLenght = Object.keys(priority).length / 2;
       // se estiver no ultimo indice vai voltar para o comeco
        if(task.priority + 1 >= priorityLenght){
            changeTaskState(task.id, undefined, priority.LOW);
            return;
        }
        // se não vai adicionar normalmente
        changeTaskState(task.id, undefined, task.priority + 1);
    }
    return(
        <tr>
            <C.TableData>
                <C.CheckBox 
                    active={task.complete}
                    onClick={()=> changeTaskState(task.id, !task.complete)} 
                />
            </C.TableData>
            <C.TableData onClick={()=>showDescription(task.id, task.name, task.description)} className="left">
                <C.Name complete={task.complete}>
                    {task.name}
                </C.Name>
            </C.TableData>
            <C.TableData>
                <C.PriorityContainer>
                    <C.Priority onClick={()=> changePriority()} priority={task.priority}/>
                </C.PriorityContainer>
            </C.TableData>
            <C.TableData>
                <IoClose 
                    className="close-icon" 
                    size={20}
                    onClick={() => deleteTask(task.id)}
                />
            </C.TableData>
        </tr>
    )
}
export default TaskItem;
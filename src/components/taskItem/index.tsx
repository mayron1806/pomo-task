import { TaskItemType } from "../../types/taskItemType"
import * as C from "./style";
import { IoClose } from "react-icons/io5";
type props = {
    task: TaskItemType,
    deleteTask: (id: string) => void,
    changeTaskState: (id: string, value: boolean)=> void
}
const TaskItem = ({task, deleteTask, changeTaskState }: props)=>{
    return(
        <C.Container>
            <C.TableData className="check-box-container">
                <input 
                    type="checkbox" 
                    onChange={(e)=> changeTaskState(task.id, e.target.checked)} 
                    checked={task.complete} 
                />
                <C.CheckBox 
                    active={task.complete}
                    onClick={()=> changeTaskState(task.id, !task.complete)} 
                />
            </C.TableData>
            <C.TableData className="left">
                <C.Name complete={task.complete}>
                    {task.name}
                </C.Name>
            </C.TableData>
            <C.TableData>
                <C.PriorityContainer>
                    <C.Priority priority={task.priority}/>
                </C.PriorityContainer>
            </C.TableData>
            <C.TableData>
                <IoClose 
                    className="close-icon" 
                    size={20}
                    onClick={() => deleteTask(task.id)}
                />
            </C.TableData>
        </C.Container>
    )
}
export default TaskItem;
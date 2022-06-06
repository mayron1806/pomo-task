import { TaskItemType } from "../../types/taskItemType"
import * as C from "./style";
import { IoClose } from "react-icons/io5";
type props = {
    task: TaskItemType,
    changeTaskState: (id: string, value: boolean)=> void
}
export const TaskItem = ({task, changeTaskState}: props)=>{
    return(
        <C.Container>
            <div className="left">
                <input 
                    type="checkbox" 
                    onChange={(e)=> changeTaskState(task.id, e.target.checked)} 
                    checked={task.complete} 
                />
                <C.Name>{task.name}</C.Name>
            </div>
            <div className="right">
                <C.Priority priority={task.priority}/>
                <IoClose className="close-icon" size={20}/>
            </div>
        </C.Container>
    )
}
import { useMemo, useRef } from "react"
import { TaskItemType } from "../../types/taskItemType";
import { TaskListType } from "../../types/taskListType";
import { v4 as getID } from "uuid";
import { useLocalState } from "../../hooks/useLocalState";
import { TaskItem } from "../taskItem";
import { priority } from "../../enum/priority";

export const Task = ()=> {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const {
        state: tasks,
        set: setTasks
    } = useLocalState<TaskListType>("tasks", []);

    const changeTaskState = (id: string, value: boolean) => {
        const taskIndex = tasks.findIndex((task => {
            if(task.id === id){
                return true;
            }
        }))
        const new_tasks = tasks;
        new_tasks[taskIndex].complete = value;
        setTasks(new_tasks);
    }

    const complete_task_count = useMemo(()=>{
        return tasks.filter(task => task.complete).length
    }, [tasks])
    const incomplete_task_count = useMemo(()=>{
        return tasks.filter(task => !task.complete).length
    }, [tasks])
    
    const addNewTask = () => {
        const input_value = inputRef.current?.value;
        if(input_value){
            const old_tasks = tasks;
            const new_task: TaskItemType = {
                id: getID(),
                complete: false,
                name: input_value,
                priority: priority.LOW
            }
            setTasks([...old_tasks, new_task]);
        }
    }
    return(
        <div>
            <input type="text" ref={inputRef} />
            <button onClick={()=> addNewTask()}>Add</button>
            {
            tasks.map((task)=> (
                <TaskItem 
                    key={task.id} 
                    task={task}
                    changeTaskState={changeTaskState} 
                />
            ))
            }
           <h2>Complete tasks: {complete_task_count}</h2>
           <h2>Incomplete tasks: {incomplete_task_count}</h2>
        </div>
    )
}
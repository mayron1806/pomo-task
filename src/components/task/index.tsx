import { useMemo, useRef, useState } from "react"
import { TaskItemType } from "../../types/taskItemType";
import { TaskListType } from "../../types/taskListType";
import { useLocalState } from "../../hooks/useLocalState";
import TaskItem from "../TaskItem";
import { priority } from "../../enum/priority";
import * as C from "./style";
import Block from "../Block";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "../Base-modal";
import AddTaskForm from "../AddTaskForm";

enum TaskListFilter{
    ALL,
    COMPLETE,
    INCOMPLETE
}

const Task = ()=> {
    const [formAddTaskActive, setFormAddTaskActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    
    const {
        state: allTasks,
        set: setAllTasks
    } = useLocalState<TaskListType>("tasks", []);

    const [filter, setFilter] = useState<TaskListFilter>(TaskListFilter.ALL);
    
    const tasks = () => {
        let t;
        switch(filter){
            case TaskListFilter.ALL:
                t = allTasks;
                break;
            case TaskListFilter.COMPLETE:
                t = allTasks.filter(task => task.complete);
                break;
            case TaskListFilter.INCOMPLETE:
                t = allTasks.filter(task => !task.complete);
                break;
        }
        return t;
    }

    const changeTaskState = (id: string, value: boolean) => {
        const taskIndex = allTasks.findIndex(task => task.id === id)
        if(taskIndex === -1) return;

        const new_tasks = allTasks;
        new_tasks[taskIndex].complete = value;
        setAllTasks(new_tasks);
    }
    const deleteTask = (id: string) => {
        const index = allTasks.findIndex(task => task.id === id)
        if(index === -1) return;
        const tasks = allTasks;
        tasks.splice(index, 1);
        setAllTasks(tasks);
    }

    const showCompleteTask = () => { setFilter(TaskListFilter.COMPLETE) }
    const showIncompleteTask = () => { setFilter(TaskListFilter.INCOMPLETE) }
    const showAllTasks = ()=>{ setFilter(TaskListFilter.ALL) }

    const complete_task_count = useMemo(()=>{
        return allTasks.filter(task => task.complete).length
    }, [allTasks])
    const incomplete_task_count = useMemo(()=>{
        return allTasks.filter(task => !task.complete).length
    }, [allTasks])
    
    const openFormAddTask = () => setFormAddTaskActive(true);
    const closeFormAddTask = () => setFormAddTaskActive(false);
    
    const addNewTask = (task: TaskItemType) => {
        
    }
    return(
        <C.Container>
            {/*
            <input type="text" ref={inputRef} />
            <button onClick={()=> addNewTask()}>Add</button>
            */}
            <Modal
                title="Criar nova tarefa"
                template={<AddTaskForm addTask={addNewTask}/>}
                disableModal={closeFormAddTask}
                state={formAddTaskActive}
            />
            <C.Header>
                <C.Title>Tarefas</C.Title>
                <IoIosAddCircleOutline 
                    className="add-task" 
                    size={30}
                    onClick={()=> openFormAddTask()}
                />
            </C.Header>
            <C.BlocksContainer>
                <Block 
                    name="A fazer" 
                    value={incomplete_task_count} 
                    action={showIncompleteTask}
                    active={filter === TaskListFilter.INCOMPLETE}
                />
                <Block 
                    name="Concluídas" 
                    value={complete_task_count} 
                    action={showCompleteTask}
                    active={filter === TaskListFilter.COMPLETE}
                />
            </C.BlocksContainer>
            {
                filter !== TaskListFilter.ALL &&
                <C.Button onClick={()=> showAllTasks()}>Mostrar todas tarefas</C.Button>
            }
            <C.TableContainer>
                <table>
                    <C.TableHead>
                        <tr>
                            <th></th>
                            <th className="name">Nome</th>
                            <th>Prioridade</th>
                            <th></th>
                        </tr>
                    </C.TableHead>
                    <tbody>
                        { 
                            tasks().map((task)=> (
                                <TaskItem 
                                    key={task.id} 
                                    task={task}
                                    changeTaskState={changeTaskState} 
                                    deleteTask={deleteTask}
                                />
                            ))
                        }
                    </tbody>
                </table>
            </C.TableContainer>
        </C.Container>
    )
}
export default Task;
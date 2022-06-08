import { useState } from "react";
import { TaskItemType } from "../../types/taskItemType";
import { TaskListType } from "../../types/taskListType";
import { useLocalState } from "../../hooks/useLocalState";
import TaskItem from "../TaskItem";
import * as C from "./style";
import Block from "../Block";
import { IoIosAddCircleOutline } from "react-icons/io";
import Modal from "../Base-modal";
import AddTaskForm from "../AddTaskForm";
import { priority } from "../../enum/priority";

enum TaskListFilter{
    ALL,
    COMPLETE,
    INCOMPLETE
}
const Task = ()=> {
    // TAREFAS ---------------------------------------------------------------------------------
    // lista com todas tarefas
    const {
        state: allTasks,
        set: setAllTasks
    } = useLocalState<TaskListType>("tasks", []);
    // adiciona uma nova tarefa
    const addNewTask = (task: TaskItemType) => setAllTasks([...allTasks, task]);
    // filtra as tarefas para definir quais serão exibidas
    const [filter, setFilter] = useState<TaskListFilter>(TaskListFilter.ALL);
    const showCompleteTask = () => { setFilter(TaskListFilter.COMPLETE) }
    const showIncompleteTask = () => { setFilter(TaskListFilter.INCOMPLETE) }
    const showAllTasks = () => { setFilter(TaskListFilter.ALL) }
    // lista com as tarefas que serao exibidas
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
    // quando alguma propriedade de alguma tarefa mudar
    const changeTaskState = (id: string, complete?: boolean, priority?: priority) => {
        const taskIndex = allTasks.findIndex(task => task.id === id);
        if(taskIndex === -1) return;

        const new_tasks = allTasks;
        if(complete !== undefined) new_tasks[taskIndex].complete = complete;
        if(priority !== undefined) new_tasks[taskIndex].priority = priority;
        setAllTasks(new_tasks);
    }
    // deleta tarefa
    const deleteTask = (id: string) => {
        const index = allTasks.findIndex(task => task.id === id)
        if(index === -1) return;
        const tasks = allTasks;
        tasks.splice(index, 1);
        setAllTasks(tasks);
    }
    // conta as tarefas concluidas
    const complete_task_count = allTasks.filter(task => task.complete).length;
    // conta as tarefas a fazer
    const incomplete_task_count = allTasks.filter(task => !task.complete).length;


    // MODAL -----------------------------------------------------------------------------------
    const [modalIsActive, setModalIsActive] = useState<boolean>(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalTemplate, setModalTemplate] = useState<JSX.Element>();
    // ativa o modal com a descrição da tarefa
    const openDescription = (id: string, title: string, description: string | undefined) => {
        setModalTitle(title);
        setModalTemplate(<p>{description}</p>);
        setModalIsActive(true);
    }
    // ativa o modal com formulario de adicionar tarefa
    const openFormAddTask = () => {
        setModalTitle("Criar nova tarefa");
        setModalTemplate(<AddTaskForm addTask={addNewTask} closeForm={()=> setModalIsActive(false)}/>);
        setModalIsActive(true);
    };
    return(
        <C.Container>
            <Modal
                title={modalTitle}
                template={modalTemplate}
                disableModal={() => setModalIsActive(false)}
                state={modalIsActive}
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
                                    showDescription={openDescription}
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
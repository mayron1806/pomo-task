import { useState } from "react";
import { useLocalState } from "../../hooks/useLocalState";

import { TaskItemType } from "../../types/taskItemType";
import { TaskListType } from "../../types/taskListType";
import Item from "../Item";
import Block from "../Block";
import Modal from "../Modal";
import AddTaskForm from "../AddTaskForm";
import Title from "../Title";

import * as C from "./style";

import { IoIosAddCircleOutline } from "react-icons/io";

import { Priority } from "../../enum/priority";

enum TaskListFilter{
    ALL,
    COMPLETE,
    INCOMPLETE
}
const TaskList = () => {
    // TAREFAS ---------------------------------------------------------------------------------
    // lista com todas tarefas
    const {
        state: allTasks,
        setState: setAllTasks
    } = useLocalState<TaskListType>("tasks" ,[]);

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
    const changeTaskState = (id: string, complete?: boolean, priority?: Priority) => {
        const taskIndex = allTasks.findIndex(task => task.id === id);
        if(taskIndex === -1) return;

        const new_tasks = [...allTasks];
        if(complete !== undefined) new_tasks[taskIndex].complete = complete;
        if(priority !== undefined) new_tasks[taskIndex].priority = priority;
        setAllTasks(new_tasks);
    }
    
    const deleteTask = (id: string) => {
        const index = allTasks.findIndex(task => task.id === id)
        if(index === -1) return;
        const new_tasks = [...allTasks];
        new_tasks.splice(index, 1);
        setAllTasks(new_tasks);
    }
    // conta as tarefas concluidas
    const complete_task_count = allTasks.filter(task => task.complete).length;
    // conta as tarefas a fazer
    const incomplete_task_count = allTasks.filter(task => !task.complete).length;


    // MODAL -----------------------------------------------------------------------------------
    const [modalIsActive, setModalIsActive] = useState<boolean>(false);
    const disableModal = () => setModalIsActive(false);
    const enableModal = () => setModalIsActive(true);

    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalTemplate, setModalTemplate] = useState<JSX.Element>();

    const openModal = (title: string, template: JSX.Element | undefined) => {
        setModalTitle(title);
        setModalTemplate(template);
        enableModal();
    }
    // ativa o modal com a descrição da tarefa
    const openDescription = (title: string, description: string | undefined) => {
        const template = description !== undefined ? <p>{description}</p> : undefined;
        openModal(title, template);
    }
    // ativa o modal com formulario de adicionar tarefa
    const openFormAddTask = () => {
        openModal("Criar nova tarefa", <AddTaskForm addTask={addNewTask} closeForm={() => disableModal()}/>);
    };
    
    return(
        <>
            <Modal
                title={modalTitle}
                template={modalTemplate}
                disableModal={() => disableModal()}
                isActive={modalIsActive}
            />
            <C.Header>
                <Title title="Tarefas"/>
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
                <C.FilterButton onClick={()=> showAllTasks()}>Mostrar todas tarefas</C.FilterButton>
            }
            <C.TableContainer>
                <table>
                    <C.TableHead>
                        <tr>
                            <th></th>
                            <th className="left">Nome</th>
                            <th>Prioridade</th>
                            <th></th>
                        </tr>
                    </C.TableHead>
                    <tbody>
                    { 
                        tasks().map((task)=> (
                            <Item 
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
        </>
    )
}
export default TaskList;
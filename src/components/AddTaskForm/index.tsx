import { FormEvent, useState, useRef, useEffect } from "react";

import { Priority as p } from "../../enum/priority";
import { TaskItemType } from "../../types/taskItemType";

import * as C from "./style";

import { v4 as getID } from "uuid";

import Label from "../Label";
import ErrorMessage from "../ErrorMessage";
import SendButton from "../SendButton";

type props = {
    addTask: (task: TaskItemType) => void,
    closeForm: () => void
}
const AddTaskForm = ({addTask, closeForm}: props) => {
    const [name, setName] = useState<string>("");
    const [priority, setPriority] = useState<p>(p.LOW);
    const [description, setDescription] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const nameInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(()=>{
        if(name.length > 0){
            nameInputRef.current?.classList.remove("error");
            nameInputRef.current?.focus();
            setErrorMessage("");
        }
    }, [name])

    const resetForm = () => {
        setName("");
        setPriority(0);
        setDescription("");
        setErrorMessage("");
    }
    
    const sendForm = (e: FormEvent) => {
        e.preventDefault();
        // se foi digitado um nome adiciona a tarefa
        if(name.length > 0){
            nameInputRef.current?.classList.remove("error");
            const task: TaskItemType = {
                id: getID(),
                complete: false,
                name: name,
                priority: priority,
                description: description
            }
            resetForm();
            addTask(task);
            closeForm();
            return;
        }
        nameInputRef.current?.classList.add("error");
        setErrorMessage("Você precisa peencher o campo nome.");
    }
    return(
        <form onSubmit={(e) => sendForm(e)}>
            <Label htmlFor="name">Nome da tarefa</Label>
            <C.Input
                ref={nameInputRef} 
                name="name"
                placeholder="Ex: Estudar Matemática"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <C.PriorityContainer>
                <Label className="inline" htmlFor="priority">Prioridade:</Label>
                <C.Select 
                    name="priority" 
                    onChange={e => setPriority(parseInt(e.target.value))}
                    value={priority}
                >
                    <option value={p.LOW}>Baixa</option>
                    <option value={p.MEDIUM}>Média</option>
                    <option value={p.HIGH}>Alta</option>
                </C.Select>
            </C.PriorityContainer>
            <Label htmlFor="description">Descrição</Label>
            <C.Text 
                maxLength={500} 
                rows={4} 
                name="description" 
                placeholder="Aprofundar em trigonometria..."
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
            <ErrorMessage>{errorMessage}</ErrorMessage>
            <SendButton value="Criar"/>
        </form>
    )
}
export default AddTaskForm;
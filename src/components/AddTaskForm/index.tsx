import { FormEvent, useState, useRef, useEffect } from "react";
import { Priority as p } from "../../enum/priority";
import { TaskItemType } from "../../types/taskItemType";
import * as C from "./style";
import { v4 as getID } from "uuid";

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
        }
    }, [name])

    const reset = () => {
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
            reset();
            addTask(task);
            closeForm();
            return;
        }
        nameInputRef.current?.classList.add("error");
        setErrorMessage("Você precisa peencher o campo nome.");
    }
    return(
        <C.Container onSubmit={(e) => sendForm(e)}>
            <C.Label htmlFor="name">Nome da tarefa</C.Label>
            <C.Input
                ref={nameInputRef} 
                type="text" 
                name="name"
                placeholder="Ex: Estudar Matemática"
                value={name}
                onChange={(e)=> setName(e.target.value)}
            />
            <div className="priority">
                <C.Label className="inline" htmlFor="priority">Prioridade:</C.Label>
                <C.Select 
                    name="name" 
                    onChange={e => setPriority(parseInt(e.target.value))}
                    value={priority}
                    defaultValue={0}
                >
                    <option value={p.LOW}>Baixa</option>
                    <option value={p.MEDIUM}>Média</option>
                    <option value={p.HIGH}>Alta</option>
                </C.Select>
            </div>
            <C.Label htmlFor="description">Descrição</C.Label>
            <C.Text 
                maxLength={500} 
                rows={4} 
                name="description" 
                placeholder="Aprofundar em trigonometria..."
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
            />
            <C.ErrorMessage>{errorMessage}</C.ErrorMessage>
            <C.Send type="submit" value="Criar"/>
        </C.Container>
    )
}
export default AddTaskForm;
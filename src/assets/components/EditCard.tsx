import {Todo, TodoDTO} from "../../App.tsx";
import axios from "axios";
import {useState} from "react";

type EditCardProps = {
    todo:Todo,
    todos:Todo[],
    setTodos: (todos:Todo[]) => void,
    editView:boolean
    isEditView: (editView:boolean) => void,
}

export default function EditCard(props:EditCardProps) {
    type Status = "OPEN" | "DOING" | "DONE"
    const statuses: Status[] = ["OPEN", "DOING", "DONE"]
    const [newDescription, setNewDescription] = useState<string>(props.todo.description)
    const [newStatus, setNewStatus] = useState<string>(props.todo.status)

function handleChangeInput(event:React.ChangeEvent<HTMLInputElement>){
    setNewDescription(event.target.value)
    event.target.value = newDescription
}
    function handleChangeSelect(event:React.ChangeEvent<HTMLSelectElement>){
        setNewStatus(event.target.value)
    }


function handleSubmit(event:React.FormEvent<HTMLFormElement>){
    event.preventDefault();
    const updatedTodo:TodoDTO = {description: newDescription, status: newStatus}
    axios.put("/api/todo/" + props.todo.id, updatedTodo).then(r => props.setTodos([...props.todos,r.data]))
    props.isEditView(!props.editView)
}
    return <>
        <div id="edit-card">
            <div id="card-text">
                <form onSubmit={handleSubmit}>
                    <label>edit description:</label>
                    <input id="edit-input" name="newDescription" onChange={handleChangeInput} defaultValue={props.todo.description} value={newDescription}/>
                    <label>edit status:</label>
                    <select name="newStatus" onChange={handleChangeSelect} defaultValue={props.todo.status}>
                        {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <button>save changes</button>
                </form>
            </div>
            <div id="card-buttons">
                <button onClick={() => props.isEditView(!props.editView)}>back</button>
            </div>
        </div>
    </>
}
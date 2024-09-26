import {Todo} from "../../App.tsx";
import axios from "axios";
import {useState} from "react";

export default function EditCard(props) {
    type Status = "OPEN" | "DOING" | "DONE"
    const statuses: Status[] = ["OPEN", "DOING", "DONE"]
    const [newDescription, setNewDescription] = useState<string>(props.todo.description)
    const [newStatus, setNewStatus] = useState<string>(props.todo.status)

function handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(name === "newDescription"){
        setNewDescription(value)
        target.value = newDescription
    }
    else
        setNewStatus(value)
}

function handleSubmit(event){
    event.preventDefault();
    const updatedTodo:Todo = {description: newDescription, status: newStatus}
    axios.put("/api/todo/" + props.todo.id, updatedTodo).then(r => props.setTodos([...props.todos,r.data]))
    props.isEditView(!props.editView)
}
    return <>
        <div id="edit-card">
            <div id="card-text">
                <form onSubmit={handleSubmit}>
                    <label>edit description:</label>
                    <input id="edit-input" name="newDescription" onChange={handleInputChange} defaultValue={props.todo.description} value={newDescription}/>
                    <label>edit status:</label>
                    <select name="newStatus" onChange={handleInputChange} defaultValue={props.todo.status}>
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
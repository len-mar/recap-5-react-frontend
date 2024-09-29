import {Todo, TodoDTO} from "../../App.tsx";
import axios from "axios";
import {useState} from "react";

type EditCardProps = {
    todo: Todo,
    todos: Todo[],
    setTodos: (todos: Todo[]) => void,
    editView: boolean
    isEditView: (editView: boolean) => void,
    getTodos: () => void
}
type Status = "OPEN" | "DOING" | "DONE"

export default function EditCard(props: EditCardProps) {
    const [newDescription, setNewDescription] = useState<string>(props.todo.description)
    const [newStatus, setNewStatus] = useState<string>(props.todo.status)
    // util array for select element
    const statuses: Status[] = ["OPEN", "DOING", "DONE"]

    // event handling functions
    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setNewDescription(event.target.value)
        event.target.value = newDescription
    }

    function handleChangeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
        setNewStatus(event.target.value)
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const updatedTodo: TodoDTO = {description: newDescription, status: newStatus}
        axios.put("/api/todo/" + props.todo.id, updatedTodo).then(r => props.setTodos([...props.todos, r.data]))
        props.isEditView(!props.editView)
        props.getTodos()
    }

    return <>
        <form onSubmit={handleSubmit}>
            <label>edit description:</label>
            <input id="edit-input" name="newDescription" onChange={handleChangeInput}
                   defaultValue={props.todo.description} value={newDescription}/>
            <label>edit status:</label>
            <select name="newStatus" onChange={handleChangeSelect} defaultValue={props.todo.status}>
                {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <button type="submit" className="edit-buttons">save changes</button>
            <button onClick={() => props.isEditView(!props.editView)} className="edit-buttons">back</button>
        </form>
    </>
}
import axios from "axios";
import {Todo, TodoDTO} from "../../App.tsx";

type TodoCardProps = {
    todo: Todo,
    todos: Todo[],
    setTodos: (todos: Todo[]) => void,
    detailView: boolean,
    editView: boolean
    isDetailView: (detailView: boolean) => void,
    isEditView: (editView: boolean) => void,
    getTodos: () => void
}

export default function TodoCard(props: TodoCardProps) {
    function advanceTodo() {
        // if status is open or doing, update status
        if (props.todo.status !== "DONE") {
            const newStatus: string = props.todo.status === "OPEN" ? "DOING" : "DONE"
            const updatedTodo: TodoDTO = {description: props.todo.description, status: newStatus}
            axios.put("/api/todo/" + props.todo.id, updatedTodo).then(r => props.setTodos([...props.todos, r.data]))
            props.getTodos()
        }
        // if status is done, delete to do
        else {
            axios.delete("/api/todo/" + props.todo.id)
            axios.get("/api/todo").then(r => props.setTodos(r.data))
            props.getTodos()
        }
    }

    // renders delete button based on status
    // button handlers toggle detail/edit view
    return <div id="card">
        <div id="card-text">
            <p>{props.todo.description}</p>
        </div>
        <div id="card-buttons">
            <button onClick={() => props.isDetailView(!props.detailView)}>details</button>
            <button onClick={() => props.isEditView(!props.editView)}>edit</button>
            {props.todo.status === "DONE" ? <button onClick={advanceTodo}>delete</button> :
                <button onClick={advanceTodo}>advance</button>}
        </div>
    </div>
}
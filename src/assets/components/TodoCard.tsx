import {useNavigate} from "react-router-dom";
import DetailsCard from "./DetailsCard.tsx";
import {useState} from "react";
import axios from "axios";
import {Todo} from "../../App.tsx";

export default function TodoCard(props) {
    const [detailView, isDetailView] = useState<boolean>(false)
    const [done, isDone] = useState<boolean>(props.todo.status === "DONE")

    function advanceTodo(){
       const newStatus:string = props.todo.status === "OPEN" ? "DOING" : "DONE"
        const updatedTodo:Todo = {description: props.todo.description, status: newStatus}
        if(props.todo.status === "DONE"){
            axios.delete("/api/todo/" + props.todo.id)
            axios.get("/api/todo").then(r => props.setTodos(r.data))
        }
        else{
            axios.put("/api/todo/" + props.todo.id, updatedTodo).then(r => props.setTodos([...props.todos,r.data]))
        }
        }


    return <>
        {detailView ?
            <DetailsCard todo={props.todo} isDetailView={isDetailView} detailView={detailView}/> :
            <div id="card">
                <div id="card-text">
                    <p>{props.todo.description}</p>
                </div>
                <div id="card-buttons">
                    <button onClick={() => isDetailView(!detailView)}>details</button>
                    <button>edit</button>
                    {done ? <button onClick={advanceTodo}>delete</button> : <button onClick={advanceTodo}>advance</button>}
                </div>
            </div>}

    </>
}
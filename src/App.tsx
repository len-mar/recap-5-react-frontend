import {useEffect, useState} from 'react'
import './App.css'
import Board from "./assets/components/Board.tsx";
import axios from "axios";

// TODO: refactor and abstract where it makes sense
// TODO: fix update of board when todo is updated


export type Todo = {
    description: string,
    status: string
    id: string
}

export type TodoDTO = {
    description: string,
    status: string
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    // get todos from api
    function getTodos(){
        axios.get("/api/todo").then(r => setTodos(r.data))
    }
    useEffect(() => {
        getTodos()
    }, [])

    return (
        <>
            <Board todos={todos} setTodos={setTodos} getTodos={getTodos}/>
        </>

    )
}

export default App

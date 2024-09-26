import {useEffect, useState} from 'react'
import './App.css'
import Board from "./assets/components/Board.tsx";
import axios from "axios";

// TODO: fix styling, primarily: table alignment
// TODO: make it pretty

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

    useEffect(() => {
        axios.get("/api/todo").then(r => setTodos(r.data))
    }, [todos])

    return (
        <>
            <Board todos={todos} setTodos={setTodos}/>
        </>

    )
}

export default App

import {useEffect, useState} from 'react'
import './App.css'
import Board from "./assets/components/Board.tsx";
import axios from "axios";

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

    // gets todos from api and update
    const fetchTodos = async () => {
        try {
            const response = await axios.get('/api/todo');
            setTodos(response.data);
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // gets todos once on load
    useEffect(() => {
        fetchTodos()
    }, [])

    return (
        <>
            <Board todos={todos} setTodos={setTodos} fetchTodos={fetchTodos}/>
        </>

    )
}

export default App

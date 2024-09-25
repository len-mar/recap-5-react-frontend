import {useEffect, useState} from 'react'
import './App.css'
import Board from "./assets/components/Board.tsx";
import axios from "axios";
import {Route, Routes} from "react-router-dom";

// TODO: PAGES
// TODO: all todos - board with three columns and input field
// TODO: post on the same page
// TODO: COMPONENTS
// TODO: board with cards with delete button when done
// TODO: input field
// TODO: edit component
//  details component
// TODO: ENDPOINTS
//  get all todos
//  get all todos by status
//  post new to do
//  delete to do
export type Todo = {
    description: string,
    status: string
}

function App() {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() => {
        axios.get("/api/todo").then(r => setTodos(r.data))
    }, [todos])

//     console.log(todos)

    return (
        <>
            <Board todos={todos} setTodos={setTodos}/>
        </>

    )
}

export default App

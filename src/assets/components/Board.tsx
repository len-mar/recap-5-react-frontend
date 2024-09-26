import {useEffect, useState} from "react";
import axios from "axios";
import {Todo} from "../../App.tsx";
import CardContainer from "./CardContainer.tsx";

// TODO: make this use regular props
// TODO: fix table element thing (td cant be child of thead)
export default function Board({todos, setTodos}) {
    const [todoTodos, setTodoTodos] = useState<Todo[]>([])
    const [doingTodos, setDoingTodos] = useState<Todo[]>([])
    const [doneTodos, setDoneTodos] = useState<Todo[]>([])

    function renderTodosByStatus(todos:Todo[]){
        setTodoTodos(todos.filter(t => t.status === "OPEN"))
        setDoingTodos(todos.filter(t => t.status === "DOING"))
        setDoneTodos(todos.filter(t => t.status === "DONE"))
    }
    useEffect(() => {
        renderTodosByStatus(todos)
    },[todos])

    const [input, setInput] = useState<string>()
    function addTodo(input){
        const newTodo:Todo = {description: input, status: "OPEN"}
        axios.post("/api/todo", newTodo).then(r => setTodos([...todos,r.data]))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addTodo(input)
        setInput("")
    };

    // console.log(todoTodos)
    return <>
        <h2>this is the board</h2>
        <table>
            <thead>
            <td>todo</td>
            <td>doing</td>
            <td>done</td>
            </thead>

            <tbody>
            <tr>
                <td>
                    {todoTodos.map(t => <CardContainer key={t.id} todo={t} todos={todos} setTodos={setTodos}/>)}
                </td>
                <td>
                    {doingTodos.map(t => <CardContainer key={t.id} todo={t} todos={todos} setTodos={setTodos}/>)}
                </td>
                <td>
                    {doneTodos.map(t => <CardContainer key={t.id} todo={t} todos={todos} setTodos={setTodos}/>)}
                </td>

            </tr>

            </tbody>


        </table>

        <form onSubmit={handleSubmit}>
            <input
                value={input}
                onChange={event => setInput(event.target.value)}
            />
            <button type={"submit"}>add todo</button>
        </form>
    </>
}
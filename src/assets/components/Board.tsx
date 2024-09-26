import {useEffect, useState} from "react";
import axios from "axios";
import {Todo, TodoDTO} from "../../App.tsx";
import CardContainer from "./CardContainer.tsx";

type BoardProps = {
    todos: Todo[],
    setTodos: (todos: Todo[]) => void,
}
// TODO: fix table element thing (td cant be child of thead)
export default function Board(props: BoardProps) {
    const [todoTodos, setTodoTodos] = useState<Todo[]>([])
    const [doingTodos, setDoingTodos] = useState<Todo[]>([])
    const [doneTodos, setDoneTodos] = useState<Todo[]>([])

    function renderTodosByStatus() {
        setTodoTodos(props.todos.filter((t: Todo) => t.status === "OPEN"))
        setDoingTodos(props.todos.filter((t: Todo) => t.status === "DOING"))
        setDoneTodos(props.todos.filter((t: Todo) => t.status === "DONE"))
    }

    useEffect(() => {
        renderTodosByStatus()
    }, [props.todos])

    const [input, setInput] = useState<string>("")

    function addTodo(input: string) {
        const newTodo:TodoDTO = {description: input, status: "OPEN"}
        axios.post("/api/todo", newTodo).then(r => props.setTodos([...props.todos, r.data]))
    }

    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        addTodo(input)
        setInput("")
    };

    // console.log(todoTodos)
    return <>
        <table>
            <caption>this is the board</caption>
            <thead>
            <tr>
                <th>todo</th>
                <th>doing</th>
                <th>done</th>
            </tr>
            </thead>

            <tbody>
            <tr>
                <td>
                    {todoTodos.map(t => <CardContainer key={t.id} todo={t} todos={props.todos}
                                                       setTodos={props.setTodos}/>)}
                </td>
                <td>
                    {doingTodos.map(t => <CardContainer key={t.id} todo={t} todos={props.todos}
                                                        setTodos={props.setTodos}/>)}
                </td>
                <td>
                    {doneTodos.map(t => <CardContainer key={t.id} todo={t} todos={props.todos}
                                                       setTodos={props.setTodos}/>)}
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
import DetailsCard from "./DetailsCard.tsx";
import {useState} from "react";
import EditCard from "./EditCard.tsx";
import TodoCard from "./TodoCard.tsx";
import {Todo} from "../../App.tsx";

type CardContainerProps = {
    todo: Todo,
    todos: Todo[],
    setTodos: (todos: Todo[]) => void,
    fetchTodos: () => void
}

export default function CardContainer(props: CardContainerProps) {
    const [detailView, isDetailView] = useState<boolean>(false)
    const [editView, isEditView] = useState<boolean>(false)

    // renders card based on view states
    return <>
        {detailView || editView ? detailView ?
                <DetailsCard todo={props.todo} isDetailView={isDetailView} detailView={detailView}/> :
                <EditCard fetchTodos={props.fetchTodos} todo={props.todo} isEditView={isEditView} editView={editView} todos={props.todos}
                          setTodos={props.setTodos}/> :
            <TodoCard fetchTodos={props.fetchTodos} detailView={detailView} isDetailView={isDetailView} isEditView={isEditView} editView={editView}
                      todo={props.todo} todos={props.todos} setTodos={props.setTodos}/>}
    </>
}
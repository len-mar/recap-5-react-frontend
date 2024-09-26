import DetailsCard from "./DetailsCard.tsx";
import {useState} from "react";
import EditCard from "./EditCard.tsx";
import TodoCard from "./TodoCard.tsx";

export default function CardContainer(props) {
    const [detailView, isDetailView] = useState<boolean>(false)
    const [editView, isEditView] = useState<boolean>(false)

    return <>
        {detailView || editView ? detailView ?
                <DetailsCard todo={props.todo} isDetailView={isDetailView} detailView={detailView}/> :
                <EditCard todo={props.todo} isEditView={isEditView} editView={editView} todos={props.todos} setTodos={props.setTodos}/> :
            <TodoCard detailView={detailView} isDetailView={isDetailView} isEditView={isEditView} editView={editView}  todo={props.todo} todos={props.todos} setTodos={props.setTodos}/>}


    </>
}
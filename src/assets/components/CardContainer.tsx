import {useNavigate} from "react-router-dom";
import DetailsCard from "./DetailsCard.tsx";
import {useState} from "react";
import axios from "axios";
import {Todo} from "../../App.tsx";
import EditCard from "./EditCard.tsx";
import TodoCard from "./TodoCard.tsx";

export default function CardContainer(props) {
    const [detailView, isDetailView] = useState<boolean>(false)
    const [editView, isEditView] = useState<boolean>(false)

    return <>
        {detailView || editView ? detailView ?
                <DetailsCard todo={props.todo} isDetailView={isDetailView} detailView={detailView}/> :
                <EditCard todo={props.todo} isEditView={isEditView} editView={editView}/> :
            <TodoCard detailView={detailView} isDetailView={isDetailView} todo={props.todo}/>}


    </>
}
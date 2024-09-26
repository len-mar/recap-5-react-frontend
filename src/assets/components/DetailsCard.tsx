import {Todo} from "../../App.tsx";

type DetailsCardProps = {
    todo:Todo,
    detailView:boolean,
    isDetailView: (detailView:boolean) => void,
}

export default function DetailsCard(props:DetailsCardProps) {

    return <>
        <div id="card">
            <div id="card-text">
                <p>Description: {props.todo.description}</p>
                <p>Status: {props.todo.status}</p>

            </div>
            <div id="card-buttons">
            <button onClick={() => props.isDetailView(!props.detailView)}>back</button>
            </div>

        </div>

    </>
}
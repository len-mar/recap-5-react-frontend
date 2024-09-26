export default function DetailsCard(props) {

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
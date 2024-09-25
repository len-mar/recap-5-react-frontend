export default function DetailsCard({todo, detailView, isDetailView}) {

    return <>
        <div id="card">
            <div id="card-text">
                <p>Description: {todo.description}</p>
                <p>Status: {todo.status}</p>

            </div>
            <div id="card-buttons">
            <button onClick={() => isDetailView(!detailView)}>back</button>
            </div>

        </div>

    </>
}
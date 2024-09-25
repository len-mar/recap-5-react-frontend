import {Todo} from "../../App.tsx";
import axios from "axios";

export default function EditCard(props) {
type Status = "OPEN" | "DOING" | "DONE"
    const statuses:Status[] = ["OPEN", "DOING", "DONE"]
    // TODO: add functionality to both description and status update field

    return <>
        <div id="edit-card">
            <div id="card-text">
                <label>edit description:</label>
                <input id="edit-input"/>
                <button>edit description</button>
                <label>edit status:</label>
                <select>
                    {statuses.filter(s => todo.status !== s).map(s => <option value={s}>{s}</option>)}
                </select>

            </div>
            <div id="card-buttons">
                <button onClick={() => isEditView(!editView)}>back</button>
            </div>

        </div>

    </>
}
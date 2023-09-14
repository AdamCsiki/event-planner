import { HtmlHTMLAttributes } from "react";
import { TaskModel } from "../../interfaces/TaskModel";

export default function Task(task: TaskModel) {
	return (
		<div>
			<h5>{task.name}</h5>
			<div>
				<h6>{task.taken}</h6> <h6>{task.user.name}</h6>
			</div>
		</div>
	);
}

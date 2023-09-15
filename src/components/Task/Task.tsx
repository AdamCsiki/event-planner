import { HtmlHTMLAttributes } from "react";
import { TaskModel } from "../../interfaces/TaskModel";

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	task: TaskModel;
}

export default function Task(props: ExtendedProps) {
	const { task } = props;
	return (
		<div>
			<h5>{task.name}</h5>
			<div>
				<h6>{task.taken}</h6> <h6>{task.user.name}</h6>
			</div>
		</div>
	);
}

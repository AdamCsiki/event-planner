import "./Task.style.css";
import { HtmlHTMLAttributes, Key } from "react";
import { TaskModel } from "../../interfaces/TaskModel";
import Button from "../Button/Button";
import { BsX } from "react-icons/bs";

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	task: TaskModel;
	boardId: number;
	removeTask: (boardId: number, index: number) => void;
}

export default function Task(props: ExtendedProps) {
	const { task, boardId, removeTask } = props;

	return (
		<div className="Task">
			<div className="task-header">
				<h6>{task.name}</h6>
				<button
					className="Button-x"
					onClick={() => {
						removeTask(boardId, task.id);
					}}
				>
					<BsX
						fontWeight={"bold"}
						fontSize={"medium"}
					/>
				</button>
			</div>
			<div className="task-content">
				<h6>{task.taken}</h6> <h6>{task.user ? task.user.name : ""}</h6>
			</div>
		</div>
	);
}

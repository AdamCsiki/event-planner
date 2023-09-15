import "./Board.style.css";
import { TaskModel } from "../../interfaces/TaskModel";
import Task from "../Task/Task";

interface ExtendedProps {
	key: number;
	name: string;
	tasks: TaskModel[];
	addTask?: () => void;
}

export default function Board(props: ExtendedProps) {
	const { name, tasks } = props;

	return (
		<ul
			className="Board"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					console.log("Board press");
				}
			}}
		>
			<div className="board-header">
				<h6>{name}</h6>
				<hr />
			</div>

			{tasks.map((task, index) => {
				return (
					<Task
						key={index}
						task={task}
					/>
				);
			})}
			<li>
				<button className="Button new-task-button">New Task</button>
			</li>
		</ul>
	);
}

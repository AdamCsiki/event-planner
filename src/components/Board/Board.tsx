import "./Board.style.css";
import { TaskModel } from "../../interfaces/TaskModel";
import Task from "../Task/Task";
import Button from "../Button/Button";
import { BsX } from "react-icons/bs";
import { useState } from "react";
import { TextField } from "@mui/material";

interface ExtendedProps {
	id: number;
	name: string;
	tasks: TaskModel[];
	addTask: (name: string) => void;
	removeTask: (boardId: number, index: number) => void;
	removeBoard: (boardId: number) => void;
}

export default function Board(props: ExtendedProps) {
	const { id, name, tasks, addTask, removeTask, removeBoard } = props;

	const [newTaskName, setNewTaskName] = useState<string | null>();

	return (
		<ul
			className="Board"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					console.log("Board press");
				}
			}}
		>
			<div className="board-header-wrapper">
				<div className="board-header">
					<h6>{name}</h6>
					<button
						className="Button-x"
						onClick={() => {
							removeBoard(id);
						}}
					>
						<BsX
							fontWeight={"bold"}
							fontSize={"medium"}
						/>
					</button>
				</div>
				<hr />
			</div>

			{tasks.map((task, index) => {
				return (
					<Task
						key={task.id}
						task={task}
						boardId={id}
						removeTask={removeTask}
					/>
				);
			})}
			<li>
				<div className="new-task-wrapper">
					<TextField
						placeholder="Task name"
						onChange={(e) => {
							setNewTaskName(e.target.value);
						}}
					/>
					<Button
						onClick={() => {
							if (newTaskName == null) {
								addTask("Task");
								return;
							}
							addTask(newTaskName);
						}}
					>
						Add
					</Button>
				</div>
			</li>
		</ul>
	);
}

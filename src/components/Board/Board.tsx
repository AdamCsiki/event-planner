import "./Board.style.css";
import { TaskModel } from "../../interfaces/TaskModel";
import Task from "../Task/Task";
import Button from "../Button/Button";
import { useState } from "react";
import {
	Divider,
	IconButton,
	TextField,
	Typography,
	IconButtonProps,
	Grid,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
		<div
			className="Board"
			onClick={(e) => {
				if (e.target === e.currentTarget) {
					console.log("Board press");
				}
			}}
		>
			<div className="board-header-wrapper">
				<div className="board-header">
					<Typography>{name}</Typography>
					<IconButton
						onClick={() => {
							removeBoard(id);
						}}
					>
						<CloseIcon />
					</IconButton>
				</div>
				<Divider />
			</div>

			<Grid
				sx={{
					height: "100%",
					overflowY: "scroll",
					scrollbarWidth: "thin",
				}}
			>
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
			</Grid>

			<div className="new-task-wrapper">
				<TextField
					size="small"
					placeholder="New Task"
					onChange={(e) => {
						setNewTaskName(e.target.value);
					}}
				/>
				<Button
					size="large"
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
		</div>
	);
}

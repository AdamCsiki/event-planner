import "./Board.style.css";
import { TaskModel } from "../../interfaces/TaskModel";
import Task from "../Task/Task";
import Button from "../Button/Button";
import { useState, useContext } from "react";
import {
	Divider,
	IconButton,
	TextField,
	Typography,
	IconButtonProps,
	Grid,
	Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
	createTaskRequest,
	deleteBoardRequest,
} from "../../requests/projectRequests";
import { useParams } from "react-router-dom";
import { ConfirmContext } from "../../context/ConfirmContext";

interface ExtendedProps {
	id: string;
	name: string;
	tasks: TaskModel[];
	refreshProject: () => void;
}

export default function Board(props: ExtendedProps) {
	const { projectId } = useParams();
	const { id, name, tasks, refreshProject } = props;

	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const [newTaskName, setNewTaskName] = useState<string | null>();

	const removeBoard = (boardId: string) => {
		deleteBoardRequest(projectId!, boardId).finally(() => {
			refreshProject();
			setNewTaskName("");
		});
	};

	const addTask = (boardId: string, taskName: string) => {
		createTaskRequest(projectId!, boardId, taskName).finally(() => {
			refreshProject();
			setNewTaskName("");
		});
	};

	return (
		<div className="Board">
			<Box>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography>{name}</Typography>
					<IconButton
						onClick={() => {
							setAcceptFunction(() => {
								removeBoard(id);
							});
							setOpen(true);
						}}
					>
						<CloseIcon />
					</IconButton>
				</Box>
				<Divider />
			</Box>

			<Grid
				sx={{
					height: "100%",
					overflowY: "auto",
					scrollbarWidth: "thin",
					padding: "0 1rem",
				}}
			>
				{tasks.map((task, index) => {
					return (
						<Task
							key={task.id}
							task={task}
							boardId={id}
							refreshProject={refreshProject}
						/>
					);
				})}
			</Grid>

			<div className="new-task-wrapper">
				<TextField
					size="small"
					placeholder="New Task"
					variant="standard"
					value={newTaskName}
					onChange={(e) => {
						setNewTaskName(e.target.value);
					}}
				/>
				<Button
					size="small"
					onClick={() => {
						if (newTaskName == null) {
							addTask(id, "Task");
							return;
						}
						addTask(id, newTaskName);
					}}
				>
					Add
				</Button>
			</div>
		</div>
	);
}

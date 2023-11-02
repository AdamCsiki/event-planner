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
	editBoardRequest,
} from "../../requests/projectRequests";
import { useParams } from "react-router-dom";
import { ConfirmContext } from "../../context/ConfirmContext";
import { BoardModel } from "../../interfaces/BoardModel";
import { EditableText } from "../EditableText/EditableText";

interface ExtendedProps {
	board: BoardModel;
	refreshProject: () => void;
}

export default function Board(props: ExtendedProps) {
	const { projectId } = useParams();
	const { board, refreshProject } = props;

	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const [newTaskName, setNewTaskName] = useState<string | null>();

	const removeBoard = (boardId: string) => {
		deleteBoardRequest(projectId!, boardId).finally(() => {
			refreshProject();
			setNewTaskName("");
		});
	};

	const editBoard = (board: BoardModel) => {
		editBoardRequest(projectId!, board).finally(() => {
			refreshProject();
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
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					ml: 1,
					mr: 1,
				}}
			>
				<EditableText
					onFinish={(value) => {
						editBoard({ ...board, name: value });
					}}
				>
					{board.name}
				</EditableText>
				<IconButton
					onClick={() => {
						setAcceptFunction(() => {
							removeBoard(board.id);
						});
						setOpen(true);
					}}
				>
					<CloseIcon />
				</IconButton>
			</Box>

			<Grid
				sx={{
					height: "100%",
					overflowY: "auto",
					scrollbarWidth: "thin",
					padding: "0 1rem",
				}}
			>
				{board.tasks.map((task, index) => {
					return (
						<Task
							key={task.id}
							task={task}
							boardId={board.id}
							refreshProject={refreshProject}
						/>
					);
				})}
			</Grid>

			<Box
				sx={{
					ml: 2,
					mr: 2,
					display: "flex",
					gap: 1,
				}}
			>
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
							addTask(board.id, "Task");
							return;
						}
						addTask(board.id, newTaskName);
					}}
				>
					Add
				</Button>
			</Box>
		</div>
	);
}

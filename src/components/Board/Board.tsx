import "./Board.style.css";
import { TaskModel } from "../../interfaces/TaskModel";
import Task from "../Task/Task";
import Button from "../Button/Button";
import { useState, useContext, useEffect } from "react";
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
	tasksCollectionRef,
} from "../../requests/projectRequests";
import { useParams } from "react-router-dom";
import { ConfirmContext } from "../../context/ConfirmContext";
import { BoardModel } from "../../interfaces/BoardModel";
import { EditableText } from "../EditableText/EditableText";
import { getDocs, onSnapshot, query } from "firebase/firestore";

interface ExtendedProps {
	board: BoardModel;
}

export default function Board(props: ExtendedProps) {
	const { projectId } = useParams();
	const { board } = props;

	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const [tasks, setTasks] = useState<TaskModel[]>([]);
	const [newTaskName, setNewTaskName] = useState<string>("");

	const getTasks = () => {
		// TODO
	};

	const removeBoard = (boardId: string) => {
		deleteBoardRequest(projectId!, boardId);
	};

	const editBoard = (boardEdit: BoardModel) => {
		editBoardRequest(projectId!, board.id, boardEdit);
	};

	const addTask = (boardId: string, taskName: string) => {
		createTaskRequest(projectId!, boardId, taskName);
	};

	useEffect(() => {
		const q = query(tasksCollectionRef(projectId!, board.id));

		const unsub = onSnapshot(q, (snapshot) => {
			const updatedTasks = snapshot.docs.map((snap) => {
				const data = snap.data();

				return {
					id: snap.id,
					title: data.title,
					details: data.details,
					progress: data.progress,
					open: data.open,
				} as TaskModel;
			});
			setTasks(updatedTasks);
		});

		return () => unsub();
	}, []);

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
						editBoard({ title: value } as BoardModel);
					}}
				>
					{board.title}
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
				{tasks.map((task, index) => {
					return (
						<Task
							key={task.id}
							task={task}
							boardId={board.id}
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

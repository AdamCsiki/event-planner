import "./Board.style.css";
import { TaskModel } from "../../interfaces/TaskModel";
import Task from "../Task/Task";
import Button from "../Button/Button";
import { useState, useContext, useEffect, MouseEvent, Fragment } from "react";
import {
	Divider,
	IconButton,
	TextField,
	Typography,
	IconButtonProps,
	Grid,
	Box,
	Menu,
	MenuItem,
	List,
	LinearProgress,
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
import {
	getDocs,
	getDocsFromCache,
	onSnapshot,
	query,
} from "firebase/firestore";
import { MoreHoriz, MoreVert } from "@mui/icons-material";
import { theme } from "../../Theme";
import {
	clearTasksFromLocalStorage,
	getTasksFromLocalStorage,
	setTasksToLocalStorage,
} from "../../services/ProjectService";

interface ExtendedProps {
	board: BoardModel;
}

export default function Board(props: ExtendedProps) {
	const { projectId } = useParams();
	const { board } = props;

	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const [tasks, setTasks] = useState<TaskModel[]>([]);
	const [newTaskName, setNewTaskName] = useState<string>("");

	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(menuAnchorEl);

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};
	const closeMenu = () => {
		setMenuAnchorEl(null);
	};

	const deleteBoard = () => {
		deleteBoardRequest(projectId!, board.id);
	};

	const editBoard = (boardEdit: BoardModel) => {
		editBoardRequest(projectId!, board.id, boardEdit);
	};

	const addTask = (boardId: string, taskName: string) => {
		createTaskRequest(projectId!, boardId, taskName);
	};

	useEffect(() => {
		if (!projectId) {
			return;
		}

		setTasks(getTasksFromLocalStorage(projectId, board.id));

		const tasksQuery = query(tasksCollectionRef(projectId, board.id));

		const unsub = onSnapshot(tasksQuery, (snapshot) => {
			snapshot.docChanges().forEach((change) => {
				const currentLocalTasks = getTasksFromLocalStorage(
					projectId,
					board.id
				);
				const taskIndex = currentLocalTasks.findIndex(
					(task) => task.id === change.doc.id
				);

				if (change.type == "added") {
					setTasks((current) => {
						if (taskIndex == -1) {
							return [
								...currentLocalTasks,
								{
									id: change.doc.id,
									...change.doc.data(),
								} as TaskModel,
							];
						}
						return [...current];
					});
				}

				if (change.type == "modified") {
					setTasks((current) => {
						const updatedTasks = current.map((task) => {
							if (task.id === change.doc.id) {
								return {
									id: change.doc.id,
									...change.doc.data(),
								} as TaskModel;
							}

							return task;
						});

						return updatedTasks;
					});
				}

				if (change.type == "removed") {
					setTasks((current) => {
						current.splice(taskIndex, 1);
						currentLocalTasks.splice(taskIndex, 1);
						return [...current];
					});
				}
			});
		});

		return unsub;
	}, []);

	useEffect(() => {
		if (!projectId) {
			return;
		}
		setTasksToLocalStorage(projectId, board.id, tasks);
	}, [tasks]);

	return (
		<Box
			sx={{
				backgroundColor: "white",
				borderRadius: 2,

				transition: "0.33s",

				":hover": {
					boxShadow: `10px 10px 0 0 ${theme.palette.primary.dark}`,
				},

				maxHeight: { sm: "100%" },

				width: { xs: "100%", sm: 300 },
				minWidth: { xs: "100%", sm: 300 },
				maxWidth: { xs: "100%", sm: 300 },

				mr: 2,
				pl: 0,

				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<EditableText
					variant="subtitle1"
					inputProps={{
						style: {
							width: 32,
							padding: 0,
							textAlign: "center",
							alignItems: "center",
						},
					}}
					onFinish={(value) => {
						editBoard({ order: Number(value) } as BoardModel);
					}}
				>
					{String(board.order) ?? -1}
				</EditableText>
				<EditableText
					onFinish={(value) => {
						editBoard({ title: value } as BoardModel);
					}}
				>
					{board.title}
				</EditableText>
				<IconButton
					onClick={(e) => {
						openMenu(e);
					}}
				>
					<MoreVert />
				</IconButton>
				<Menu
					open={menuOpen}
					anchorEl={menuAnchorEl}
					onClose={closeMenu}
				>
					<MenuItem>Details</MenuItem>
					<MenuItem
						onClick={() => {
							setAcceptFunction(() => {
								deleteBoard();
								closeMenu();
							});
							setOpen(true);
						}}
					>
						Delete
					</MenuItem>
				</Menu>
			</Box>

			<LinearProgress
				color="primary"
				value={board.progress ?? 0}
				variant="determinate"
			/>
			<List
				sx={{
					height: "100%",
					overflowY: "auto",
					scrollbarWidth: "thin",
					padding: "0 1rem",
					pt: 1,
				}}
				disablePadding
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
			</List>

			<Box
				sx={{
					pr: 2,
					pl: 2,
					pb: 2,

					display: "flex",
					gap: 1,
				}}
			>
				<TextField
					size="small"
					placeholder="New Task"
					variant="standard"
					sx={{ flexGrow: 1 }}
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
					ADD
				</Button>
			</Box>
		</Box>
	);
}

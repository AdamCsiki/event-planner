import "./Task.style.css";
import {
	HtmlHTMLAttributes,
	Key,
	useContext,
	useEffect,
	useState,
} from "react";
import { TaskModel } from "../../interfaces/TaskModel";
import {
	Box,
	Button,
	ButtonBase,
	Card,
	IconButton,
	LinearProgress,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { blueGrey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import {
	deleteTaskRequest,
	editTaskRequest,
	openTaskRequest,
} from "../../requests/projectRequests";
import { ConfirmContext } from "../../context/ConfirmContext";
import { EditableText } from "../EditableText/EditableText";

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	boardId: string;
	task: TaskModel;
	refreshProject: () => void;
}

export default function Task(props: ExtendedProps) {
	const { projectId } = useParams();
	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const { task, boardId, refreshProject } = props;

	const removeTask = (taskId: string) => {
		deleteTaskRequest(projectId!, boardId, taskId).then(() => {
			refreshProject();
		});
	};

	const openTask = (taskId: string) => {
		openTaskRequest(projectId!, boardId, taskId).then(() => {
			refreshProject();
		});
	};

	const editTask = (task: TaskModel) => {
		editTaskRequest(projectId!, boardId, task).then(() => {
			refreshProject();
		});
	};

	return (
		<Box
			sx={{
				minWidth: "10rem",

				backgroundColor: blueGrey[50],

				display: "flex",
				flexDirection: "column",

				textAlign: "initial",
				width: "100%",

				margin: "0 0 1.5rem 0",

				borderBottomRightRadius: 10,
				borderBottomLeftRadius: 10,
			}}
		>
			<LinearProgress
				color="primary"
				value={50}
				variant="determinate"
			/>
			<div className="task-header">
				<EditableText
					onFinish={(value) => {
						editTask({ ...task, name: value });
					}}
				>
					{task.name}
				</EditableText>
				<IconButton
					className="Button-x"
					onClick={() => {
						setAcceptFunction(() => {
							removeTask(task.id);
						});
						setOpen(true);
					}}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			</div>

			{task.open && (
				<Box
					sx={{
						minHeight: "fit-content",

						p: 1,

						borderTop: "1px solid #00000020",
						borderBottom: "1px solid #00000020",

						display: "flex",
					}}
				>
					<EditableText
						textFieldVariant="outlined"
						onFinish={(value) => {
							editTask({ ...task, details: value });
						}}
						sx={{
							minWidth: "100%",
						}}
					>
						{task.details.length == 0 ? "Details" : task.details}
					</EditableText>
				</Box>
			)}

			<Button
				size="small"
				sx={{ padding: "0.5rem" }}
				color={task.open ? "error" : "info"}
				onClick={() => {
					openTask(task.id);
				}}
			>
				{task.open ? "CLOSE" : "OPEN"}
			</Button>
		</Box>
	);
}

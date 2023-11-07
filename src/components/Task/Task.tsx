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
} from "../../requests/projectRequests";
import { ConfirmContext } from "../../context/ConfirmContext";
import { EditableText } from "../EditableText/EditableText";

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	boardId: string;
	task: TaskModel;
}

export default function Task(props: ExtendedProps) {
	const { projectId } = useParams();
	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const { task, boardId } = props;

	const [taskOpen, setTaskOpen] = useState(false);

	const removeTask = () => {
		deleteTaskRequest(projectId!, boardId, task.id);
	};

	const editTask = (taskEdit: any) => {
		editTaskRequest(projectId!, boardId, task.id, taskEdit);
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
						editTask({ title: value });
					}}
				>
					{task.title}
				</EditableText>
				<IconButton
					className="Button-x"
					onClick={() => {
						setAcceptFunction(() => {
							removeTask();
						});
						setOpen(true);
					}}
				>
					<CloseIcon fontSize="small" />
				</IconButton>
			</div>

			{taskOpen && (
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
							editTask({ details: value });
						}}
						sx={{
							minWidth: "100%",
						}}
					>
						{task.details && task.details.length == 0
							? "Details"
							: task.details}
					</EditableText>
				</Box>
			)}

			<Button
				size="small"
				sx={{ padding: "0.5rem" }}
				color={taskOpen ? "error" : "info"}
				onClick={() => {
					setTaskOpen((prev) => {
						return !prev;
					});
				}}
			>
				{taskOpen ? "CLOSE" : "OPEN"}
			</Button>
		</Box>
	);
}

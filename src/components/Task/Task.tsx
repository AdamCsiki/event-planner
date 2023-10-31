import "./Task.style.css";
import { HtmlHTMLAttributes, Key } from "react";
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
import { deleteTaskRequest } from "../../requests/projectRequests";

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	boardId: string;
	task: TaskModel;
	refreshProject: () => void;
}

export default function Task(props: ExtendedProps) {
	const { projectId } = useParams();

	const { task, boardId, refreshProject } = props;

	const removeTask = (boardId: string, taskId: string) => {
		deleteTaskRequest(projectId!, boardId, taskId).then(() => {
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
				<Typography
					color={"black"}
					sx={{ marginLeft: "0.5rem" }}
					variant="subtitle2"
				>
					{task.name}
				</Typography>
				<IconButton
					className="Button-x"
					onClick={() => {
						removeTask(boardId, task.id);
					}}
				>
					<CloseIcon />
				</IconButton>
			</div>

			<Button sx={{ padding: "0.5rem" }}>
				<Typography>Open</Typography>
			</Button>
		</Box>
	);
}

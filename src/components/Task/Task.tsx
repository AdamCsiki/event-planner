import "./Task.style.css";
import { HtmlHTMLAttributes, Key } from "react";
import { TaskModel } from "../../interfaces/TaskModel";
import {
	Button,
	ButtonBase,
	Card,
	IconButton,
	LinearProgress,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	task: TaskModel;
	boardId: number;
	removeTask: (boardId: number, index: number) => void;
}

export default function Task(props: ExtendedProps) {
	const { task, boardId, removeTask } = props;

	return (
		<Card
			sx={{
				display: "flex",
				flexDirection: "column",

				textAlign: "initial",
				width: "100%",

				margin: "0.75rem 0",

				gap: "1rem",
			}}
		>
			<div className="task-header">
				<Typography
					color={"black"}
					sx={{ padding: "0.5rem" }}
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
			<LinearProgress
				color="primary"
				value={Math.random() * 100}
				variant="determinate"
			/>
			<Button sx={{ padding: "0.5rem" }}>
				<Typography>Open</Typography>
			</Button>
		</Card>
	);
}

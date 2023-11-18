import "./Task.style.css";
import {
	HtmlHTMLAttributes,
	Key,
	MouseEvent,
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
	Divider,
	IconButton,
	LinearProgress,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { blue, blueGrey, grey } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import {
	deleteTaskRequest,
	editTaskRequest,
} from "../../requests/projectRequests";
import { ConfirmContext } from "../../context/ConfirmContext";
import { EditableText } from "../EditableText/EditableText";
import {
	ArrowDownward,
	Cancel,
	Check,
	KeyboardArrowDown,
	KeyboardArrowUp,
	MoreVert,
	Pause,
	PlayArrow,
} from "@mui/icons-material";

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	boardId: string;
	task: TaskModel;
}

export default function Task(props: ExtendedProps) {
	const { projectId } = useParams();
	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const [isTaskOpen, setIsTaskOpen] = useState<boolean>(false);

	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const menuOpen = Boolean(menuAnchorEl);

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};
	const closeMenu = () => {
		setMenuAnchorEl(null);
	};

	const { task, boardId } = props;

	const deleteTask = () => {
		deleteTaskRequest(projectId!, boardId, task.id);
	};

	const editTask = (taskEdit: any) => {
		editTaskRequest(projectId!, boardId, task.id, taskEdit);
	};

	return (
		<Box
			sx={{
				backgroundColor: "white",

				border: "2px solid black",
				borderColor: grey[300],
				borderRadius: 2,

				transition: "0.33s",

				minWidth: "10rem",

				margin: "0 0 1.5rem 0",

				display: "flex",
				flexDirection: "column",

				textAlign: "initial",
				width: "100%",

				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					width: `100%`,

					display: `flex`,
					justifyContent: `space-between`,
					alignItems: `center`,

					fontSize: `small`,
				}}
			>
				<EditableText
					textFieldVariant="outlined"
					onFinish={(value) => {
						if (value === task.title) {
							return;
						}
						editTask({ title: value });
					}}
				>
					{task.title}
				</EditableText>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<IconButton
						className="Button-x"
						onClick={() => {
							setIsTaskOpen(!isTaskOpen);
						}}
					>
						{isTaskOpen ? (
							<KeyboardArrowDown fontSize="small" />
						) : (
							<KeyboardArrowUp fontSize="small" />
						)}
					</IconButton>
					<IconButton
						onClick={(e) => {
							openMenu(e);
						}}
					>
						<MoreVert fontSize="small" />
					</IconButton>
				</Box>
				<Menu
					open={menuOpen}
					anchorEl={menuAnchorEl}
					onClose={closeMenu}
				>
					<MenuItem
						onClick={() => {
							setAcceptFunction(() => {
								deleteTask();
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
				// @ts-ignore
				color={
					task.status
						? {
								done: "success",
								active: "primary",
								paused: "warning",
								canceled: "error",
						  }[task.status]
						: "primary"
				}
				value={100}
				variant="determinate"
			/>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",

					p: 1,
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
					}}
				>
					<IconButton
						onClick={() => {
							if (task.status === "done") {
								return;
							}
							editTask({ status: "done" });
						}}
					>
						<Check
							fontSize="small"
							color="success"
						/>
					</IconButton>
					<IconButton
						onClick={() => {
							if (task.status === "active") {
								return;
							}
							editTask({ status: "active" });
						}}
					>
						<PlayArrow
							fontSize="small"
							color="info"
						/>
					</IconButton>
					<IconButton
						onClick={() => {
							if (task.status === "paused") {
								return;
							}
							editTask({ status: "paused" });
						}}
					>
						<Pause
							fontSize="small"
							color="warning"
						/>
					</IconButton>
				</Box>
			</Box>
			{isTaskOpen && (
				<EditableText
					variant="body2"
					textFieldVariant="outlined"
					containerSx={{
						transition: "0.33s",
						width: "100%",
						alignItems: "center",
					}}
					inputProps={{
						style: {
							maxWidth: "100%",
							width: "100%",
						},
					}}
					onFinish={(value) => {
						editTask({ details: value });
					}}
				>
					{task.details}
				</EditableText>
			)}
		</Box>
	);
}

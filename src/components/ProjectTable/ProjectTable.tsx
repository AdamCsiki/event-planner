import {
	Typography,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableProps,
	IconButton,
	CircularProgress,
	Box,
	Menu,
	MenuItem,
} from "@mui/material";
import {
	Close,
	Delete,
	Details,
	Edit,
	Info,
	MoreVert,
} from "@mui/icons-material";
import Link from "../Link/Link";
import { MouseEvent, useContext, useState } from "react";
import { ConfirmContext } from "../../context/ConfirmContext";
import { getDateFromSeconds } from "../../services/DateService";
import {
	deleteProjectRequest,
	editProjectRequest,
} from "../../requests/projectRequests";
import { ProjectContext } from "../../context/ProjectContext";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { EditableText } from "../EditableText/EditableText";

function ProjectTableRow(props: any) {
	const { project, index } = props;

	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);

	const [isEditEnabled, setIsEditEnabled] = useState<boolean>(false);

	const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
	const isMenuOpen = Boolean(menuAnchorEl);

	const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
		setMenuAnchorEl(event.currentTarget);
	};

	const closeMenu = () => {
		setMenuAnchorEl(null);
	};

	const deleteProject = () => {
		deleteProjectRequest(project.id);
	};

	const editProject = (project: any) => {
		editProjectRequest(project.id, project);
	};

	return (
		<TableRow key={index}>
			<TableCell>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					{isEditEnabled ? (
						<EditableText
							variant="h6"
							isActive
							onFinish={(value) => {
								editProject({ title: value });
							}}
							onFinal={() => {
								setIsEditEnabled(false);
							}}
						>
							{!project.title && project.title.length == 0
								? ""
								: project.title}
						</EditableText>
					) : (
						<Link
							to={`/projects/${project.id}`}
							variant="h6"
							sx={{
								color: "primary.light",
								":hover": {
									color: "primary.dark",
								},
							}}
						>
							{!project.title && project.title.length == 0
								? "No title"
								: project.title}
						</Link>
					)}
					<IconButton
						color={isEditEnabled ? "primary" : "default"}
						onClick={() => {
							setIsEditEnabled(!isEditEnabled);
						}}
					>
						<Edit fontSize="small" />
					</IconButton>
				</Box>
			</TableCell>
			<TableCell>
				{project.deadline
					? getDateFromSeconds(
							project.deadline.seconds
					  ).toDateString()
					: "Till the end of days..."}
			</TableCell>
			<TableCell>
				<Box
					sx={{
						position: "relative",
						display: "inline-flex",
						ml: 1,
					}}
				>
					<CircularProgress
						size={50}
						value={project.progress ?? 0}
						variant="determinate"
					/>
					<Box
						sx={{
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography variant="caption">
							{project.progress ?? 0}%
						</Typography>
					</Box>
				</Box>
			</TableCell>
			<TableCell>
				<IconButton onClick={openMenu}>
					<MoreVert />
				</IconButton>
				<Menu
					open={isMenuOpen}
					anchorEl={menuAnchorEl}
					onClose={closeMenu}
				>
					<MenuItem
						onClick={() => {
							setAcceptFunction(() => {
								deleteProject();
								closeMenu();
							});
							setOpen(true);
						}}
					>
						Delete
					</MenuItem>
				</Menu>
			</TableCell>
		</TableRow>
	);
}

interface ExtendedProps {
	projects: ProjectModel[];
}

export default function ProjectTable(props: ExtendedProps) {
	const { projects } = props;

	const { setAcceptFunction, setOpen, setMessage } =
		useContext(ConfirmContext);

	return (
		<TableContainer
			sx={{
				height: "100%",
			}}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography variant="h6">Title</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="h6">Deadline</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="h6">Progress</Typography>
						</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projects &&
						projects.map((project, index) => {
							return (
								<ProjectTableRow
									index={index}
									project={project}
								/>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

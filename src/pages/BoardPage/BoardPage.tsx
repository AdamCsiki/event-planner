import "./BoardPage.style.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { basePath } from "../../api/api";
import Link from "../../components/Link/Link";
import Button from "../../components/Button/Button";
import { TaskModel } from "../../interfaces/TaskModel";
import Board from "../../components/Board/Board";
import { BoardModel } from "../../interfaces/BoardModel";
import { Box, TextField, Typography } from "@mui/material";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { fetchPlus } from "../../api/fetchPlus";
import { getDaysUntilDate } from "../../services/DateService";
import { red } from "@mui/material/colors";
import {
	createBoardRequest,
	createTaskRequest,
	editProjectRequest,
} from "../../requests/projectRequests";
import LoadingPage from "../LoadingPage/LoadingPage";

export default function BoardPage() {
	const { projectId } = useParams();
	const location = useLocation();

	const navigate = useNavigate();

	const [userProject, setUserProject] = useState<Partial<ProjectModel>>();
	const [newBoardName, setNewBoardName] = useState("");

	const getProject = () => {
		const url = basePath + `/projects/${projectId}`;

		return fetchPlus(url, { method: "GET" })
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log("GET PROJECT");
				setUserProject(data);
			});
	};

	const editProject = (project: ProjectModel) => {
		editProjectRequest(project).then(() => {
			getProject();
		});
	};

	const createBoard = (name: string) => {
		if (name === null || name === undefined || name.length === 0) {
			return;
		}

		createBoardRequest(projectId!, name).then(() => {
			getProject();
			setNewBoardName("");
		});
	};

	useEffect(() => {
		getProject().catch((err) => {
			navigate("/projects");
		});
	}, []);

	if (!userProject) {
		return <LoadingPage />;
	}

	return (
		<div className="project-boards">
			{userProject.boards &&
				userProject.boards.map((board, index) => {
					return (
						<Board
							key={index}
							board={board}
							refreshProject={getProject}
						/>
					);
				})}
			<Box
				sx={{
					display: "flex",
					gap: 1,
				}}
			>
				<TextField
					variant="standard"
					placeholder="New Board"
					value={newBoardName}
					sx={{
						minWidth: "8rem",
					}}
					onChange={(e) => {
						setNewBoardName(e.target.value);
					}}
				/>
				<Button
					onClick={() => {
						createBoard(newBoardName);
					}}
					size="small"
				>
					Add
				</Button>
			</Box>
		</div>
	);
}

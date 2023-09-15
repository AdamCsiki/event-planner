import "./Project.style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { basePath } from "../../api/api";
import Link from "../../components/Link/Link";
import { ProjectModel } from "../../interfaces/ProjectModel";
import Button from "../../components/Button/Button";
import TaskList from "../../components/Board/Board";
import { UserModel } from "../../interfaces/UserModel";
import { TaskModel } from "../../interfaces/TaskModel";
import Input from "../../components/Input/Input";
import Task from "../../components/Task/Task";
import Board from "../../components/Board/Board";

export default function Project() {
	const { creator, projectName } = useParams();

	const [userProject, setUserProject] = useState<{
		title: string;
		details: string;
		boards: { [title: string]: TaskModel[] };
	}>({
		title: "Miau",
		details: "This contains some information about the project",
		boards: {},
	});

	const [newBoardName, setNewBoardName] = useState("");

	const getProject = () => {
		const url = basePath + `/${creator}/${projectName}`;
	};

	const createBoard = (name: string) => {
		if (name === null || name === undefined || name.length === 0) {
			return;
		}
		setUserProject((current) => {
			return {
				...current,
				boards: { ...current.boards, [name]: [] },
			};
		});
	};

	const createTask = (name: string) => {};

	useEffect(() => {}, []);

	return (
		<div className="Project">
			<header className="project-header">
				<h3>{projectName}</h3>
				<h6>
					<Link to={""}>{creator}</Link>
				</h6>
			</header>
			<div className="project-boards">
				{Object.keys(userProject.boards).map((key, index) => {
					const tasks: TaskModel[] = userProject.boards[key];

					return (
						<Board
							key={index}
							name={key}
							tasks={tasks}
						/>
					);
				})}
				<div className="project-new-board-container">
					<Input
						placeholder="Board name"
						onChange={(e) => {
							setNewBoardName(e.target.value);
						}}
					/>
					<Button
						onClick={() => {
							createBoard(newBoardName);
							setNewBoardName("");
						}}
					>
						Add
					</Button>
				</div>
			</div>
		</div>
	);
}

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
import { BoardModel } from "../../interfaces/BoardModel";

export default function Project() {
	const { creator, projectName } = useParams();

	const [userProject, setUserProject] = useState<{
		title: string;
		details: string;
		boards: BoardModel[];
	}>({
		title: "Miau",
		details: "This contains some information about the project",
		boards: [],
	});

	const [newBoardName, setNewBoardName] = useState("");

	const getProject = () => {
		const url = basePath + `/${creator}/${projectName}`;
	};

	const createBoard = (name: string) => {
		if (name === null || name === undefined || name.length === 0) {
			return;
		}

		const newBoard: BoardModel = {
			id: Math.floor(Math.random() * 100),
			name: name,
			tasks: [],
		};

		setUserProject((current) => {
			current.boards.push(newBoard);

			return {
				...current,
			};
		});
	};

	const removeBoard = (boardId: number) => {
		setUserProject((current) => {
			const index = current.boards.findIndex(
				(board) => board.id === boardId
			);

			current.boards.splice(index, 1);

			return { ...current };
		});
	};

	const createTask = (boardId: number) => {
		const newTask: TaskModel = {
			id: Math.floor(Math.random() * 10000),
			name: "Task",
			details: "",
			taken: false,
			user: null,
		};

		setUserProject((current) => {
			const index = current.boards.findIndex(
				(board) => board.id === boardId
			);

			current.boards[index].tasks.push(newTask);

			return {
				...current,
			};
		});
	};

	const removeTask = (boardId: number, id: number) => {
		setUserProject((current) => {
			const boardIndex = current.boards.findIndex(
				(board) => board.id === boardId
			);
			const index = current.boards[boardIndex].tasks.findIndex(
				(task) => task.id === id
			);

			if (index !== -1) {
				current.boards[boardIndex].tasks.splice(index, 1);
			}

			return { ...current };
		});
	};

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
				{userProject.boards.map((board, index) => {
					const { id, name, tasks } = board;

					return (
						<Board
							id={id}
							key={id}
							name={name}
							tasks={tasks}
							addTask={() => {
								createTask(id);
							}}
							removeTask={removeTask}
							removeBoard={removeBoard}
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
						}}
					>
						Add
					</Button>
				</div>
			</div>
		</div>
	);
}

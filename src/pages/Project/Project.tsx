import "./Project.style.css";
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

export default function Project() {
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
				setUserProject(data);
			});
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
			if (current?.boards) {
				current.boards.push(newBoard);
			}

			return {
				...current,
			};
		});
	};

	const removeBoard = (boardId: number) => {
		setUserProject((current) => {
			if (current?.boards) {
				const index = current.boards.findIndex(
					(board) => board.id === boardId
				);
				current.boards.splice(index, 1);
			}

			return { ...current };
		});
	};

	const createTask = (boardId: number) => {
		if (!userProject) {
			return;
		}

		const newTask: TaskModel = {
			id: Math.floor(Math.random() * 10000),
			name: "Task",
			details: "",
			taken: false,
			user: null,
		};

		setUserProject((current) => {
			if (current?.boards) {
				const index = current.boards.findIndex(
					(board) => board.id === boardId
				);

				current.boards[index].tasks.push(newTask);
			}

			return {
				...current,
			};
		});
	};

	const removeTask = (boardId: number, id: number) => {
		if (!userProject) {
			return;
		}

		setUserProject((current) => {
			if (current?.boards) {
				const boardIndex = current.boards.findIndex(
					(board) => board.id === boardId
				);
				const index = current.boards[boardIndex].tasks.findIndex(
					(task) => task.id === id
				);

				if (index !== -1) {
					current.boards[boardIndex].tasks.splice(index, 1);
				}
			}

			return { ...current };
		});
	};

	useEffect(() => {
		getProject().catch((err) => {
			navigate("/projects");
		});
	}, []);

	return (
		userProject && (
			<div className="project-boards">
				{userProject.boards &&
					userProject.boards.map((board, index) => {
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
					<TextField
						placeholder="New Board"
						onChange={(e) => {
							setNewBoardName(e.target.value);
						}}
					/>
					<Button
						onClick={() => {
							createBoard(newBoardName);
						}}
						size="large"
					>
						Add
					</Button>
				</div>
			</div>
		)
	);
}

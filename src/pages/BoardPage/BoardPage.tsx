import "./BoardPage.style.css";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import Board from "../../components/Board/Board";
import { BoardModel } from "../../interfaces/BoardModel";
import { Box, TextField, Typography } from "@mui/material";
import {
	boardsCollectionRef,
	createBoardRequest,
	getBoardsRequest,
} from "../../requests/projectRequests";
import { useProject } from "../../Layouts/Project/ProjectLayout";
import { onSnapshot, query } from "firebase/firestore";

export default function BoardPage() {
	const { projectId } = useParams();
	const { userProject, setUserProject, getProject } = useProject();

	const [projectBoards, setProjectBoards] = useState<BoardModel[]>();

	const [newBoardName, setNewBoardName] = useState("");

	const createBoard = (name: string) => {
		createBoardRequest(projectId!, name);
	};

	useEffect(() => {
		const q = query(boardsCollectionRef(projectId!));
		const unsub = onSnapshot(q, (snapshot) => {
			const snapBoards: BoardModel[] = snapshot.docs.map((snap) => {
				return {
					id: snap.id,
					...snap.data(),
				} as BoardModel;
			});
			setProjectBoards(snapBoards);
		});

		return () => unsub();
	}, []);

	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",

				display: "flex",
				flexDirection: { xs: "column", sm: "row" },
				justifyContent: "flex-start",
				alignItems: "flex-start",

				overflowX: "auto",

				padding: 2,
				gap: 3,
			}}
		>
			{projectBoards &&
				projectBoards.map((board, index) => {
					return (
						<Board
							key={index}
							board={board}
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
					onChange={(e) => {
						setNewBoardName(e.target.value);
					}}
					sx={{
						minWidth: "8rem",
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
		</Box>
	);
}

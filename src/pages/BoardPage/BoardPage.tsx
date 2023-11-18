import "./BoardPage.style.css";
import { MouseEvent, useContext, useEffect, useRef, useState } from "react";
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
import {
	DocumentData,
	QuerySnapshot,
	getDocsFromCache,
	onSnapshot,
	orderBy,
	query,
	where,
} from "firebase/firestore";
import {
	clearBoardsFromLocalStorage,
	getBoardsFromLocalStorage,
	setBoardsToLocalStorage,
	compareBoardByOrder,
} from "../../services/ProjectService";
import { blue } from "@mui/material/colors";

export default function BoardPage() {
	const { projectId } = useParams();

	const [boards, setBoards] = useState<BoardModel[]>([]);

	const [newBoardName, setNewBoardName] = useState("");

	const createBoard = (name: string) => {
		if (!boards) {
			return;
		}
		createBoardRequest(projectId!, name, boards.length + 1);
	};

	useEffect(() => {
		if (!projectId) {
			return;
		}

		setBoards(getBoardsFromLocalStorage(projectId));

		const boardsQuery = query(
			boardsCollectionRef(projectId),
			orderBy("order")
		);

		const unsub = onSnapshot(
			boardsQuery,
			(snapshot) => {
				snapshot.docChanges().forEach((change) => {
					const currentLocalBoards =
						getBoardsFromLocalStorage(projectId);
					const boardIndex = currentLocalBoards.findIndex(
						(board) => board.id === change.doc.id
					);

					if (change.type === "added") {
						setBoards((current) => {
							if (boardIndex == -1) {
								return [
									...current,
									{
										id: change.doc.id,
										...change.doc.data(),
									} as BoardModel,
								];
							}
							return [...current];
						});
					}

					if (change.type === "modified") {
						setBoards((current) => {
							const updatedBoards = current.map((board) => {
								if (board.id === change.doc.id) {
									return {
										id: change.doc.id,
										...change.doc.data(),
									} as BoardModel;
								}

								return board;
							});

							updatedBoards.sort(compareBoardByOrder);

							return updatedBoards;
						});
					}

					if (change.type === "removed") {
						setBoards((current) => {
							if (boardIndex !== -1) {
								current.splice(boardIndex, 1);
							}
							return [...current];
						});
					}
				});
			},
			(error) => {
				console.error(error);
			}
		);

		return unsub;
	}, []);

	useEffect(() => {
		if (!projectId) {
			return;
		}
		setBoardsToLocalStorage(projectId, boards);
	}, [boards]);

	return (
		<Box
			bgcolor={blue[100]}
			sx={{
				height: "100%",
				width: "100%",

				display: "flex",
				flexDirection: { xs: "column", sm: "row" },
				justifyContent: "flex-start",
				alignItems: "flex-start",

				overflowX: "auto",

				padding: 2,
				gap: { xs: 4, sm: 3 },
			}}
		>
			{boards &&
				boards.map((board, index) => {
					return (
						<Board
							key={index}
							board={board}
						/>
					);
				})}
			<Box
				sx={{
					width: { xs: "100%", sm: 300 },
					minWidth: { xs: "100%", sm: 300 },
					maxWidth: { xs: "100%", sm: 300 },

					display: "flex",

					gap: 1,
				}}
			>
				<TextField
					variant="standard"
					size="medium"
					sx={{
						width: "100%",
					}}
					placeholder="New Board"
					value={newBoardName}
					onChange={(e) => {
						setNewBoardName(e.target.value);
					}}
				/>
				<Button
					onClick={() => {
						createBoard(newBoardName);
					}}
				>
					ADD
				</Button>
			</Box>
		</Box>
	);
}

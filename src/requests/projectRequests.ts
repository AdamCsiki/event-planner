import { ProjectModel } from "./../interfaces/ProjectModel";
import { BoardModel } from "../interfaces/BoardModel";
import { TaskModel } from "../interfaces/TaskModel";
import { db } from "../config/firebase";
import {
	getDocs,
	getDocsFromCache,
	collection,
	doc,
	addDoc,
	query,
	where,
	documentId,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { ProjectFormModel } from "../interfaces/ProjectFormModel";
import { getAuth } from "firebase/auth";

export const projectsCollectionRef = () => {
	const user = getAuth().currentUser?.uid;

	return collection(db, `users/${user}/projects`);
};
export const boardsCollectionRef = (projectId: string) => {
	const user = getAuth().currentUser?.uid;

	return collection(db, `users/${user}/projects/${projectId}/boards`);
};

export const tasksCollectionRef = (projectId: string, boardId: string) => {
	const user = getAuth().currentUser?.uid;

	return collection(
		db,
		`users/${user}/projects/${projectId}/boards/${boardId}/tasks`
	);
};

export const getProjectsRequest = async () => {
	try {
		const data = await getDocs(projectsCollectionRef());

		const filtered = data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));

		return filtered as ProjectModel[];
	} catch (err) {
		return [] as ProjectModel[];
	}
};

export const getProjectRequest = async (projectId: string) => {
	const q = query(
		projectsCollectionRef(),
		where(documentId(), "==", projectId)
	);

	const projectDoc = (await getDocs(q)).docs[0];

	try {
		const filtered = {
			id: projectDoc.id,
			...projectDoc.data(),
		} as ProjectModel;

		return filtered;
	} catch (err) {
		return {} as ProjectModel;
	}
};

export const createProjectRequest = async (project: ProjectFormModel) => {
	return addDoc(projectsCollectionRef(), project);
};

export const editProjectRequest = async (projectId: string, project: any) => {
	const projectRef = doc(db, `projects`, projectId);
	const noIdProject: any = { ...project };
	delete noIdProject.id;

	try {
		await updateDoc(projectRef, noIdProject);
	} catch (error) {
		console.error("Error updating project:", error);
	}
};

export const deleteProjectRequest = async (projectId: string) => {
	const projectRef = doc(db, `projects`, projectId);

	try {
		await deleteDoc(projectRef);
	} catch (error) {
		console.error("Error updating project: ", error);
	}
};

/**
 * BOARDS
 */
export const getBoardsRequest = async (projectId: string) => {
	try {
		const data = await getDocs(boardsCollectionRef(projectId));
		const filtered = data.docs.map((doc) => ({
			...doc.data(),
			id: doc.id,
		}));
		console.log(filtered);
		return filtered as BoardModel[];
	} catch (err) {
		return [];
	}
};

export const createBoardRequest = (projectId: string, title: string) => {
	const newBoard = { title: title };

	try {
		addDoc(boardsCollectionRef(projectId), newBoard);
	} catch (error) {
		console.error("Error creating board: ", error);
	}
};

export const editBoardRequest = async (
	projectId: string,
	boardId: string,
	board: BoardModel
) => {
	const boardRef = doc(db, `projects/${projectId}/boards`, boardId);
	const noIdBoard: any = { ...board };
	delete noIdBoard.id;

	try {
		await updateDoc(boardRef, noIdBoard);
	} catch (error) {
		console.error("Error updating board:", error);
	}
};

export const deleteBoardRequest = (projectId: string, boardId: string) => {
	const boardRef = doc(db, `projects/${projectId}/boards`, boardId);

	try {
		deleteDoc(boardRef);
	} catch (error) {
		console.error("Error deleting board: ", error);
	}
};

/**
 * TASKS
 */

export const createTaskRequest = (
	projectId: string,
	boardId: string,
	title: string
) => {
	const newTask = { title: title };

	try {
		addDoc(tasksCollectionRef(projectId, boardId), newTask);
	} catch (error) {
		console.error("Error creating task: ", error);
	}
};

export const editTaskRequest = async (
	projectId: string,
	boardId: string,
	taskId: string,
	task: any
) => {
	const taskRef = doc(
		db,
		`projects/${projectId}/boards/${boardId}/tasks`,
		taskId
	);
	const noIdTask: any = { ...task };
	console.log(noIdTask);
	delete noIdTask.id;

	try {
		await updateDoc(taskRef, noIdTask);
	} catch (error) {
		console.error("Error updating task:", error);
	}
};

export const deleteTaskRequest = (
	projectId: string,
	boardId: string,
	taskId: string
) => {
	const taskRef = doc(
		db,
		`projects/${projectId}/boards/${boardId}/tasks`,
		taskId
	);

	try {
		deleteDoc(taskRef);
	} catch (error) {
		console.error("Error deleting task: ", error);
	}
};

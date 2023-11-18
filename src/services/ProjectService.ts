import { basePath } from "../api/api";
import { BoardModel } from "../interfaces/BoardModel";
import { ProjectModel } from "../interfaces/ProjectModel";
import { TaskModel } from "../interfaces/TaskModel";

export function setProjectsToLocalStorage(projects: ProjectModel[]) {
	localStorage.setItem("projects", JSON.stringify(projects));
}

export function getProjectsFromLocalStorage() {
	const stringProjects = localStorage.getItem("projects");
	if (stringProjects) {
		return JSON.parse(stringProjects);
	}
	return [];
}

export function setBoardsToLocalStorage(
	projectId: string,
	boards: BoardModel[]
) {
	localStorage.setItem(`${projectId}/boards`, JSON.stringify(boards));
}

export function getBoardsFromLocalStorage(projectId: string) {
	const stringBoards = localStorage.getItem(`${projectId}/boards`);
	if (stringBoards) {
		return JSON.parse(stringBoards) as BoardModel[];
	}
	return [] as BoardModel[];
}

export function clearBoardsFromLocalStorage(projectId: string) {
	localStorage.setItem(`${projectId}/boards`, JSON.stringify([]));
}

export function setTasksToLocalStorage(
	projectId: string,
	boardId: string,
	tasks: TaskModel[]
) {
	localStorage.setItem(
		`${projectId}/boards/${boardId}/tasks`,
		JSON.stringify(tasks)
	);
	// console.log(
	// 	"localTasks: ",
	// 	localStorage.getItem(`${projectId}/boards/${boardId}/tasks`)
	// );
}

export function getTasksFromLocalStorage(projectId: string, boardId: string) {
	const stringTasks = localStorage.getItem(
		`${projectId}/boards/${boardId}/tasks`
	);
	if (stringTasks) {
		return JSON.parse(stringTasks) as TaskModel[];
	}
	return [] as TaskModel[];
}

export function clearTasksFromLocalStorage(projectId: string, boardId: string) {
	localStorage.setItem(
		`${projectId}/boards/${boardId}/tasks`,
		JSON.stringify([])
	);
}

export function compareBoardByOrder(a: BoardModel, b: BoardModel) {
	if (a.order < b.order) {
		return -1;
	} else {
		return 1;
	}
}

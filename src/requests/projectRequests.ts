import { ProjectModel } from "./../interfaces/ProjectModel";
import { basePath } from "../api/api";
import { fetchPlus } from "../api/fetchPlus";
import { BoardModel } from "../interfaces/BoardModel";
import { TaskModel } from "../interfaces/TaskModel";

export const getProjectsRequest = () => {
	let url = basePath + "/projects";
	const controller = new AbortController();

	return fetchPlus(url, {
		method: "GET",
		signal: controller.signal,
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw new Error("FetchPlus failed.");
		})
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.log(err);
			return [];
		});
};

export const editProjectRequest = (project: ProjectModel) => {
	const url = basePath + `/projects/${project.id}/edit_project`;

	return fetchPlus(url, { method: "PUT", body: JSON.stringify(project) });
};

/**
 * BOARDS
 */

export const createBoardRequest = (projectId: string, name: string) => {
	const url = basePath + `/projects/${projectId}/add_board`;

	return fetchPlus(url, {
		method: "PUT",
		body: JSON.stringify({ boardName: name }),
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.error(err);
			return {};
		});
};

export const editBoardRequest = (projectId: string, board: BoardModel) => {
	const url =
		basePath + `/projects/${projectId}/boards/${board.id}/edit_board`;

	return fetchPlus(url, { method: "PUT", body: JSON.stringify(board) });
};

export const deleteBoardRequest = (projectId: string, boardId: string) => {
	const url = basePath + `/projects/${projectId}/boards/${boardId}/delete`;

	return fetchPlus(url, { method: "DELETE" });
};

/**
 * TASKS
 */

export const createTaskRequest = (
	projectId: string,
	boardId: string,
	name: string
) => {
	const url = basePath + `/projects/${projectId}/boards/${boardId}/add_task`;
	return fetchPlus(url, {
		method: "PUT",
		body: JSON.stringify({ taskName: name, taskDetails: "" }),
	})
		.then((res) => res.json())
		.then((data) => {
			return data;
		})
		.catch((err) => {
			console.error(err);
			return {};
		});
};

export const editTaskRequest = (
	projectId: string,
	boardId: string,
	task: TaskModel
) => {
	const url =
		basePath +
		`/projects/${projectId}/boards/${boardId}/tasks/${task.id}/edit_task`;
	console.log(task);
	return fetchPlus(url, { method: "PUT", body: JSON.stringify({ ...task }) });
};

export const openTaskRequest = (
	projectId: string,
	boardId: string,
	taskId: string
) => {
	const url =
		basePath +
		`/projects/${projectId}/boards/${boardId}/tasks/${taskId}/open`;

	return fetchPlus(url, { method: "PUT" });
};

export const deleteTaskRequest = (
	projectId: string,
	boardId: string,
	taskId: string
) => {
	const url =
		basePath +
		`/projects/${projectId}/boards/${boardId}/tasks/${taskId}/delete`;

	return fetchPlus(url, { method: "DELETE" });
};

import { basePath } from "../api/api";
import { fetchPlus } from "../api/fetchPlus";
import { BoardModel } from "../interfaces/BoardModel";

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

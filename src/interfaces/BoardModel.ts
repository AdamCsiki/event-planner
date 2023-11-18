import { TaskModel } from "./TaskModel";

export interface BoardModel {
	id: string;
	order: number;
	progress: number;
	title: string;
}

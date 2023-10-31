import { TaskModel } from "./TaskModel";

export interface BoardModel {
	id: string;
	name: string;
	tasks: TaskModel[];
}

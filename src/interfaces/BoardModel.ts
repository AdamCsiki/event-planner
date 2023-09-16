import { TaskModel } from "./TaskModel";

export interface BoardModel {
	id: number;
	name: string;
	tasks: TaskModel[];
}

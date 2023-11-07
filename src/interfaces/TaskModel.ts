import { UserModel } from "./UserModel";

export interface TaskModel {
	id: string;
	title: string;
	progress: number;
	details: string;
	taken: boolean;
	open: boolean;
}

import { UserModel } from "./UserModel";

export interface TaskModel {
	id: string;
	title: string;
	progress: number;
	status: "done" | "paused" | "canceled" | "active";
	details: string;
	taken: boolean;
	open: boolean;
}

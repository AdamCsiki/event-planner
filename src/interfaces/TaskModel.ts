import { UserModel } from "./UserModel";

export interface TaskModel {
	id: string;
	name: string;
	progress: number;
	details: string;
	taken: boolean;
	open: boolean;
	user: UserModel | null;
}

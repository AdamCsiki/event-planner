import { UserModel } from "./UserModel";

export interface TaskModel {
	id: string;
	name: string;
	progress: number;
	details: string;
	taken: boolean;
	user: UserModel | null;
}

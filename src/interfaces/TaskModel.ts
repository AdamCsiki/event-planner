import { UserModel } from "./UserModel";

export interface TaskModel {
	id: number;
	name: string;
	taken: boolean;
	user: UserModel | null;
}

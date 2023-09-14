import { UserModel } from "./UserModel";

export interface TaskModel {
	name: string;
	taken: boolean;
	user: UserModel;
}

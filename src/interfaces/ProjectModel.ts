import { UserModel } from "./UserModel";

export interface ProjectModel {
	title: string;
	creator: string;
	details?: string;
	maxParticipants: number;
	blackList: UserModel[];
	invitees: UserModel[];
	participants: UserModel[];
}

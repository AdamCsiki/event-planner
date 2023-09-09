import { User } from "./User";

export interface Event {
	title: string;
	creator: string;
	maxParticipants: number;
	blackList: User[];
	invitees: User[];
	participants: User[];
}

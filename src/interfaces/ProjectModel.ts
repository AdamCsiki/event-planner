import { Timestamp } from "firebase/firestore";
import { BoardModel } from "./BoardModel";
import { FireBaseDate } from "./FireBaseDate";

export interface ProjectModel {
	id: string;
	order: string;
	title: string;
	details: string;
	start_date: Timestamp;
	deadline: Timestamp;
	created_at: Timestamp;
	progress: number;
}

import { Timestamp } from "firebase/firestore";

export interface ProjectFormModel {
	title: string;
	details: string;
	start_date: Date;
	deadline: Date;
	created_at: Date;
	progress: number;
}

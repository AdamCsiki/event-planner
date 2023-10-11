import { BoardModel } from "./BoardModel";

export interface ProjectModel {
	id: number;
	name: string;
	details: string;
	deadLine: string;
	boards: BoardModel[];
}

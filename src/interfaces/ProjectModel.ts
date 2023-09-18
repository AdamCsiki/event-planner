import { BoardModel } from "./BoardModel";

export interface ProjectModel {
	id: number;
	title: string;
	details: string;
	boards: BoardModel[];
}

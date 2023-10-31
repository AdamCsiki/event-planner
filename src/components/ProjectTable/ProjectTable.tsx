import {
	Typography,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TableProps,
	IconButton,
	CircularProgress,
	Box,
} from "@mui/material";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { Close, Delete, Details, Info } from "@mui/icons-material";
import Link from "../Link/Link";
import ProjectPreviewModel from "../../interfaces/ProjectPreviewModel";
import { basePath } from "../../api/api";
import { fetchPlus } from "../../api/fetchPlus";
import AreYouSureModal from "../../modals/AreYouSureModal/AreYouSureModal";
import { useContext, useState } from "react";
import { ConfirmContext } from "../../context/ConfirmContext";

interface ExtendedProps {
	projects: ProjectPreviewModel[];
	refreshTable: () => void;
}

export default function ProjectTable(props: ExtendedProps) {
	const { projects, refreshTable } = props;

	const { setAcceptFunction, setOpen, setMessage } =
		useContext(ConfirmContext);

	const deleteProject = (id: number) => {
		const url = basePath + "/projects/delete/" + id;

		return fetchPlus(url, { method: "DELETE" }).then(() => {
			refreshTable();
		});
	};

	return (
		<TableContainer
			sx={{
				height: "100%",
			}}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography>Title</Typography>
						</TableCell>
						<TableCell>
							<Typography>Deadline</Typography>
						</TableCell>
						<TableCell>
							<Typography>Progress</Typography>
						</TableCell>
						<TableCell>
							<Typography>Options</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projects &&
						projects.map((project, index) => {
							return (
								<TableRow key={index}>
									<TableCell>
										<Link to={`/projects/${project.id}`}>
											<Typography>
												{project.name}
											</Typography>
										</Link>
									</TableCell>
									<TableCell>
										{new Date(
											project.deadLine
										).toLocaleDateString()}
									</TableCell>
									<TableCell>
										<Box
											sx={{
												position: "relative",
												display: "inline-flex",
												ml: 1,
											}}
										>
											<CircularProgress
												size={50}
												value={project.progress ?? 0}
												variant="determinate"
											/>
											<Box
												sx={{
													top: 0,
													left: 0,
													bottom: 0,
													right: 0,
													position: "absolute",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
												}}
											>
												<Typography variant="caption">
													{project.progress ?? 0}%
												</Typography>
											</Box>
										</Box>
									</TableCell>
									<TableCell>
										<IconButton
											onClick={(e) => {
												setOpen(true);
												setMessage(
													`Are you sure you want to delete ${project.name}?`
												);
												setAcceptFunction(() => {
													// deleteProject(project.id);
													console.log("DELETED");
												});
											}}
										>
											<Delete color="error" />
										</IconButton>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

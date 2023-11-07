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
import { getDateFromSeconds } from "../../services/DateService";
import { deleteProjectRequest } from "../../requests/projectRequests";

interface ExtendedProps {
	projects: ProjectModel[];
	refreshTable: () => void;
}

export default function ProjectTable(props: ExtendedProps) {
	const { projects, refreshTable } = props;

	const { setAcceptFunction, setOpen, setMessage } =
		useContext(ConfirmContext);

	const deleteProject = (projectId: string) => {
		deleteProjectRequest(projectId);
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
												{!project.title &&
												project.title.length == 0
													? "No title"
													: project.title}
											</Typography>
										</Link>
									</TableCell>
									<TableCell>
										{project.deadline
											? getDateFromSeconds(
													project.deadline.seconds
											  ).toDateString()
											: ""}
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
													`Are you sure you want to delete ${project.title}?`
												);
												setAcceptFunction(() => {
													deleteProject(project.id);
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

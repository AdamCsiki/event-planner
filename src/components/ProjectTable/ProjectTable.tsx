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
import { Close, Delete, Details, Info } from "@mui/icons-material";
import Link from "../Link/Link";
import { useContext, useState } from "react";
import { ConfirmContext } from "../../context/ConfirmContext";
import { getDateFromSeconds } from "../../services/DateService";
import { deleteProjectRequest } from "../../requests/projectRequests";
import { ProjectContext } from "../../context/ProjectContext";
import { ProjectModel } from "../../interfaces/ProjectModel";

interface ExtendedProps {
	projects: ProjectModel[];
}

export default function ProjectTable(props: ExtendedProps) {
	const { projects } = props;

	const { setAcceptFunction, setOpen, setMessage } =
		useContext(ConfirmContext);

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
							<Typography variant="h6">Title</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="h6">Deadline</Typography>
						</TableCell>
						<TableCell>
							<Typography variant="h6">Progress</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projects &&
						projects.map((project, index) => {
							return (
								<TableRow key={index}>
									<TableCell>
										<Link
											to={`/projects/${project.id}`}
											variant="h6"
											sx={{
												color: "primary.light",
												":hover": {
													color: "primary.dark",
												},
											}}
										>
											{!project.title &&
											project.title.length == 0
												? "No title"
												: project.title}
										</Link>
									</TableCell>
									<TableCell>
										{project.deadline
											? getDateFromSeconds(
													project.deadline.seconds
											  ).toDateString()
											: "Till the end of days..."}
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
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

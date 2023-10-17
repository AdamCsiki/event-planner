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
} from "@mui/material";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { Close, Delete } from "@mui/icons-material";
import Link from "../Link/Link";
import ProjectPreviewModel from "../../interfaces/ProjectPreviewModel";

interface ExtendedProps {
	projects: ProjectPreviewModel[];
}

export default function ProjectTable(props: ExtendedProps) {
	const { projects } = props;

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
										).toDateString()}
									</TableCell>
									<TableCell>
										<IconButton>
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

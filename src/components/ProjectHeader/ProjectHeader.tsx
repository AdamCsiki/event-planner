import { Box, Typography } from "@mui/material";
import IconButton from "../IconButton/IconButton";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { EditableText } from "../EditableText/EditableText";
import Link from "../Link/Link";
import { red } from "@mui/material/colors";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { editProjectRequest } from "../../requests/projectRequests";
import { Fragment, useContext, useEffect, useState } from "react";
import { getDateFromSeconds } from "../../services/DateService";
import { ProjectContext } from "../../context/ProjectContext";

export function ProjectHeader() {
	const { projectId } = useParams();
	const { projects } = useContext(ProjectContext);

	const navigate = useNavigate();

	const [project, setProject] = useState<ProjectModel>();

	const editProject = (editedProject: any) => {
		if (!projectId) {
			return;
		}
		editProjectRequest(projectId, editedProject);
	};

	useEffect(() => {
		setProject(projects.find((project) => project.id === projectId));
	}, [projects, projectId]);

	return (
		<header className="project-header">
			<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
				<IconButton
					onClick={() => {
						navigate(-1);
					}}
					color="primary"
				>
					<ArrowBack />
				</IconButton>
				{project ? (
					<EditableText
						variant="h5"
						inputProps={{
							style: {
								color: "white",
							},
						}}
						onFinish={(value) => {
							if (!project || value == "") {
								return;
							}
							editProject({ title: value });
						}}
					>
						{project?.title || ""}
					</EditableText>
				) : (
					<></>
				)}
			</Box>
			{project ? (
				<>
					<Box sx={{ display: "flex", gap: 1 }}>
						<Link
							sx={{ color: "white" }}
							to={`board`}
						>
							Board
						</Link>
						<Link
							sx={{ color: "white" }}
							to={`details`}
						>
							Details
						</Link>
					</Box>
					<Typography
						sx={{ display: { xs: "none", sm: "flex" } }}
						component={"span"}
					>
						Deadline{" "}
						<Typography
							color={red[500]}
							sx={{ mr: 0.5, ml: 0.5 }}
						>
							{project?.deadline &&
								getDateFromSeconds(
									project.deadline.seconds
								).toDateString()}
						</Typography>
					</Typography>
				</>
			) : (
				<Fragment></Fragment>
			)}
		</header>
	);
}

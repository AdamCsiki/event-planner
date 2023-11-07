import "./Project.style.css";
import { Box, Typography } from "@mui/material";
import {
	Outlet,
	useNavigate,
	useOutletContext,
	useParams,
} from "react-router-dom";
import Link from "../../components/Link/Link";
import {
	getDateFromSeconds,
	getDaysUntilDate,
} from "../../services/DateService";
import { red } from "@mui/material/colors";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { useEffect, useState } from "react";
import IconButton from "../../components/IconButton/IconButton";
import { ArrowBack } from "@mui/icons-material";
import {
	editProjectRequest,
	getProjectRequest,
} from "../../requests/projectRequests";
import { EditableText } from "../../components/EditableText/EditableText";

export interface ProjectContext {
	userProject: ProjectModel;
	setUserProject: React.Dispatch<
		React.SetStateAction<ProjectModel | undefined>
	>;
	getProject: () => void;
}

export function useProject() {
	return useOutletContext<ProjectContext>();
}

export function ProjectLayout() {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const [userProject, setUserProject] = useState<ProjectModel>();

	const getProject = () => {
		getProjectRequest(projectId!).then((data) => {
			setUserProject(data);
		});
	};

	const editProject = (project: any) => {
		editProjectRequest(projectId!, project);
	};

	useEffect(() => {
		getProject();
	}, []);

	if (!userProject) {
		return <div></div>;
	}

	return (
		<div className="Project">
			<header className="project-header">
				<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<IconButton
						onClick={() => {
							navigate("/projects");
						}}
						color="primary"
					>
						<ArrowBack />
					</IconButton>
					<EditableText
						variant="h5"
						sx={{ color: "white" }}
						inputProps={{
							style: {
								color: "white",
							},
						}}
						onFinish={(value) => {
							if (!userProject) {
								return;
							}
							editProject({ title: value });
						}}
					>
						{userProject!.title ?? ""}
					</EditableText>
				</Box>
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
					Deadline on{" "}
					<Typography
						color={red[500]}
						sx={{ mr: 0.5, ml: 0.5 }}
					>
						{userProject &&
							getDateFromSeconds(
								userProject.deadline.seconds
							).toDateString()}
					</Typography>
				</Typography>
			</header>
			<Outlet context={{ userProject, setUserProject, getProject }} />
		</div>
	);
}

import "./Project.style.css";
import { Box, Typography } from "@mui/material";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import Link from "../../components/Link/Link";
import { getDaysUntilDate } from "../../services/DateService";
import { red } from "@mui/material/colors";
import { ProjectModel } from "../../interfaces/ProjectModel";
import { useEffect, useState } from "react";
import { fetchPlus } from "../../api/fetchPlus";
import { basePath } from "../../api/api";
import IconButton from "../../components/IconButton/IconButton";
import { ArrowBack } from "@mui/icons-material";
import { editProjectRequest } from "../../requests/projectRequests";
import { EditableText } from "../../components/EditableText/EditableText";

export function ProjectLayout() {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const [userProject, setUserProject] = useState<ProjectModel>();

	const getProject = () => {
		const url = basePath + `/projects/${projectId}`;

		return fetchPlus(url, { method: "GET" })
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUserProject(data);
			})
			.catch(() => {
				navigate("/projects");
			});
	};

	const editProject = (project: ProjectModel) => {
		editProjectRequest(project).then(() => {
			getProject();
		});
	};

	useEffect(() => {
		getProject().catch((err) => {
			navigate("/projects");
		});
	}, []);

	return userProject ? (
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
							editProject({ ...userProject, name: value });
						}}
					>
						{userProject.name}
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
					Deadline in{" "}
					<Typography
						color={red[500]}
						sx={{ mr: 0.5, ml: 0.5 }}
					>
						{getDaysUntilDate(userProject!.deadLine!)}
					</Typography>
					days
				</Typography>
			</header>
			<Outlet />
		</div>
	) : (
		<div>
			<Outlet />
		</div>
	);
}

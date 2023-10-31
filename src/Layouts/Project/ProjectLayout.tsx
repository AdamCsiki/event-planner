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

export function ProjectLayout() {
	const { projectId } = useParams();
	const navigate = useNavigate();

	const [userProject, setUserProject] = useState<Partial<ProjectModel>>();

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

	useEffect(() => {
		getProject().catch((err) => {
			navigate("/projects");
		});
	}, []);

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
					<Typography variant="h5">{userProject!.name}</Typography>
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
	);
}

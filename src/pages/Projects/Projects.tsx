import "./Projects.style.css";
import { useContext, useEffect, useState, Fragment } from "react";
import { ProjectModel } from "../../interfaces/ProjectModel";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import { basePath } from "../../api/api";
import CreateProjectModal from "../../modals/CreateProjectModal/CreateProjectModal";
import { Typography } from "@mui/material";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import ProjectPreviewModel from "../../interfaces/ProjectPreviewModel";
import { fetchPlus } from "../../api/fetchPlus";
import AreYouSureModal from "../../modals/AreYouSureModal/AreYouSureModal";
import IconButton from "../../components/IconButton/IconButton";
import { Create, PlusOne, Refresh, Search } from "@mui/icons-material";
import { getProjectsRequest } from "../../requests/projectRequests";

export default function Projects() {
	const [projects, setProjects] = useState<ProjectPreviewModel[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

	const [loading, setLoading] = useState<boolean>(true);

	const searchProjects = () => {
		if (searchQuery) {
			return projects.filter((project) => {
				return project.name.includes(searchQuery);
			});
		}
		return;
	};

	const getProjects = () => {
		getProjectsRequest().then((data) => {
			setProjects(data);
		});
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className="ProjectsPage">
			<div className="projects-container">
				<div className="projects-header">
					<TextField
						placeholder="Title"
						variant="standard"
						onChange={(e) => {
							setSearchQuery(e.target.value);
						}}
					/>
					<IconButton onClick={() => searchProjects()}>
						<Search />
					</IconButton>
					<IconButton
						onClick={() => {
							setVisible(true);
						}}
					>
						<Create />
					</IconButton>
					<IconButton onClick={() => getProjects()}>
						<Refresh />
					</IconButton>
				</div>

				<ProjectTable
					projects={projects}
					refreshTable={getProjects}
				/>

				<CreateProjectModal
					visible={visible}
					onCancel={() => {
						setVisible(false);
					}}
					onFinish={() => {
						setVisible(false);
						getProjects();
					}}
				/>
			</div>
		</div>
	);
}

import "./Projects.style.css";
import { useContext, useEffect, useState, Fragment } from "react";
import { ProjectModel } from "../../interfaces/ProjectModel";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import { basePath } from "../../api/api";
import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import { Typography } from "@mui/material";
import TextField from "../../components/TextField/TextField";
import Button from "../../components/Button/Button";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import ProjectPreviewModel from "../../interfaces/ProjectPreviewModel";
import { fetchPlus } from "../../api/fetchPlus";
import AreYouSureModal from "../../components/AreYouSureModal/AreYouSureModal";

export default function Projects() {
	const [projects, setProjects] = useState<ProjectPreviewModel[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

	const [loading, setLoading] = useState<boolean>(true);

	const getProjects = () => {
		let url = basePath + "/projects";
		const controller = new AbortController();

		fetchPlus(url, {
			method: "GET",
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				}
				throw new Error("FetchPlus failed.");
			})
			.then((data) => {
				console.log(data);
				setProjects(data);
			})
			.catch((err) => {
				console.log(err);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	const searchProjects = () => {
		if (searchQuery) {
			return projects.filter((project) => {
				return project.name.includes(searchQuery);
			});
		}
		return;
	};

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className="ProjectsPage">
			<div className="projects-container">
				<div className="projects-header">
					<Typography
						variant="h4"
						component="h1"
						sx={{ color: "primary.main" }}
					>
						Projects
					</Typography>
					<TextField
						placeholder="Title"
						variant="standard"
						onChange={(e) => {
							setSearchQuery(e.target.value);
						}}
					/>
					<Button onClick={() => searchProjects()}>Search</Button>
					<Button
						onClick={() => {
							setVisible(true);
						}}
					>
						Create
					</Button>
					<Button onClick={() => getProjects()}>Refresh</Button>
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

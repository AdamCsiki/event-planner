import "./Projects.style.css";
import { useContext, useEffect, useState, Fragment } from "react";
import { ProjectModel } from "../../interfaces/ProjectModel";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import { basePath } from "../../api/api";
import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import { Typography } from "@mui/material";
import TextField from "../../components/TextField/TextField";
import { FetchContext } from "../../context/FetchContext";
import Button from "../../components/Button/Button";
import ProjectTable from "../../components/ProjectTable/ProjectTable";

export default function Projects() {
	const [projects, setProjects] = useState<ProjectModel[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

	const [loading, setLoading] = useState<boolean>(true);

	const { fetchPlus } = useContext(FetchContext);

	const searchClick = () => {
		let url = basePath + "/projects";
		const controller = new AbortController();

		if (searchQuery) {
			url += "?" + new URLSearchParams({ query: searchQuery });
		}

		fetchPlus(url, {
			method: "GET",
			mode: "cors",
			signal: controller.signal,
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

	useEffect(() => {
		searchClick();
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
							console.log(e.target.value);
							setSearchQuery(e.target.value);
						}}
					/>
					<Button onClick={() => searchClick()}>Search</Button>
					<Button
						onClick={() => {
							setVisible(true);
						}}
					>
						Create
					</Button>
				</div>

				<ProjectTable projects={projects} />

				<CreateProjectModal
					visible={visible}
					onCancel={() => {
						setVisible(false);
					}}
					onFinish={() => {
						setVisible(false);
					}}
				/>
			</div>
		</div>
	);
}

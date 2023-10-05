import "./Projects.style.css";
import { useContext, useEffect, useState } from "react";
import { ProjectModel } from "../../interfaces/ProjectModel";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import { basePath } from "../../api/api";
import Button from "../../components/Button/Button";
import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";
import { Divider, List, Typography } from "@mui/material";
import TextField from "../../components/TextField/TextField";
import { FetchContext } from "../../context/FetchContext";

export default function Projects() {
	const [projects, setProjects] = useState<ProjectModel[]>([
		{ id: 0, title: "Test", details: "Details", boards: [] },
	]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

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
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setProjects(data);
			})
			.catch((err) => {
				console.log(err);
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
						placeholder="Title / User"
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
				<List
					sx={{
						height: "100%",
					}}
				>
					{projects.length === 0 && (
						<Typography key={0}>No Projects :\</Typography>
					)}
					{projects.length > 0 &&
						projects.map((project, index) => (
							<>
								<ProjectListItem
									key={index}
									project={project}
								/>
								<Divider key={Math.random() * 1000} />
							</>
						))}
				</List>
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

import "./Projects.style.css";
import { useEffect, useState } from "react";
import { ProjectModel } from "../../interfaces/ProjectModel";
import ProjectListItem from "../../components/ProjectListItem/ProjectListItem";
import { basePath } from "../../api/api";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import CreateProjectModal from "../../components/CreateProjectModal/CreateProjectModal";

export default function Projects() {
	const [projects, setProjects] = useState<ProjectModel[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

	const searchClick = () => {
		let url = basePath + "/projects";

		if (searchQuery) {
			url += "?" + new URLSearchParams({ query: searchQuery });
		}

		fetch(url, { method: "GET", mode: "cors" })
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
					<h5>Projects</h5>
					<Input
						info_enabled={false}
						placeholder="Title / User"
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
				<ul className="projects-list">
					{projects.length === 0 && (
						<h5 className="no-projects">No Projects :\</h5>
					)}
					{projects.length > 0 &&
						projects.map((project, index) => (
							<ProjectListItem
								key={index}
								project={project}
							/>
						))}
				</ul>
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

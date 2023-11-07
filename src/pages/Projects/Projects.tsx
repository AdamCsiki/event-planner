import "./Projects.style.css";
import { useContext, useEffect, useState, Fragment } from "react";
import { ProjectModel } from "../../interfaces/ProjectModel";
import CreateProjectModal from "../../modals/CreateProjectModal/CreateProjectModal";
import TextField from "../../components/TextField/TextField";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import IconButton from "../../components/IconButton/IconButton";
import { Create, PlusOne, Refresh, Search } from "@mui/icons-material";
import { getProjectsRequest } from "../../requests/projectRequests";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Projects() {
	const [projects, setProjects] = useState<ProjectModel[]>([]);
	const [searchQuery, setSearchQuery] = useState<string | null>(null);
	const [visible, setVisible] = useState(false);

	const searchProjects = () => {
		if (searchQuery) {
			return projects.filter((project) => {
				return project.title.includes(searchQuery);
			});
		}
		return [];
	};

	const getProjects = () => {
		getProjectsRequest().then((data) => {
			setProjects(data);
		});
	};

	useEffect(() => {
		const projectsQuery = query(collection(db, "projects"));

		const unsub = onSnapshot(projectsQuery, (snapshot) => {
			console.log("Project snapshot");
			const snapProjects: ProjectModel[] = [];
			snapshot.docs.forEach((snap) => {
				snapProjects.push({
					...snap.data(),
					id: snap.id,
				} as ProjectModel);
			});
			setProjects(snapProjects);
		});

		return () => unsub();
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

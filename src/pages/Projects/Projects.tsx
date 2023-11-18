import "./Projects.style.css";
import { useContext, useEffect, useState, Fragment } from "react";
import { ProjectModel } from "../../interfaces/ProjectModel";
import CreateProjectModal from "../../modals/CreateProjectModal/CreateProjectModal";
import TextField from "../../components/TextField/TextField";
import ProjectTable from "../../components/ProjectTable/ProjectTable";
import IconButton from "../../components/IconButton/IconButton";
import { Add, Create, Refresh, Search } from "@mui/icons-material";
import { ProjectContext } from "../../context/ProjectContext";
import { onSnapshot, query } from "firebase/firestore";
import { projectsCollectionRef } from "../../requests/projectRequests";
import { Box } from "@mui/material";

export function Projects() {
	const { projects, getProjects, setProjects } = useContext(ProjectContext);

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

	return (
		<Box
			sx={{
				width: "100%",

				border: "1px solid black",
				p: 1,

				display: "flex",
				flexDirection: "column",

				flexGrow: 1,
			}}
		>
			<Box
				component={"header"}
				sx={{
					p: 1,
				}}
			>
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
					<Add />
				</IconButton>
				<IconButton onClick={() => getProjects()}>
					<Refresh />
				</IconButton>
			</Box>

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
		</Box>
	);
}

import "./Project.style.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { basePath } from "../../api/api";
import Link from "../../components/Link/Link";
import { ProjectModel } from "../../interfaces/ProjectModel";
import Button from "../../components/Button/Button";

export default function Project() {
	const { creator, projectName } = useParams();
	const [userProject, setUserProject] = useState({
		title: "Miau",
		details: "This contains some information about the project",
		participants: [],
		taskLists: [],
	});

	const getProject = () => {
		const url = basePath + `/${creator}/${projectName}`;
	};

	useEffect(() => {}, []);

	return (
		<div className="Project">
			<header className="project-header">
				<h3>{projectName}</h3>
				<h6>
					<Link to={""}>{creator}</Link>
				</h6>
			</header>
			<div className="project-task-lists">
				<ul className="task-list">
					<li>
						<button className="new-task-button">New Task</button>
					</li>
				</ul>
			</div>
		</div>
	);
}

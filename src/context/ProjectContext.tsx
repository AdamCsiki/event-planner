import {
	ReactNode,
	createContext,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { ProjectModel } from "../interfaces/ProjectModel";
import {
	getProjectsRequest,
	projectsCollectionRef,
} from "../requests/projectRequests";
import { onSnapshot, query } from "firebase/firestore";
import { Outlet } from "react-router-dom";
import {
	getProjectsFromLocalStorage,
	setProjectsToLocalStorage,
} from "../services/ProjectService";

interface ContextProps {
	projects: ProjectModel[];
	setProjects: (projects: ProjectModel[]) => void;
	getProjects: () => void;
}

export const ProjectContext = createContext<ContextProps>({
	projects: [],
	setProjects: (projects: ProjectModel[]) => {},
	getProjects: () => {},
});

export function ProjectProvider() {
	const [projects, _setProjects] = useState<ProjectModel[]>([]);

	const projectsRef = useRef(projects);
	const setProjects = (projects: ProjectModel[]) => {
		projectsRef.current = projects;
		_setProjects(projects);
	};

	const getProjects = () => {
		getProjectsRequest().then((data) => {
			setProjects(data);
			setProjectsToLocalStorage(data);
		});
	};

	useEffect(() => {
		const projectsQuery = query(projectsCollectionRef());

		const unsub = onSnapshot(
			projectsQuery,
			{
				includeMetadataChanges: true,
			},
			async (snapshot) => {
				let snapProjects = snapshot.docs.map((doc) => {
					return {
						id: doc.id,
						...doc.data(),
					} as ProjectModel;
				});

				if (snapProjects.length == 0) {
					// Snapshot returns empty array on refresh
					// And it doesnt return anything afterwards.
					setProjects(getProjectsFromLocalStorage());
					return;
				}

				setProjects(snapProjects);
			},
			(error) => {
				console.error(error);
			}
		);

		return unsub;
	}, []);

	return (
		<ProjectContext.Provider
			value={{
				projects,
				setProjects: setProjects,
				getProjects: getProjects,
			}}
		>
			<Outlet />
		</ProjectContext.Provider>
	);
}

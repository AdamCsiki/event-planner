import "./Project.style.css";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { ProjectContext, ProjectProvider } from "../../context/ProjectContext";
import { ProjectHeader } from "../../components/ProjectHeader/ProjectHeader";
import { Box } from "@mui/material";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { getDoc, getDocs, onSnapshot, query } from "firebase/firestore";
import { projectsCollectionRef } from "../../requests/projectRequests";
import { ProjectModel } from "../../interfaces/ProjectModel";

export function ProjectLayout() {
	return (
		<Box
			sx={{
				flexGrow: 1,

				display: "flex",
				flexDirection: "column",
				justifyContent: "flex-start",
				alignItems: "flex-start",

				overflow: `hidden`,
			}}
		>
			<ProjectHeader />
			<Outlet />
		</Box>
	);
}

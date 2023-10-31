import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import Layout, { LayoutNoFooter } from "../Layouts/Layout/Layout";
import Home from "../pages/Home/Home";
import Events from "../pages/Projects/Projects";
import Event from "../pages/BoardPage/BoardPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UserPage from "../pages/UserPage/UserPage";
import Board from "../pages/BoardPage/BoardPage";
import { ProjectLayout } from "../Layouts/Project/ProjectLayout";

export default function Routing() {
	return (
		<BrowserRouter basename="/project-planner/">
			<Routes>
				<Route element={<Layout />}>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path="user/:name"
						element={<UserPage />}
					/>
				</Route>
				<Route element={<LayoutNoFooter />}>
					<Route
						path="login"
						element={<LoginPage />}
					/>
					<Route
						path="register"
						element={<RegisterPage />}
					/>
					<Route
						path="projects"
						element={<AuthenticatedRoute />}
					>
						<Route
							index
							element={<Events />}
						/>
						<Route
							path=":projectId"
							element={<ProjectLayout />}
						>
							<Route
								index
								element={<Board />}
							/>
							<Route
								path="board"
								element={<Board />}
							/>
							<Route path="details" />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

import { HashRouter, Routes, Route } from "react-router-dom";
import Layout, { LayoutNoFooter } from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Events from "../pages/Projects/Projects";
import Event from "../pages/Project/Project";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UserPage from "../pages/UserPage/UserPage";

export default function Routing() {
	const basename =
		document.querySelector("base")?.getAttribute("href") ?? "/";

	return (
		<HashRouter basename={basename}>
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
							path=":creator/:projectName"
							element={<Event />}
						/>
					</Route>
				</Route>
			</Routes>
		</HashRouter>
	);
}

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Events from "../pages/Projects/Projects";
import Event from "../pages/Project/Project";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";

export default function Routing() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					path=""
					element={<Layout />}
				>
					<Route
						index
						element={<Home />}
					/>
					<Route
						path="login"
						element={<LoginPage />}
					/>
					<Route
						path="register"
						element={<RegisterPage />}
					/>
					<Route path="projects">
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
		</BrowserRouter>
	);
}

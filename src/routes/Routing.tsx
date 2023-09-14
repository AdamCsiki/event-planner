import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import Home from "../pages/Home/Home";
import Events from "../pages/Projects/Projects";
import Event from "../pages/Project/Project";

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

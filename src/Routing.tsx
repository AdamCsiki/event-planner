import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/Home/Home";
import Events from "./pages/Events/Events";
import Event from "./pages/Event/Event";

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
					<Route path="events">
						<Route
							index
							element={<Events />}
						/>
						<Route
							path=":event"
							element={<Event />}
						/>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

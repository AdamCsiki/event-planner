import "./Layout.style.css";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export function LayoutNoFooter() {
	return (
		<>
			<Header />

			<main id="MainPage">
				<Outlet />
			</main>
		</>
	);
}

export default function Layout() {
	return (
		<>
			<Header />

			<main id="MainPage">
				<Outlet />
			</main>

			<Footer />
		</>
	);
}

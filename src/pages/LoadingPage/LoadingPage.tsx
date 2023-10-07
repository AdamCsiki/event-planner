import { CircularProgress } from "@mui/material";
import "./LoadingPage.style.css";

export default function LoadingPage() {
	return (
		<div className="LoadingPage">
			<CircularProgress />
		</div>
	);
}

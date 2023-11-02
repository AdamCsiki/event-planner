import { Box, CircularProgress } from "@mui/material";
import "./LoadingPage.style.css";

export default function LoadingPage() {
	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",

				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Box>
	);
}

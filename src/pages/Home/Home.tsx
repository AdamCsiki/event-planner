import "./Home.style.css";
import poster from "../../img/Shotcut_00_00_00_000.png";
import { Typography } from "@mui/material";

export default function Home() {
	return (
		<div className="Home">
			<div className="video-wrapper">
				<video
					id="background-video"
					poster={poster}
					loop={true}
					muted={true}
					autoPlay={true}
					playsInline={true}
				>
					<source
						src={
							"https://firebasestorage.googleapis.com/v0/b/project-planner-38230.appspot.com/o/pufi_background.mp4?alt=media&token=54880849-b52a-4c16-806f-cde044bdc9b1"
						}
						type="video/mp4"
					/>
				</video>
			</div>
			<div className="home-top">
				<Typography variant="h1">Welcome to EPlanner</Typography>
				<Typography variant="h6">
					I didn't know what to add as background
				</Typography>
				<Typography
					sx={{
						top: "-20px",
						position: "relative",
					}}
				>
					So here is my cat Pufi
				</Typography>
			</div>
		</div>
	);
}

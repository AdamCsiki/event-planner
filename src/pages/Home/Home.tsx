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
				<Typography variant="h2">Plan ahead</Typography>
				<Typography variant="h4">
					and never worry about tomorrow
				</Typography>
			</div>
		</div>
	);
}

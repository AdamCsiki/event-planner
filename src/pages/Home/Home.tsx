import "./Home.style.css";
import poster from "../../img/Shotcut_00_00_00_000.png";
import { Typography } from "@mui/material";

export default function Home() {
	let video = null;

	// the background mp4 is a bit too big for github
	try {
		import("../../video/pufi_background2.mp4").then((video_) => {
			video = video_;
		});
	} catch (e) {
		console.error(e);
	}

	return (
		<div className="Home">
			<div className="video-wrapper">
				{video ? (
					<video
						id="background-video"
						poster={poster}
						loop={true}
						muted={true}
						autoPlay={true}
						playsInline={true}
					>
						<source
							src={video}
							type="video/mp4"
						/>
					</video>
				) : (
					<img
						src={poster}
						id="background-video"
						alt="kitty"
					/>
				)}
			</div>
			<div className="home-top">
				<Typography
					variant="h2"
					sx={{
						fontWeight: 700,
						// textShadow:
						// 	"-1px -1px 0 var(--black), 1px -1px 0 var(--black), -1px 1px 0 var(--black), 1px 1px 0 var(--black)",
					}}
				>
					Plan ahead
				</Typography>
				<Typography
					variant="h4"
					sx={{
						// textShadow:
						// 	"-1px -1px 0 var(--black), 1px -1px 0 var(--black), -1px 1px 0 var(--black), 1px 1px 0 var(--black)",
						textAlign: "right",
					}}
				>
					and never worry about tomorrow
				</Typography>
			</div>
		</div>
	);
}

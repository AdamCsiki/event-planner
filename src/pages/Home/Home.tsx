import "./Home.style.css";
import video from "../../video/pufi_background2.mp4";
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
						src={video}
						type="video/mp4"
					/>
				</video>
			</div>
			<div className="home-top">
				<div className="home-up">
					<Typography
						variant="h3"
						sx={{
							textShadow:
								"-1px -1px 0 var(--black), 1px -1px 0 var(--black), -1px 1px 0 var(--black), 1px 1px 0 var(--black)",
						}}
					>
						Always plan...
					</Typography>
				</div>

				<div className="home-down">
					<Typography
						variant="h3"
						sx={{
							textShadow:
								"-1px -1px 0 var(--black), 1px -1px 0 var(--black), -1px 1px 0 var(--black), 1px 1px 0 var(--black)",
							textAlign: "right",
						}}
					>
						...and never worry about tomorrow.
					</Typography>
				</div>
			</div>
		</div>
	);
}

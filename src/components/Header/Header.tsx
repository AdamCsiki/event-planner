import "./Header.style.css";
import Navbar from "../Navbar/Navbar";
import Link from "../Link/Link";
import { SwipeableDrawer, Typography } from "@mui/material";
import { Dehaze } from "@mui/icons-material";
import IconButton from "../IconButton/IconButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

export default function Header() {
	const auth = useSelector((state: RootState) => state.auth);

	const [navOpen, setNavOpen] = useState<boolean>(false);

	return (
		<header className="Header">
			<Link to={"/"}>
				<Typography
					sx={{ color: "primary.contrastText" }}
					variant="h4"
				>
					EPlanner
				</Typography>
			</Link>
			<div className="header-nav">
				<Link to={"/"}>
					<Typography
						variant="h6"
						sx={{ color: "primary.contrastText" }}
					>
						Home
					</Typography>
				</Link>
				{!auth.isLoggedIn ? (
					<Link to={"/login"}>
						<Typography
							variant="h6"
							sx={{ color: "primary.contrastText" }}
						>
							Login
						</Typography>
					</Link>
				) : (
					<Link to={`/projects`}>
						<Typography
							variant="h6"
							sx={{ color: "primary.contrastText" }}
						>
							Projects
						</Typography>
					</Link>
				)}
				<IconButton
					sx={{ color: "primary.contrastText" }}
					onClick={() => {
						setNavOpen((current: boolean) => !current);
					}}
				>
					<Dehaze fontSize="large" />
				</IconButton>
			</div>
			<SwipeableDrawer
				anchor="right"
				open={navOpen}
				onOpen={() => {
					setNavOpen(true);
				}}
				onClose={() => {
					setNavOpen(false);
				}}
			>
				<Navbar
					onClose={() => {
						setNavOpen(false);
					}}
				/>
			</SwipeableDrawer>
		</header>
	);
}

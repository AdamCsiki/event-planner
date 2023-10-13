import "./Header.style.css";
import Navbar from "../Navbar/Navbar";
import Link from "../Link/Link";
import {
	AppBar,
	Box,
	Button,
	Container,
	CssBaseline,
	Drawer,
	Menu,
	SwipeableDrawer,
	Toolbar,
	Typography,
	makeStyles,
} from "@mui/material";
import { AccountCircle, Dehaze, Menu as MenuIcon } from "@mui/icons-material";
import IconButton from "../IconButton/IconButton";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Theme } from "@emotion/react";

const navItems = ["Home", "Projects"];
const navLinks = ["/", "/projects"];

interface ExtendedProps {
	window?: () => Window;
}

export default function Header(props: ExtendedProps) {
	const auth = useSelector((state: RootState) => state.auth);

	const [navOpen, setNavOpen] = useState<boolean>(false);

	const handleDrawerToggle = () => {
		setNavOpen((prevState) => !prevState);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				component="nav"
				sx={{ backgroundColor: "black" }}
			>
				<Toolbar>
					<Box
						sx={{
							flexGrow: 1,
							display: "flex",
							justifyContent: "flex-start",
						}}
					>
						<Link to={"/"}>
							<Typography
								sx={{ color: "primary.contrastText" }}
								variant="h4"
							>
								EPlanner
							</Typography>
						</Link>
					</Box>

					<Box
						sx={{
							display: { xs: "none", sm: "flex" },
							alignItems: "center",
							gap: "1rem",
						}}
					>
						{navItems.map((item, index) => (
							<Link
								key={item}
								to={navLinks[index]}
								sx={{ color: "primary.contrastText" }}
							>
								{item}
							</Link>
						))}
						{!auth.isLoggedIn && (
							<Link
								to={"/login"}
								sx={{ color: "primary.contrastText" }}
							>
								Login
							</Link>
						)}
					</Box>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ display: { sm: "none" } }}
					>
						<MenuIcon fontSize="large" />
					</IconButton>
				</Toolbar>
			</AppBar>
			<nav>
				<Drawer
					variant="temporary"
					anchor="right"
					open={navOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": {
							boxSizing: "border-box",
						},
					}}
				>
					<Navbar
						onClose={handleDrawerToggle}
						items={navItems}
						links={navLinks}
					/>
				</Drawer>
			</nav>
		</Box>
	);
}

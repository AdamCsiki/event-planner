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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout, refreshTokens } from "../../redux/actions/authActions";
import {
	fetchPlus,
	getCookie,
	removeCookie,
	setCookie,
} from "../../api/fetchPlus";
import { basePath } from "../../api/api";
import { blue, orange, red } from "@mui/material/colors";

const navItems = ["Home", "Projects"];
const navLinks = ["/", "/projects"];

interface ExtendedProps {
	window?: () => Window;
}

export default function Header(props: ExtendedProps) {
	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	const [navOpen, setNavOpen] = useState<boolean>(false);

	const handleDrawerToggle = () => {
		setNavOpen((prevState) => !prevState);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar
				position="sticky"
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
						<Link
							to={"/"}
							sx={{
								textDecorationThickness: 3,
								opacity: 1,
							}}
						>
							<Typography
								sx={{
									color: "primary.contrastText",
									borderRadius: 4,
									padding: 1,
								}}
								variant="h4"
							>
								EPlanner
							</Typography>
						</Link>
						{/* <Button
							onClick={() => {
								fetchPlus(basePath + "/auth/refresh", {
									method: "POST",
								});
							}}
						>
							Refresh
						</Button> */}
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
						{!auth.isLoggedIn ? (
							<Link
								to={"/login"}
								sx={{ color: "primary.contrastText" }}
							>
								Login
							</Link>
						) : (
							<Button
								variant="contained"
								sx={{
									width: "100%",
								}}
								onClick={() => {
									dispatch(logout());
								}}
							>
								<Typography>Logout</Typography>
							</Button>
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

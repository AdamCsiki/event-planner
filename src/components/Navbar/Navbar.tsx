import "./Navbar.style.css";
import Link from "../Link/Link";
import {
	Divider,
	List,
	Typography,
	ListItem as MuiListItem,
	ListItemProps,
	Button,
} from "@mui/material";
import styled from "@emotion/styled";
import IconButton from "../IconButton/IconButton";
import { PersonRounded, Close, Logout } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import React, { HtmlHTMLAttributes } from "react";
import { logout } from "../../redux/actions/authActions";

const ListItem = styled(MuiListItem)<ListItemProps>(({ theme }) => ({
	padding: "1rem",
	width: "100%",
}));

interface ExtendedProps {
	items: string[];
	links: string[];
	onClose: () => void;
}

export default function Navbar(props: ExtendedProps) {
	const { items, links } = props;

	const auth = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch();

	return (
		<List
			sx={{
				backgroundColor: "black",
				minWidth: "16rem",
				width: "25vw",
				maxWidth: "24rem",
				padding: "0",
				flexGrow: 1,
			}}
		>
			{items.map((item, index) => {
				return (
					<React.Fragment key={index}>
						<ListItem>
							<Link to={links[index]}>
								<Typography>{item}</Typography>
							</Link>
						</ListItem>
						<Divider />
					</React.Fragment>
				);
			})}
			{auth.isLoggedIn ? (
				<>
					<ListItem>
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
					</ListItem>
				</>
			) : (
				<>
					<ListItem>
						<Link to={"/login"}>
							<Typography>Login</Typography>
						</Link>
					</ListItem>
				</>
			)}
		</List>
	);
}

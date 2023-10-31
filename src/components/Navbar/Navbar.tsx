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
import { HtmlHTMLAttributes, useContext, Fragment } from "react";
import { logout } from "../../requests/authRequests";
import { ConfirmContext } from "../../context/ConfirmContext";

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
	const { setOpen, setAcceptFunction } = useContext(ConfirmContext);
	const { items, links } = props;

	const auth = useSelector((state: RootState) => state.auth);

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
					<Fragment key={index}>
						<ListItem>
							<Link to={links[index]}>
								<Typography>{item}</Typography>
							</Link>
						</ListItem>
						<Divider />
					</Fragment>
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
								setAcceptFunction(() => {
									logout();
								});
								setOpen(true);
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

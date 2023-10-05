import "./Navbar.style.css";
import Link from "../Link/Link";
import {
	Divider,
	List,
	Typography,
	ListItem as MuiListItem,
	ListItemProps,
	IconButtonProps,
	Button,
} from "@mui/material";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import styled from "@emotion/styled";
import IconButton from "../IconButton/IconButton";
import { PersonRounded, Close } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import LinkButton from "../LinkButton/LinkButton";
import { HtmlHTMLAttributes } from "react";
import { getUserByToken } from "../../redux/actions/authActions";

const ListItem = styled(MuiListItem)<ListItemProps>(({ theme }) => ({
	padding: "1rem",
}));

interface ExtendedProps extends HtmlHTMLAttributes<HTMLDivElement> {
	onClose: () => void;
}

export default function Navbar(props: ExtendedProps) {
	const { onClose } = props;

	const auth = useSelector((state: RootState) => state.auth);

	return (
		<List
			sx={{
				minWidth: "16rem",
				width: "25vw",
				maxWidth: "24rem",
				padding: "0",
				flexGrow: 1,
			}}
		>
			<ListItem
				sx={{
					backgroundColor: "var(--black)",
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Link
					to={auth.isLoggedIn ? `/user/${auth.id}` : "/login"}
					onClick={onClose}
				>
					<IconButton>
						<PersonRounded
							fontSize="large"
							sx={{
								color: "primary.contrastText",
							}}
						/>
					</IconButton>
				</Link>

				<IconButton
					sx={{ color: "primary.contrastText" }}
					onClick={onClose}
				>
					<Close fontSize="large" />
				</IconButton>
			</ListItem>
			<ListItem>
				<Link to={"/projects"}>
					<Typography>Projects</Typography>
				</Link>
			</ListItem>
			<Divider />
			<ListItem>
				<Link to={"/register"}>
					<Typography>Register</Typography>
				</Link>
			</ListItem>
			<ListItem>
				<Button
					onClick={() => {
						getUserByToken(auth.token || "");
					}}
				>
					<Typography>GetUser</Typography>
				</Button>
			</ListItem>
		</List>
	);
}

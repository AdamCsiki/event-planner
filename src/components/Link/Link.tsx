import "./Link.style.css";
import { Link as RouterLink, LinkProps } from "react-router-dom";
import { Link as MuiLink, LinkProps as MuiLinkProps } from "@mui/material";

interface ExtendedProps extends LinkProps {
	component?: any;
}

export default function Link(props: ExtendedProps) {
	return (
		<MuiLink
			{...props}
			component={props.component || RouterLink}
		>
			{props.children}
		</MuiLink>
	);
}

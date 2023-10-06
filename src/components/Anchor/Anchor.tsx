import { Link, LinkProps } from "@mui/material";

interface ExtendedProps extends LinkProps {}

export default function Anchor(props: ExtendedProps) {
	return (
		<Link
			{...props}
			variant="body1"
			sx={{ color: "var(--color-background)" }}
		>
			{props.children}
		</Link>
	);
}

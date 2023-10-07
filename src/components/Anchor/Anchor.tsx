import { Link, LinkProps, Typography } from "@mui/material";

interface ExtendedProps extends LinkProps {}

export default function Anchor(props: ExtendedProps) {
	return (
		<Link
			{...props}
			variant="body1"
		>
			<Typography sx={{ color: "primary.contrastText" }}>
				{props.children}
			</Typography>
		</Link>
	);
}

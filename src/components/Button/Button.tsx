import "./Button.style.css";
import styled from "@emotion/styled";
import { Button as MuiButton, ButtonProps } from "@mui/material";

const Button = styled(MuiButton)<ButtonProps>(({ theme }: any) => ({
	color: theme.palette.primary.contrastText,
	backgroundColor: theme.palette.primary.main,
	boxShadow: "",
	":hover": {
		backgroundColor: theme.palette.primary.dark,
		border: theme.palette.text.primary,
	},
}));

export default Button;

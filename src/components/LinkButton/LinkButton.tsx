import styled from "@emotion/styled";
import { IconButton, IconButtonProps } from "@mui/material";
import { LinkProps } from "react-router-dom";

const LinkButton = styled(IconButton)<IconButtonProps & LinkProps>(
	({ theme }) => ({})
);

export default LinkButton;

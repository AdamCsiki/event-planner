import styled from "@emotion/styled";
import { TextField as MuiTextField, TextFieldProps } from "@mui/material";

const TextField = styled(MuiTextField)<TextFieldProps>(({ theme }) => ({
	color: "primary.main",
}));

export default TextField;

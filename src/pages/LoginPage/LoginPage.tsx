import "./LoginPage.style.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { useDispatch, useSelector } from "react-redux";
import { login, loginWithGoogle } from "../../requests/authRequests";
import { useNavigate } from "react-router-dom";
import {
	Box,
	Divider,
	FormControl,
	TextField,
	Typography,
} from "@mui/material";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import Link from "../../components/Link/Link";
import { Google } from "@mui/icons-material";
import IconButton from "../../components/IconButton/IconButton";

export default function LoginPage() {
	const auth = useSelector((state: RootState) => state.auth);

	const navigate = useNavigate();

	const [errorMsg, setErrorMsg] = useState<string>("");

	const [loginForm, setLoginForm] = useState<LoginFormModel>(
		{} as LoginFormModel
	);

	const submit = () => {
		return login(loginForm.email, loginForm.password).catch((err) => {
			console.log(err);
		});
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate("/projects");
		}
	}, [auth.isLoggedIn]);

	return (
		<div className="LoginPage">
			<FormControl
				className="login-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
				sx={{
					display: "flex",
					gap: 4,
				}}
			>
				<Typography
					variant="h2"
					sx={{ color: "primary.light", fontWeight: 800 }}
				>
					Login
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",

						gap: 1,
					}}
				>
					<TextField
						label="Email"
						onChange={(e) => {
							setLoginForm((form) => {
								form.email = e.target.value;
								return { ...form };
							});
						}}
					/>
					<TextField
						type="password"
						label="Password"
						onChange={(e) => {
							setLoginForm((form) => {
								form.password = e.target.value;
								return { ...form };
							});
						}}
					/>
					<Link to={"/register"}>Make an account?</Link>
				</Box>

				<Box
					sx={{
						width: "100%",

						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						gap: 1,
					}}
				>
					<Button
						size="large"
						sx={{
							width: "100%",
							borderRadius: "2rem",
						}}
						onClick={() => {
							submit();
						}}
					>
						Login
					</Button>
					<Divider />
					<Box>
						<IconButton
							size="large"
							sx={{
								gap: 1,
							}}
							onClick={() => {
								loginWithGoogle();
							}}
						>
							<Google fontSize="large" />
						</IconButton>
					</Box>
				</Box>
				<Typography
					color="error"
					sx={{ fontWeight: 500 }}
				>
					{errorMsg}
				</Typography>
			</FormControl>
		</div>
	);
}

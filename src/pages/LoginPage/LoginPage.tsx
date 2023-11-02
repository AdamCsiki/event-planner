import "./LoginPage.style.css";
import { useState } from "react";
import Button from "../../components/Button/Button";
import { LoginFormModel } from "../../interfaces/LoginFormModel";
import { useDispatch, useSelector } from "react-redux";
import { login, refreshTokens } from "../../requests/authRequests";
import { useNavigate } from "react-router-dom";
import { FormControl, TextField, Typography } from "@mui/material";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../../redux/types/States";
import { RootState } from "../../redux/store";
import { useEffect } from "react";
import Link from "../../components/Link/Link";

export default function LoginPage() {
	const auth = useSelector((state: RootState) => state.auth);

	const navigate = useNavigate();

	const [errorMsg, setErrorMsg] = useState<string>("");

	const [loginForm, setLoginForm] = useState<LoginFormModel>(
		{} as LoginFormModel
	);

	const submit = () => {
		return login(loginForm).then((isLoggedIn) => {
			if (isLoggedIn) {
				navigate("/projects");
			}
		});
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate(-1);
		}
	}, [auth.isLoggedIn]);

	return (
		<div className="LoginPage">
			<FormControl
				className="login-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<Typography
					variant="h2"
					mb={3}
					sx={{ color: "primary.light", fontWeight: 600 }}
				>
					Login
				</Typography>
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
				<div className="login-form-button-container">
					<Button
						size="large"
						onClick={() => {
							submit();
						}}
					>
						Login
					</Button>
				</div>
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

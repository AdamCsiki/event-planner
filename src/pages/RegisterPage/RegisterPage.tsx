import "./RegisterPage.style.css";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { RegisterFormModel } from "../../interfaces/RegisterFormModel";
import { basePath } from "../../api/api";
import { TextField, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
	const auth = useSelector((state: RootState) => state.auth);
	const [registerForm, setRegisterForm] = useState<RegisterFormModel>(
		{} as RegisterFormModel
	);

	const navigate = useNavigate();

	const [token, setToken] = useState("");

	const submit = () => {
		console.log(registerForm);
		if (registerForm.email !== registerForm.confirmEmail) {
			return;
		}

		if (registerForm.password !== registerForm.confirmPassword) {
			return;
		}

		const url = basePath + "/auth/register";

		fetch(url, {
			method: "POST",
			body: JSON.stringify(registerForm),
			headers: { "Content-Type": "application/json" },
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setToken(data.token);
			})
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		if (auth.isLoggedIn) {
			navigate(-1);
		}
	}, []);

	return (
		<div className="RegisterPage">
			<form
				className="register-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="register-header">
					<Typography
						variant="h2"
						sx={{ color: "primary.light" }}
					>
						Register
					</Typography>
				</div>
				<TextField
					label="Name"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.name = e.target.value;
							return { ...form };
						})
					}
					sx={{
						label: { color: "var(--grey)" },
					}}
				/>
				<TextField
					label="Email"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.email = e.target.value;
							return { ...form };
						})
					}
					sx={{
						label: { color: "var(--grey)" },
					}}
				/>
				<TextField
					label="Confirm email"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.confirmEmail = e.target.value;
							return { ...form };
						})
					}
					sx={{
						label: { color: "var(--grey)" },
					}}
				/>
				<TextField
					type="password"
					label="Password"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.password = e.target.value;
							return { ...form };
						})
					}
					sx={{
						label: { color: "var(--grey)" },
					}}
				/>
				<TextField
					type="password"
					label="Confirm password"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.confirmPassword = e.target.value;
							return { ...form };
						})
					}
					sx={{
						label: { color: "var(--grey)" },
					}}
				/>
				<div className="register-form-button-container">
					<Button
						size="large"
						onClick={() => {
							submit();
						}}
					>
						Register
					</Button>
				</div>
			</form>
		</div>
	);
}

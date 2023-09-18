import "./RegisterPage.style.css";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useState } from "react";
import { RegisterFormModel } from "../../interfaces/RegisterFormModel";
import { basePath } from "../../api/api";

export default function RegisterPage() {
	const [registerForm, setRegisterForm] = useState<RegisterFormModel>(
		{} as RegisterFormModel
	);

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

	return (
		<div className="RegisterPage">
			<form
				className="register-form"
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<div className="register-header">
					<h4>Register</h4>
				</div>
				<Input
					placeholder="name"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.name = e.target.value;
							return { ...form };
						})
					}
				/>
				<Input
					placeholder="email"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.email = e.target.value;
							return { ...form };
						})
					}
				/>
				<Input
					placeholder="confirm email"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.confirmEmail = e.target.value;
							return { ...form };
						})
					}
				/>
				<Input
					type="password"
					placeholder="password"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.password = e.target.value;
							return { ...form };
						})
					}
				/>
				<Input
					type="password"
					placeholder="confirm password"
					onChange={(e) =>
						setRegisterForm((form) => {
							form.confirmPassword = e.target.value;
							return { ...form };
						})
					}
				/>
				<div className="register-form-button-container">
					<Button
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

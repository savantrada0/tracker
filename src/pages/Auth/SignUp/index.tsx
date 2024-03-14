import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
	TextField,
	EmailField,
	PasswordField,
	Card,
	Page,
	Button,
	Checkbox
} from "../../../components";
import { SolguruzLogo } from "../../../assets/images/index";
import "../../../assets/style/pages/Auth/SignUp/style.scss";

const SignUp = () => {
	const [value, setValue] = useState({
		password: "",
		email: "",
		userName: "",
		checkbox: false,
	});

	const  [error,setError] = useState({
		passwordError: "",
		emailError: "",
		userNameError: "",
		checkboxError: "",
	});

	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value,checked} = e.target;
		setValue((prev) => ({
			...prev,
			[name]: value,
		}));
		if (name === 'checkbox') {
			setValue((prev) => ({
				...prev,
				checkbox: checked
			}));
		}
	};

	const handleSubmit = () => {
		if(value.userName === ""){
			setError({...error,userNameError:"username is required"});
		}
	};

	return (
		<Page className="signup_page">
			<Card>
				<div className="signup_container">
					<div className="back_to_login">
						<Button type="button" className="back_to_login__button" variant="text" onClick={() => navigate('/signin')}>Back to Login</Button>
					</div>
					<img src={SolguruzLogo} alt="logo" className="logo" />
					<h1 className="heading_1">
						Productivity personified
					</h1>
					<TextField 
						name= "username"
						value={value.userName}
						required= {true}
						autocomplate= "false"
						onChange={handleChange}
						placeholder="Enter your full name"
						label="Full name"
						error={error.userNameError}
					/>
					<EmailField
						label="Work email"
						name="email"
						value={value.email}
						onChange={handleChange}
						required={true}
						autocomplate="false"
						placeholder="Enter your work email"
						error={error.emailError}
					/>
					<PasswordField
						label="Password"
						name="password"
						value={value.password}
						onChange={handleChange}
						required={true}
						autocomplate="false"
						placeholder="Enter 6 or more characters"
						error={error.passwordError}
					/>
					<Checkbox
						name="checkbox"
						value={value.checkbox}
						required={true}
						onChange={handleChange}
						error={error.checkboxError}
						label={
							<>
							I agree to the <a href="/" target="_blank">Terms,</a><a href="/" target="_blank">Privacy Policy</a>{" "}and{" "}<a href="/" target="_blank">DPA</a>
							</>
						}
					/>
					<Button
						type="button"
						className="submit_button primary"
						onClick={handleSubmit}
					>
						Create my account
					</Button>
				</div>
			</Card>
		</Page>
	);
};

export default SignUp;
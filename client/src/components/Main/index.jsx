import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Main = () => {

	const [data, setData] = useState({ url: "" });
	const [error, setError] = useState("");

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:5000/api/users/get-insights";
			const { data: res } = await axios.post(url, data);
			console.log(res.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}

	}

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Web Scrapper</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className={styles.login_container}>
				<div className={styles.login_form_container}>
					<div className={styles.left}>
						<form className={styles.form_container} onSubmit={handleSubmit}>
							<h1>Please type the Url</h1>
							<input
								type="text"
								placeholder="Enter the url of the website"
								name="url"
								onChange={handleChange}
								value={data.url}
								required
								className={styles.input}
							/>

							{error && <div className={styles.error_msg}>{error}</div>}
							<button type="submit" className={styles.green_btn}>
								Get Insights
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;

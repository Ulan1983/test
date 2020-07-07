import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {registerUser} from "../../store/actions/usersActions";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import FormElement from "../../components/UI/Form/FormElement";
import Button from "@material-ui/core/Button";
import Alert from "@material-ui/lab/Alert";


const useStyles = makeStyles({
	grid: {
		margin: '0 auto',
	},
	gridFormElement: {
		textAlign: 'center'
	},
	gridFile: {
		paddingLeft: '20%'
	},
	typography: {
		textAlign: 'center',
		marginBottom: '2%'
	},
	gridBtn: {
		textAlign: 'center',
		marginTop: '2%'
	},
	box: {
		width: '60%',
		margin: '2% auto'
	},
	btn: {
		width: '30%'
	}
});

const Register = () => {
	const [state, setState] = useState({
		username: '',
		password: '',
		avatar: '',
	});

	const dispatch = useDispatch();
	const error = useSelector(state => state.users.registerError);

	const classes = useStyles();

	const inputChangeHandler = event => setState({...state, [event.target.name]: event.target.value});


	const fileChangeHandler = event => setState({...state, avatar: event.target.files[0]});

	const submitFormHandler = event => {
		event.preventDefault();

		const userData = new FormData();

		Object.keys(state).forEach(key => {
			let value = state[key];
			userData.append(key, value);
		});
		dispatch(registerUser(userData));
	};

	return (
		<>
			<Container justify="center">
				<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid} >
					<Box component="div" p={2}>
						<Typography variant="h5" className={classes.typography}>
							Регистрация
						</Typography>
						<form onSubmit={submitFormHandler}>
							<Grid className={classes.gridFormElement}>
								<FormElement
									required
									propertyName="username"
									title="Логин"
									value={state.username}
									onChange={inputChangeHandler}
									type="text"
									autoComplete="current-username"
									placeholder="Введите логин"
								/>
							</Grid>
							<Grid className={classes.gridFormElement}>
								<FormElement
									required
									propertyName="password"
									title="Пароль"
									value={state.password}
									onChange={inputChangeHandler}
									type="password"
									autoComplete="current-password"
									placeholder="Введите пароль"
								/>
							</Grid>
							<Grid className={classes.gridFile}>
								<FormElement
									propertyName="avatar"
									title="Фото"
									value={state.avatar}
									onChange={fileChangeHandler}
									type="file"
								/>
							</Grid>
							<Grid className={classes.gridBtn}>
								<Button variant="contained" color="primary"
										type="submit" id="registerBtn" className={classes.btn}>
									Создать аккаунт
								</Button>
							</Grid>
						</form>
						<Box className={classes.box}>
							{error && error.errors.username && (
								<Alert severity="error">{error.errors.username.properties.message}</Alert>
							)}

							{error && error.errors.password && (
								<Alert severity="error">{error.errors.password.properties.message}</Alert>
							)}
						</Box>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Register;
import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
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
	}
});

const Login = () => {
	const [state, setState] = useState({
		username: '',
		password: '',
	});

	const dispatch = useDispatch();
	const error = useSelector(state => state.users.loginError);

	const classes = useStyles();

	const inputChangeHandler = event => setState({...state, [event.target.name]: event.target.value});

	const submitFormHandler = event => {
		event.preventDefault();

		dispatch(loginUser(state));
	};

	return (
		<>
			<Container justify="center">
				<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid} >
					<Box component="div" p={2}>
						<Typography variant="h5" className={classes.typography}>
							Вход
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
							<Grid className={classes.gridBtn}>
								<Button variant="contained" color="primary" type="submit" id="loginBtn">
									Войти
								</Button>
							</Grid>
						</form>
						<Box className={classes.box}>
							{error && (
								<Alert severity="error">{error.error}</Alert>
							)}
						</Box>
					</Box>
				</Grid>
			</Container>
		</>
	);
};

export default Login;
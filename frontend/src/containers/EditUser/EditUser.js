import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert/Alert";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles(() => ({
	grid: {
		margin: '0 auto',
	},
	formElement: {
		textAlign: 'center',
	},
	btn: {
		textAlign: 'center',
		marginTop: '8px'
	}
}));

const EditUser = () => {
	const editableUser = useSelector(state => state.users.user);
	const dispatch = useDispatch();
	const classes = useStyles();

	const [user, setUser] = React.useState({
		username: '',
		avatar: ''
	});

	const error = useSelector(state => state.users.error);

	const inputChangeHandler = event => {
		setUser({...user, [event.target.name]: event.target.value})
	};

	const fileChangeHandler = event => {
		setUser({...user, avatar: event.target.files[0]})
	};

	const onSubmitHandler = event => {
		event.preventDefault();

		const userInfo = {...user};

		const data = new FormData();

		Object.keys(userInfo).forEach(value => {
			data.append(value, userInfo[value])
		});

		dispatch(editUser(data))
	};

	return (
		<>
			{editableUser &&
				<Container justify="center">
					<form onSubmit={onSubmitHandler}>
						<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid}>
							<Grid item className={classes.formElement}>
									<FormElement
										id="username"
										required
										propertyName='username'
										value={user.username}
										title="Изменить имя"
										onChange={inputChangeHandler}
									/>
							</Grid>
							<Grid item className={classes.formElement}>
								<FormElement
									propertyName='avatar'
									title="Выбрать аватар"
									onChange={fileChangeHandler}
									type='file'
								/>
							</Grid>
							<Grid item className={classes.btn}>
								<Box component="span">
									<Button
										variant='contained'
										color='primary'
										type='submit'
									>
										Изменить
									</Button>
								</Box>
							</Grid>
						</Grid>
					</form>
					<Grid container
						  justify="center"
						  alignItems="center">
						<Box component="span" m={1}>
							{error && error.errors.username && (
								<Alert severity="error">{error.errors.username.properties.message}</Alert>
							)}
						</Box>
					</Grid>
				</Container>
			}
		</>
	);
};

export default EditUser;
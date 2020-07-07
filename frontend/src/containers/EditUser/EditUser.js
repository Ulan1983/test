import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {editUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import FormElement from "../../components/UI/Form/FormElement";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	box: {
		textAlign: 'center',
		marginTop: '3%',
	},
	input: {
		width: '50%',
		margin: '0 auto'
	}
}));

const EditUser = () => {
	const editableUser = useSelector(state => state.users.user);
	const dispatch = useDispatch();
	const classes = useStyles();

	const [user, setUser] = React.useState(undefined);

	const inputChangeHandler = event => {
		setUser({...user, [event.target.name]: event.target.value})
	};

	const fileChangeHandler = event => {
		setUser({...user, [event.target.name]: event.target.files[0]})
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
					<form onSubmit={onSubmitHandler}>
						<Grid container direction='column' spacing={1} className={classes.box}>
							<Grid item>
								<Grid className={classes.input}>
									<FormElement
										id="username"
										required
										propertyName='username'
										title="Изменить имя"
										onChange={inputChangeHandler}
									/>
								</Grid>
							</Grid>
							<Grid item>
								<FormElement
									propertyName='avatar'
									title="Выбрать аватар"
									onChange={fileChangeHandler}
									type='file'
								/>
							</Grid>
							<Grid item>
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
			}
		</>
	);
};

export default EditUser;
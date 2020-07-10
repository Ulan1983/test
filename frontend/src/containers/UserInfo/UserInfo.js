import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUser, fetchUser} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Modal from "../../components/UI/Modal/Modal";
import Box from "@material-ui/core/Box";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto'
	},
	root: {
		minWidth: 275,
	},
	card: {
		textAlign: 'center'
	},
	btn: {
		marginBottom: '2%'
	}
});

const UserInfo = props => {
	const singleUser = useSelector(state => state.users.singleUser);
	const user = useSelector(state => state.users.user);
	const error = useSelector(state => state.users.error);
	const dispatch = useDispatch();
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	useEffect(() => {
		dispatch(fetchUser(props.match.params.id));
	}, [dispatch, props.match.params.id]);

	const removeUser = async () => {
		dispatch(deleteUser(props.match.params.id));
	};

	return (
		<>
			{singleUser &&
				<Grid item xs={12} lg={9} sm={8} ml={8} className={classes.grid}>
					<Card className={classes.card}>
						<CardContent>
							<b>Никнейм: </b>{singleUser.username}
						</CardContent>
						{user && user.role === 'admin' &&
							<Grid item>
								<Button color="secondary" variant="outlined"
										className={classes.btn} onClick={handleClickOpen}>
									Удалить
								</Button>
							</Grid>
						}
					</Card>
					<Modal onClose={handleClose} open={open} title="Вы действительно хотите удалить этого пользователя?">
						<Grid container justify='center' spacing={1}>
							<Grid item>
								<Button
									variant="contained"
									color="primary"
									onClick={handleClose}
								>Нет</Button>
							</Grid>
							<Grid item>
								<Button
									variant="contained"
									color="secondary"
									onClick={removeUser}
									id='yes'
								>Да</Button>
							</Grid>
						</Grid>
						{error && <Box mb={1}>
							<Alert severity="error">{error.error}</Alert>
						</Box>}
					</Modal>
				</Grid>
			}
		</>
	);
};

export default UserInfo;
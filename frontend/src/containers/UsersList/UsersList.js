import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../store/actions/usersActions";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
	grid: {
		margin: '0 auto',
		padding: '10px'
	},
	root: {
		minWidth: 275,
	},
});

const UsersList = () => {
	const users = useSelector(state => state.users.users);
	const dispatch = useDispatch();
	const classes = useStyles();

	useEffect(() => {
		dispatch(fetchUsers())
	}, [dispatch]);

	return (
		<Grid container direction="column" spacing={2}>
			<Grid container>
				{users && users.map(user => (
					<Grid item xs={12} sm={6} md={4} className={classes.grid} key={user._id} >
						<Card className={classes.root}>
							<CardContent>
								<Typography color="textSecondary" gutterBottom>
									<b>Никнейм: </b>{user.username}
								</Typography>
							</CardContent>
							<CardActions>
								<Button size="small"
										component={NavLink} to={`/user/${user._id}`}
										color="primary"
										variant="contained"
								>
									Просмотр
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))
				}
			</Grid>
		</Grid>
	);
};

export default UsersList;
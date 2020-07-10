import React from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import UserMenu from "../UserMenu/UserMenu";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {toggleDrawer} from "../../../store/actions/toggleDrawerActions";

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('sm')]: {
			display: 'none',
		},
	},
	title: {
		flexGrow: 1,
	},
	mainLink: {
		color: 'inherit',
		textDecoration: 'none',
		'&:hover': {
			color: 'inherit'
		}
	}
}));


const AppToolbar = () => {
	const user = useSelector(state => state.users.user);
	const dispatch = useDispatch();

	const classes = useStyles();

	return (
		<>
			{user && <AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => dispatch(toggleDrawer())}>
						<MenuIcon/>
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						<Link to="/" className={classes.mainLink}>News</Link>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						<Link to="/usersList" className={classes.mainLink}>Пользователи</Link>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						<Link to="/categories" className={classes.mainLink}>Категории</Link>
					</Typography>
					<UserMenu/>
				</Toolbar>
			</AppBar>}
			<Toolbar/>
		</>
	);
};

export default AppToolbar;
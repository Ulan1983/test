import React from 'react';

import {useDispatch, useSelector} from "react-redux";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

import {logoutUser} from "../../../store/actions/usersActions";
import {NavLink} from "react-router-dom";



const UserMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const dispatch = useDispatch();
	const user = useSelector(state => state.users.user);

	const logout = async () => {
		await dispatch(logoutUser());
	};

	return (
		<>
			<IconButton
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
				id='user'
			>
				<Avatar
					src={user.avatar ? `http://localhost:8000/uploads/userAvatar/${user.avatar}` : ''}
					alt={user.username}/>
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={open}
				onClose={handleClose}
			>
				<ListItem disabled>Привет, {user.username}!</ListItem>
				<Divider/>
				<MenuItem component={NavLink} to="/profile" onClick={handleClose}>Изменить профиль</MenuItem>
				<Divider/>
				<MenuItem onClick={logout}>Выйти</MenuItem>
			</Menu>
		</>
	);
};

export default UserMenu;
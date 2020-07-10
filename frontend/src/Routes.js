import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {useSelector} from "react-redux";
import MainPage from "./containers/MainPage/MainPage";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";
import EditUser from "./containers/EditUser/EditUser";
import UsersList from "./containers/UsersList/UsersList";
import UserInfo from "./containers/UserInfo/UserInfo";
import CategoriesList from "./containers/CategoriesList/CategoriesList";
import CategoryInfo from "./containers/CategoryInfo/CategoryInfo";


const ProtectedRoute = ({isAllowed, ...props}) => (
	isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);


const Routes = () => {
	const user = useSelector(state => state.users.user);

	return (
		<>
			<AppToolbar/>
			<Switch>
				<ProtectedRoute isAllowed={user} path="/" exact component={MainPage}/>
				<Route path="/register" exact component={Register}/> />
				<Route path="/login" exact component={Login}/> />
				<ProtectedRoute isAllowed={user} path="/profile" exact component={EditUser}/>
				<ProtectedRoute isAllowed={user} path="/usersList" exact component={UsersList}/>
				<ProtectedRoute isAllowed={user} path="/user/:id" exact component={UserInfo}/>
				<ProtectedRoute isAllowed={user} path="/categories" exact component={CategoriesList}/>
				<ProtectedRoute isAllowed={user} path="/category/:id" exact component={CategoryInfo}/>
			</Switch>
		</>
	);
};

export default Routes;
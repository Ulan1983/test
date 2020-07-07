import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import Register from "./containers/Register/Register";
import Login from "./containers/Login/Login";
import {useSelector} from "react-redux";
import MainPage from "./containers/MainPage/MainPage";
import AppToolbar from "./components/UI/Toolbar/AppToolbar";


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
			</Switch>
		</>
	);
};

export default Routes;
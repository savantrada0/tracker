import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home";
import AuthLayout from "../Layout/AuthLayout";
import SignIn from "../pages/Auth/SignIn";
import SignUp from "../pages/Auth/SignUp";
import Timesheets from "../pages/Timesheets";
import Projects from "../pages/Projects";
import Activity from "../pages/Activity";
import People from "../pages/People";
import Clients from "../pages/Clients";
import Todos from "../pages/Todos";
import Profile from "../pages/Profile";
import Apps from "../pages/Apps";
import Url from "../pages/Url";
import Widgets from "../pages/Widgets";
import NotFound from "../pages/NotFound";

export const AppRoute = () => {
	return (
		<Routes>
			{/* Protected Route */}
			<Route path='/' element={<Layout />}>
				<Route path="/" element={<Home />} />
				<Route path="/timesheets" element={<Timesheets/>}/>
				<Route path="/projects" element={<Projects/>}/>
				<Route path="/clients" element={<Clients/>}/>
				<Route path="/todos" element={<Todos/>}/>
				{/* <Route path="/reports" element={<Reports/>}/>
				<Route path="/reports/timeactivity" element={<Reports/>}/>
				<Route path="/reports/dailytotals" element={<Reports/>}/>
				<Route path="/reports/amountsowed" element={<Reports/>}/>
				<Route path="/reports/payments" element={<Reports/>}/> */}
				<Route path="/activity" element={<Activity/>}/>
				<Route path="/activity/apps" element={<Apps/>}/>
				<Route path="/activity/urls" element={<Url/>}/>
				<Route path="/insights" element={<Home/>} />
				<Route path="/teams" element={<People/>} />
				<Route path="/insights" element={<Home/>} />
				<Route path="/teams" element={<People/>} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/widgets" element={<Widgets/>} />
			</Route>
			{/* Public Route */}
			<Route path="/" element={<AuthLayout />}>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />
			</Route>
			<Route path='*' element={<NotFound />}/>
		</Routes>
	);
};
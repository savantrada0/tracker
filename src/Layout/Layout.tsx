import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header, Sidebar } from '../components';
import {Dashboard,Timesheets,Activity,Project,Teams, Widget} from "../assets/images";
import { RootState, useAppSelector } from '../redux/store';

const Layout = () => {
	const [toggle, setToggle] = useState(true);
	const [hamburgerToggle, setHamburgerToggle] = useState(false);
	const location = useLocation();
	const token = localStorage.getItem("token");
	const userRes = useAppSelector((state:RootState)=>state.userData);
	
	if(token){
		axios.defaults.headers.common["Authorization"] = `Bearer ${JSON.parse(token)}`;
	}

	const projectMenu = userRes.role==="admin" ? [{menuName:"Projects",link:"/projects"},{menuName:"To-dos",link:"/todos"},{menuName:"Clients",link:"/clients"}]:[{menuName:"Projects",link:"/projects"},{menuName:"To-dos",link:"/todos"}];

	const menuList = [
		{
			icon: <Dashboard/>,
			name: "Dashboard",
			link: "/"
		},
		{
			icon: <Timesheets/>,
			name: "Timesheets",
			link: "/timesheets"
		},
		{
			icon: <Activity/>,
			name: "Activity",
			menus: [{menuName:"Screenshots",link:"/activity"},{menuName:"Apps",link:"/activity/apps"},{menuName:"URLs",link:"/activity/urls"}],
			link: "/activity"
		},
		{
			icon: <Project/>,
			name: "Project managment",
			menus: projectMenu,
			link: "/projects"
		},
		// {
		// 	icon: Reports,
		// 	name: "Reports",
		// 	menus: [{menuname:"Time & activity",link:"/reports/timeactivity"},{menuname:"Daily totals(Weekly)",link:"/reports/dailytotals"},{menuname:"Amounts owed",link:"/reports/amountsowed"},{menuname:"Payments",link:"/reports/payments"},{menuname:"All reports",link:"/reports"}],
		// 	link: "/reports"
		// },
		{
			icon: <Teams/>,
			name: "Teams",
			link: "/teams"
		},
		{
			icon: <Widget/>,
			name: "Widgets",
			link: "/widgets"
		}
	];

	return (
		<div className='layout'>
			<div className="header_container">
				<Header
					hamburgerToggle={hamburgerToggle}
					setHamburgerToggle={setHamburgerToggle}
				/>
			</div>
			<div className="dashboard_layout">
				{(location.pathname!== "/profile") && <Sidebar toggle={toggle} setToggle={setToggle} hamburgerToggle={hamburgerToggle}  menuList={menuList}/>}
				{token ?
					<div className={`${toggle? `${(location.pathname !== "/profile")?" big ":""}`: `${(location.pathname !== "/profile")?" small ":""}`} container`}>
						<Outlet />
					</div>
					:
					<Navigate to={'/signin'} state={{ from: location }} replace />
				}
			</div>
		</div>
	);
};

export default Layout;
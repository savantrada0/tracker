import React, { useEffect } from "react";
import { DrawerProps, Jobdropdownobj, menuitemtype, projectstype, userlistobj } from "../../utils/types";
import { Button, Dropdown, ToggleSwitch } from "../index";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { Getprojects } from "../../redux/services/dashboard";
import { Close } from "../../assets/images";
import "../../assets/style/components/Drawer/style.scss";
import { JobsList, TechnologiesList, UsersList } from "../../redux/services/people";

export const Drawer = ({ onClick,name, showDrawer,selectedProject,columns,filterJob,filterTechnology,setFilterJob,setFilterTechnology,setColumns,selectedUser,setSelectedUser,setSelectedProject,level,setLevel,selectedRole,setSelectedRole}: DrawerProps) => {
	const dispatch = useAppDispatch();
	const responseDash = useAppSelector((state:RootState)=>state.dashboardData);
	const userRes = useAppSelector((state:RootState)=>state.userData);
	const response = useAppSelector((state:RootState)=>state.membersData);
	
	useEffect(()=>{
		{name==="timesheet" && showDrawer===true && (userRes.role==="admin"?dispatch(Getprojects({})):
			dispatch(Getprojects({name:"/get-my-projects"})));}
		{name==="timesheet" && showDrawer===true && (userRes.role==="admin" && dispatch(UsersList({job:"0",technology:"0",role:"All"})));}
		{name==="activity" && showDrawer===true && (userRes.role==="admin"?dispatch(Getprojects({})):
			dispatch(Getprojects({name:"/get-my-projects"})));}
		{(name==="roles" && showDrawer===true && userRes.role==="admin")&&dispatch(JobsList());}
		{(name==="roles" && showDrawer===true && userRes.role==="admin")&&dispatch(TechnologiesList());}
	},[dispatch,userRes,showDrawer,name]);
	
	const projectMenu:menuitemtype[] = [];
	responseDash?.projects?.forEach((item:projectstype)=>{
		projectMenu.push({name:item.name || "",id:item.id || "0"});
	});

	const jobMenu:menuitemtype[] = [];
	const technologyMenu:menuitemtype[] = [];
	{userRes.role==="admin" && 
	response.jobslist.forEach((item:Jobdropdownobj)=>{
		jobMenu.push({name:item.value,id:item.id});
	});}
	{userRes.role==="admin" && 
	response.technologieslist.forEach((item:Jobdropdownobj)=>{
		technologyMenu.push({name:item.value,id:item.id});
	});}

	const userMenu:menuitemtype[] = [];
	{userRes.role==="admin"&&
	response.userslist.forEach((item:userlistobj)=>{
		userMenu.push({name:item.first_name,id:item.id,email:item.email});
	});}
	{userRes.role==="member"&&
		userMenu.push({name:userRes.user.first_name,id:userRes.user.id,email:userRes.user.email});
	}

	let drawerData = [];

	if(name==="roles"){
		drawerData = [
			{
				labelName: "Role",
				dropdownValue:selectedRole,
				setDropdownValue: setSelectedRole,
				menus: [
					{name:"member",id:"1"},
					{name:"admin",id:"2"}
				],
			},
			{
				labelName: "Job",
				dropdownValue:filterJob,
				setDropdownValue: setFilterJob,
				menus: jobMenu,
			},
			{
				labelName: "Technology",
				dropdownValue:filterTechnology,
				setDropdownValue: setFilterTechnology,
				menus: technologyMenu, 
			}
		];
	}else if(name==="activity"){
		drawerData = [
			{
				labelName: "Project",
				dropdownValue:selectedProject,
				setDropdownValue: setSelectedProject,
				menus: projectMenu,
			},
			{
				labelName: "Activity Level",
				dropdownValue:level,
				setDropdownValue: setLevel,
				menus: [
					{name:"10%",id:"10"},
					{name:"20%",id:"20"},
					{name:"30%",id:"30"},
					{name:"40%",id:"40"},
					{name:"50%",id:"50"},
					{name:"60%",id:"60"},
					{name:"70%",id:"70"},
					{name:"80%",id:"80"},
					{name:"90%",id:"90"},
					{name:"95%",id:"95"},
				]
			},
			{
				labelName: "Select User",
				dropdownValue:selectedUser,
				setDropdownValue: setSelectedUser,
				menus: userMenu,
			}
		];	
	}else{
		drawerData = [
			{
				labelName: "Project",
				dropdownValue:selectedProject,
				setDropdownValue: setSelectedProject,
				menus: projectMenu,
			},
			{
				labelName: "Select User",
				dropdownValue:selectedUser,
				setDropdownValue: setSelectedUser,
				menus: userMenu,
			}
		];
	}

	const handleFilter = () =>{
		if(name==="roles"){
			setSelectedRole && setSelectedRole({name:"All",id:"0"});
			setFilterJob && setFilterJob({name:"All",id:"0"});
			setFilterTechnology && setFilterTechnology({name:"All",id:"0"});
		}else if(name==="activity"){
			setSelectedProject && setSelectedProject({name:"All projects",id:"0"});
			setLevel && setLevel({name:"All levels",id:"0"});
			setSelectedUser && setSelectedUser({name:"Select User",id:"0"});
		}else{
			setSelectedProject && setSelectedProject({name:"All projects",id:"0"});
			setSelectedUser && setSelectedUser({name:"Select User",id:"0"});
			setColumns && setColumns(['Project','Duration','Idle','Activity','Time']);
		}
	};

	const column = [
		{id: 'member', title: 'Member'},
		{id: 'todo', title: 'Todo'},
		{id: 'date', title: 'Date'},
		{id: 'email', title: 'Email'},
		{id: 'job', title: 'Job'},
		{id: 'technology', title: 'Technology'},
		{id: 'week', title: 'Week'},
		{id: 'notes', title: 'Notes'}
	];

	return (
		<div className="main_drawer">
			<div
				style={{ transform: `translateX(${showDrawer ? "0" : "100%"})` }}
				className="overlay"
				onClick={onClick}
			></div>
			<div
				className="drawer"
				style={{ transform: `translateX(${showDrawer ? "0" : "100%"})` }}
			>
				<div className="drawer_content_wrapper">
					<button onClick={onClick} className="close_button"><Close/></button>
					<button className="title">FILTERS</button>
					{drawerData && drawerData.map((item,index)=>{
						return(
							<div key={index} className="select_wrapper">
								<label>{item.labelName}</label>
								{item.dropdownValue && item.setDropdownValue && <Dropdown dropdownValue={item.dropdownValue} setDropdownValue={item.setDropdownValue} dropdownList={item.menus}/>}
							</div>);
					})}
					{columns && setColumns && column.map((item,index)=>{
						return (<div className='toggle_wrapper' key={index}>
							<ToggleSwitch
								id={item.title}
								small
								optionLabels={["Yes", "No"]}
								checked={columns}
								onChange={setColumns}
								disabled={false}
								name={item.title}
							/>
							<label htmlFor={item.title}>{item.title}</label>
						</div>);
					})}
					<Button type="button" onClick={()=>handleFilter()} className="drawer_filter_button">Clear filters</Button>
				</div>
			</div>
		</div>
	);
};
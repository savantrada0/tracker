import React, { useEffect } from 'react';
import dayjs from "dayjs";
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { Appurls, GetProjectTime, GetTodos } from '../../redux/services/dashboard';
import { ActivityList } from '../../redux/services/activity';
import { Page, RecentActivity, Spinner, Table } from '../../components';
import "../../assets/style/pages/Widgets/style.scss";
import { projectstype, projecttimeobj, todolistobj, urlsobj } from '../../utils/types';

const Widgets = () => {
	const dispatch = useAppDispatch();
	const response = useAppSelector((state: RootState) => state.dashboardData);
	const activityRes = useAppSelector((state:RootState)=>state.activityData);
	const userRes = useAppSelector((state:RootState)=>state.userData);

	const currDate = new Date;
	const firstDate = currDate.getDate()-currDate.getDay()+1;
	const weekStartDate = new Date(currDate.setDate(firstDate)).toISOString().slice(0, 10);
	const date = dayjs().format('YYYY-MM-DD');
    
	useEffect(() => {
		dispatch(Appurls({limit:5,skip:0,enddate:date,startdate:weekStartDate,userId:userRes.user.id}));
		dispatch(ActivityList({limit:6,skip:0,enddate:date,startdate:date}));
		dispatch(GetProjectTime({start_date:weekStartDate,end_date:date}));
		dispatch(GetTodos({start_date:weekStartDate,end_date:date}));
	}, [ date, dispatch, userRes.role,userRes.user.id, weekStartDate]);

	const urlHeadings = ["App Or Site","Time"];
	const projectHeadings = ["Project","Time"];
	const todoHeadings = ["To do","Time"];

	const urlsData:object[] = [];
	const projectsData:object[] = [];
	const todosData:object[] = [];

	let totalMinutes = 0;

	response.projects.map((item:projectstype)=>{
		const totalTime = item.duration;
		totalMinutes += Number(totalTime?.substring(0,2)) * 60;
		totalMinutes +=	Number(totalTime?.substring(3,5));
	});

	const randomColor = ["#78C1F3","#9BE8D8","#E2F6CA","#F8FDCF","#FFCACC"];

	{response?.projecttime?.map((item:projecttimeobj,index:number) => {
		const taskTiming = item.duration;
		let taskMinutes = Number(taskTiming?.substring(0,2)) * 60;
		taskMinutes+=Number(taskTiming?.substring(3,5));
		const progressBarWidth = (100*taskMinutes)/totalMinutes;
		if(projectsData.length<5){
			projectsData.push({
				"Project":<div className='task_name'><span className="task_icon" style={{background:`${randomColor[index]}`}}>{item?.name?.trim().substring(0,1).toUpperCase()}</span>
					<span className='task_title'>{item.name}</span></div>,
				"Time":<div className="time_progress">
					<span className='time_duration'>{item.duration}</span>
					<div className="outer"><div className="inner" style={{width: `${progressBarWidth}%` }}></div></div>
				</div>
			});
		}
	});}

	{response?.todos?.map((item:todolistobj,index:number) => {
		const taskTiming = item.duration;
		let taskMinutes = Number(taskTiming?.substring(0,2)) * 60;
		taskMinutes+=Number(taskTiming?.substring(3,5));
		const progressBarWidth = (100*taskMinutes)/totalMinutes;
		if(todosData.length<5){
			todosData.push({
				"To do":<div className='task_name'><span className="task_icon" style={{background:`${randomColor[index]}`}}>{item?.title?.trim().substring(0,1).toUpperCase()}</span>
					<span className='task_title'>{item.title}</span></div>,
				"Time":<div className="time_progress">
					<span className="time_duration">{item.duration}</span>
					<div className="outer"><div className="inner" style={{width: `${progressBarWidth}%` }}></div></div>
				</div>
			});
		}
	});}

	{response?.appurls?.map((item:urlsobj,index:number) => {
		const taskTiming = item.duration;
		let taskMinutes = Number(taskTiming?.substring(0,2)) * 60;
		taskMinutes+=Number(taskTiming?.substring(3,5));
		const progressBarWidth = (100*taskMinutes)/totalMinutes;
		if(urlsData.length<5){
			urlsData.push({
				"App Or Site":<div className='task_name'><span className="task_icon" style={{background:`${randomColor[index]}`}}>{item?.domain?.trim().substring(0,1).toUpperCase()}</span>
					<span className="task_title">{item.domain}</span></div>,
				"Time":<div className="time_progress">
					<span className="time_duration">{item.duration}</span>
					<div className="outer"><div className="inner" style={{width: `${progressBarWidth}%` }}></div></div>
				</div>
			});
		}
	});}

	return (
		<Page>
			<div className="main widgets">
				<div className="title">
					<h1 className='heading_2'>Widgets</h1>
				</div>
				{(activityRes.isLoading || response.isLoading)?
					<Spinner/>:
					<div className="widgets_container">
						<div className="left_wrapper">
							<RecentActivity title='RECENT ACTIVITY' recentActivityData={activityRes.data} link="/activity"/>
							<Table title='APPS & URLS' tableHeadings={urlHeadings} tableData={urlsData} link="/activity/urls" linkName='View Apps&Urls'/>
						</div>
						<div className="right_wrapper">
							<Table title='PROJECTS' tableHeadings={projectHeadings} tableData={projectsData} link='/projects' linkName='View Projects'/>
							<Table title='TO-DOS' tableHeadings={todoHeadings} tableData={todosData} link='/todos' linkName='View Todos'/>
						</div>
					</div>
				}
			</div> 
		</Page>
	);
};

export default Widgets;
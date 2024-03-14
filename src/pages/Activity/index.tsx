import React,{useEffect, useState} from 'react';
import DatePicker from "react-multi-date-picker";
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { UsersList } from '../../redux/services/people';
import { ActivityList, Totaltime } from '../../redux/services/activity';
import { GetTimesheet } from '../../redux/services/dashboard';
import Screenshots from '../Screenshots';
import AllScreenshots from '../AllScreenshots';
import { Page, Tabs, Button, Drawer, DashboardCard, NoData, Spinner} from '../../components';
import { LeftArrow, RightArrow } from '../../assets/images';
import "../../assets/style/pages/Activity/style.scss";
import { timesheetobj } from '../../utils/types';

const Activity = () => {
	const tabsData = ["Every 10 min","All screenshots",];
	const [selectedTab,setSelectedTab] = useState(tabsData[0]);
	const [showDrawer,setShowDrawer] = useState(false);
	const [userName, setUserName] = useState({name:"Select One",id:"0"});
	const [selectedProject, setSelectedProject] = useState({name:"All projects",id:"0"});
	const [level, setLevel] = useState({name:"All levels",id:"0"});
	const dispatch = useAppDispatch();
	const [value, setValue] = useState(new Date());
	const response:any = useAppSelector((state: RootState) => state.activityData);
	const responseDash = useAppSelector((state:RootState)=>state.dashboardData);
	const userRes = useAppSelector((state:RootState)=>state.userData);
	
	useEffect(() => {
		{userRes.role==="admin" && dispatch(Totaltime({enddate:value?.toISOString().slice(0, 10),startdate:value?.toISOString().slice(0, 10),userId:userName.id}));}
		{userRes.role==="admin" && dispatch(ActivityList({limit:-1,skip:0,enddate:value?.toISOString().slice(0, 10),startdate:value?.toISOString().slice(0, 10),min_percentage:level.name==="All levels"?"":level.name.substring(0,2),project_id:selectedProject.id==="0"?"":selectedProject.id,userId:userName.id}));}
		{userRes.role==="admin" && dispatch(UsersList({job:"0",technology:"0",role:"All"}));}
		{userRes.role==="admin" && dispatch(GetTimesheet({skip:0,enddate:value?.toISOString().slice(0, 10),startdate:value?.toISOString().slice(0, 10),limit:-1,userId:userName.id === "0" ? userRes.user.id:userName.id}));}
		{userRes.role==="member" && dispatch(ActivityList({limit:-1,skip:0,enddate:value?.toISOString().slice(0, 10),startdate:value?.toISOString().slice(0, 10),min_percentage:level.name==="All levels"?"":level.name.substring(0,2),project_id:selectedProject.id==="0"?"":selectedProject.id}));}
		{userRes.role==="member" && dispatch(Totaltime({enddate:value?.toISOString().slice(0, 10),startdate:value?.toISOString().slice(0, 10),userId:userRes.user.id}));}
		{userRes.role==="member" && dispatch(GetTimesheet({skip:0,enddate:value?.toISOString().slice(0, 10),startdate:value?.toISOString().slice(0, 10),limit:-1}));}                                                                                                                               
	}, [dispatch,value,userRes.role,userRes.user.id,level.name,selectedProject.id,userName.id]);

	let accuracy_percantage = 0;
	
	responseDash.timesheet?.forEach((element:timesheetobj)=>{
		accuracy_percantage+=parseInt(element.activity_percentage);
	});

	accuracy_percantage /= responseDash?.timesheet?.length;
	
	const handleDrawer = () =>{
		setShowDrawer(!showDrawer);
	};

	function handleChange(value:any){
		setValue(new Date(value));
	}

	const onPrevClick = () =>{
		const dummy = value.setDate(value.getDate()-1);
		const d = new Date(dummy);
		setValue(d);
	};

	const onNextClick = () =>{
		const dummy = value.setDate(value.getDate()+1);
		const d = new Date(dummy);
		setValue(d);
	};

	return (
		<Page>
			<div className='main'>
				<div className='activity'>
					<div className="title">
						<h1 className='heading_2'>Screenshots</h1>
						<Tabs selectedClass="selected_button" selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabsData={tabsData}/>
					</div>
					<div className="row1">
						<div className='date_filter_wrapper'>
							<Button className='prev_next_button' onClick={()=>onPrevClick()} type='button'><LeftArrow/></Button>
							<Button className='prev_next_button' isDisabled={value.toDateString() === new Date().toDateString()} onClick={()=>onNextClick()} type='button'><RightArrow/></Button>
							<DatePicker  maxDate={new Date()} format='MMM DD,YYYY' value={value} editable={false} onChange={handleChange} render={<InputIcon/>} />
						</div>
						<div className='rightside_wrapper'>
							<Button type='button' className='filter_button' onClick={handleDrawer}>Filters</Button>
							<Drawer selectedUser={userName} name="activity" setSelectedUser={setUserName} selectedProject={selectedProject} setSelectedProject={setSelectedProject} level={level} setLevel={setLevel} onClick={handleDrawer} showDrawer={showDrawer}/>
						</div>
					</div>
					{(response.isLoading)?<Spinner/>:
						<>
							<div className="cards">
								<div className="dashboard_card_wrapper">
									<DashboardCard title="WORKED TIME" timer={response.totaltime.length?response.totaltime[0]?.duration:"00:00"}/>
									<DashboardCard title="AVG. ACTIVITY" timer={accuracy_percantage?`${parseInt(`${accuracy_percantage}`).toString()}%`:"0%"}/>
								</div>
							</div>
							{selectedTab===tabsData[0]?(response?.data?.length>0?<Screenshots activities={response.data?response.data:[]}/>:<div className="nodata_wrapper"><NoData/></div>):(response?.data?.length>0?<AllScreenshots activities={response.data?response.data:[]}/>:<div className="nodata_wrapper"><NoData/></div>)}
						</>}
				</div>
			</div>
		</Page>
	);
};

export default Activity;
import React, { useEffect,useMemo, useState } from 'react';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import DatePicker from 'react-multi-date-picker';
import isAfter from 'date-fns/isAfter';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { toast } from "react-toastify";
import dayjs from 'dayjs';
import { DateRangePicker } from 'rsuite';
import subDays from 'date-fns/subDays';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import addDays from 'date-fns/addDays';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import addMonths from 'date-fns/addMonths';
import { menuitemtype,  projectstype,tableobj,tablesdataobj,timesheetobj,todolistobj, totaltimeobj, userlistobj } from '../../utils/types';
import { Totaltime } from '../../redux/services/activity';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { TodoList } from '../../redux/services/todo';
import { AddTime,DownloadCsv,GetCsvData } from '../../redux/services/timesheet';
import { ProjectsbyMember } from '../../redux/services/projectmember';
import { UsersList } from '../../redux/services/people';
import { Drawer,Page,Table,Modal, Button, Dropdown, NoData, Spinner, ToggleMenu } from '../../components';
import "../../assets/style/pages/Timesheets/style.scss";
import { Download } from '../../assets/images';

const Timesheets = () => {
	const userRes = useAppSelector((state:RootState)=>state.userData);
	const [userProject, setUserProject] = useState({name:"All projects",id:"0"});
	const [userName,setUserName] = useState({name:userRes.role==="member"?userRes.user.first_name:"Select User",id:userRes.role==="member"?userRes.user.id:"0"});
	const [showDrawer,setShowDrawer] = useState(false);
	const [showModal,setShowModal] = useState(false);
	const [values, setValues] = useState<any>([new Date(),new Date()]);
	const [selectedUser,setSelectedUser] = useState({name:"All Users",id:"0"});
	const [selectedProject, setSelectedProject] = useState({name:"All Projects",id:"0"});
	const [selectedTodo, setSelectedTodo] = useState({name:"All Todos",id:"0"});
	const [activityDate,setActivityDate] = useState(new Date());
	const [startTime,setStartTime] =useState(new Date());
	const [endTime,setEndTime] =useState(new Date());
	const [error, setError] = useState({
		user: "",
		project: "",
		todo:"",
		time:""
	});
	const [columns,setColumns] = useState(['Project','Duration','Idle','Activity','Time']);

	const dispatch = useAppDispatch();

	const response = useAppSelector((state:RootState)=>state.activityData);
	const todoRes = useAppSelector((state:RootState)=>state.todosData);
	const responseDash = useAppSelector((state:RootState)=>state.dashboardData);
	const projectMemberRes = useAppSelector((state:RootState)=>state.projectmemberData);
	const timesheetRes = useAppSelector((state:RootState)=>state.timesheetData);
	const peopleRes = useAppSelector((state:RootState)=>state.membersData);
	
	useEffect(() => {
		{userRes.role==="member" && dispatch(Totaltime({enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10)}));}
		{userRes.role==="member" && dispatch(GetCsvData({skip:0,enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10),limit:-1,projectId:selectedProject.id}));}
		{userRes.role==="admin" && dispatch(Totaltime({enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10),userId:userName.id}));}
		{userRes.role==="admin" && dispatch(GetCsvData({skip:0,enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10),limit:-1,userId:userName.id,projectId:selectedProject.id}));}
	}, [dispatch,userRes,values,userName.id,selectedProject.id]);

	useEffect(()=>{
		{userRes.role==="admin" && dispatch(ProjectsbyMember({id:selectedUser.id}));}
		{userRes.role==="admin" && dispatch(TodoList({projectid:userProject.id,userid:selectedUser.id}));}
	},[userRes.role,userProject.id,selectedUser.id,dispatch]);
	
	useEffect(()=>{
		{userRes.role==="admin" && showModal && dispatch(UsersList({job:"0",technology:"0",role:"All"}));}
	},[dispatch,showDrawer,userRes.role,showModal]);

	useMemo(()=>{
		if(timesheetRes.status){
			toast.success("Time added successfully");
			{userRes.role==="admin" && dispatch(Totaltime({enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10),userId:userName.id}));}
			{userRes.role==="admin" && dispatch(GetCsvData({skip:0,enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10),limit:-1,userId:userName.id,projectId:selectedProject.id}));}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[timesheetRes.status]);

	const handleDrawer = () =>{
		setShowDrawer(!showDrawer);
	};

	const handleModal = () =>{
		setSelectedUser({name:"All Users",id:"0"});
		setSelectedTodo({name:"All Todos",id:"0"});
		setUserProject({name:"All Projects",id:"0"});
		setActivityDate(new Date());
		setStartTime(new Date());
		setEndTime(new Date());
		setShowModal(!showModal);
	};

	const tableHeading = columns;
	const randomColor = ["#78C1F3","#9BE8D8","#E2F6CA","#FDA769","#FFCACC"];

	const tableData:tableobj[] = [];
	timesheetRes?.csvData?.forEach((item:timesheetobj,index:number)=>{
		const color = index%5;
		tableData.push({
			Project:<div className="task"><span className="logo" style={{background:randomColor[color]}}>{item.project.charAt(0).toUpperCase()}</span><div className="task_data"><h2>{item.project}</h2><p className='company_name'>SOLGURUZ LLP</p><h2>{item.todo}</h2></div></div>,
			Duration:item.duration,
			Idle:item.idle_time,
			Activity:item.activity_percentage,
			Time:`${item.start_time.substring(0,5)} - ${item.end_time.substring(0,5)}`,
			Member:item.member,
			Todo:item.todo,
			Date:item.date,
			Email:item.email,
			Job:item.job,
			Technology:item.technology,
			Week: item.week,
			Notes:item.notes,
			hiddendate:item.date
		});
	});

	if(!columns.includes('Member')){
		tableData.forEach((iteminner:any)=>{
			delete (iteminner?.Member); 
		});
	}else if(columns.includes('Member')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Member = item.member;
		});
	}

	if(!columns.includes('Todo')){
		tableData.forEach((iteminner:any)=>{
			delete (iteminner.Todo); 
		});
	}else if(columns.includes('Todo')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Todo = item.todo;
		});
	}

	if(!columns.includes('Date')){
		tableData.forEach((itemInner:any)=>{
			delete (itemInner.Date); 
		});
	}else if(columns.includes('Date')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Date = item.date;
		});
	}

	if(!columns.includes('Email')){
		tableData.forEach((itemInner:any)=>{
			delete (itemInner.Email); 
		});
	}else if(columns.includes('Email')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Email = item.email;
		});
	}

	if(!columns.includes('Job')){
		tableData.forEach((iteminner:any)=>{
			delete (iteminner.Job); 
		});
	}else if(columns.includes('Job')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Job = item.job;
		});
	}

	if(!columns.includes('Technology')){
		tableData.forEach((itemInner:any)=>{
			delete (itemInner.Technology); 
		});
	}else if(columns.includes('Technology')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Technology = item.technology;
		});
	}

	if(!columns.includes('Week')){
		tableData.forEach((itemInner:any)=>{
			delete (itemInner.Week); 
		});
	}else if(columns.includes('Week')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Week = item.week;
		});
	}

	if(!columns.includes('Notes')){
		tableData.forEach((itemInner:any)=>{
			delete (itemInner.Notes); 
		});
	}else if(columns.includes('Notes')){
		responseDash?.csvData?.forEach((item:timesheetobj,index:number)=>{
			tableData[index].Notes = item.notes;
		});
	}
	
	const totalMinutes = 1440;

	const userList:menuitemtype[] = [];
	const userProjectList:menuitemtype[] = [];
	const userTodoList:menuitemtype[] = [];

	{userRes.role==="admin" && 
	peopleRes?.userslist?.forEach((item:userlistobj)=>
		userList.push({name:item.first_name,id:item.id,email:item.email})
	);
	{selectedUser.id!=="0" && projectMemberRes.projectbymemberlist.forEach((item:projectstype)=>userProjectList.push({name:item.project?.name || "",id:item.fk_project || ""}));}
	{userProject.id!=="0" && selectedUser.id!=="0" && todoRes.todolist.forEach((item:todolistobj)=>userTodoList.push({name:item.title,id:item.id}));}
	}

	function handleDateChange(value:any){
		setActivityDate(new Date(value));
	}

	function handleStartTime(value:any){
		setStartTime(new Date(value));
	}

	function handleEndTime(value:any){
		setEndTime(new Date(value));
	}

	const content = <div className='add_activity_feilds'>
		<Dropdown error={error.user} dropdownList={userList} label='Select User' dropdownValue={selectedUser} setDropdownValue={setSelectedUser}/>
		<Dropdown error={error.project} dropdownList={userProjectList} label='Select Project' dropdownValue={userProject} setDropdownValue={setUserProject}/>
		<Dropdown error={error.todo} dropdownList={userTodoList} label='Select Todo' dropdownValue={selectedTodo} setDropdownValue={setSelectedTodo}/>
		<div className='date_selector'>
			<label>Select Date</label>
			<DatePicker format='MMM DD,YYYY' value={activityDate} editable={false} onChange={handleDateChange} render={<InputIcon/>} />
		</div>
		<div className='start_end_time'>
			<span className='time_selector'>
				<label>From</label>
				<DatePicker disableDayPicker editable={false} format="HH:mm:ss" value={startTime} onChange={handleStartTime} plugins={[<TimePicker key={0}/>]} render={<InputIcon/>} />
			</span>
			<span className='time_selector'>
				<label>To</label>
				<DatePicker disableDayPicker format="HH:mm:ss" value={endTime} onChange={handleEndTime} editable={false} plugins={[<TimePicker key={0}/>]} render={<InputIcon/>} />
			</span>
		</div>
		{error.time && <span className='time_error'>{error.time}</span>}
	</div>;

	const hmsToSeconds = (t:string) => {
		const [hours, minutes, seconds] = t.split(':');
		return Number(hours) * 60 * 60 + Number(minutes) * 60 + Number(seconds);
	};

	const secondsToHMS = (secs:number) => {
		return new Date(secs * 1000).toISOString().substr(11, 8);
	};

	const addActivity = () =>{
		let valid = true;
		setError({
			user: "",
			project: "",
			todo:"",
			time:""
		});
		const stime = dayjs(startTime).format('HH:mm:ss');
		const etime = dayjs(endTime).format('HH:mm:ss');
		if(selectedUser.id==="0"){
			setError((prev) => ({...prev,user: "please select user"}));
			valid = false;
		}
		if(userProject.id==="0"){
			setError((prev) => ({...prev,project: "please select project"}));
			valid = false;
		}
		if(selectedTodo.id==="0"){
			setError((prev) => ({...prev,todo: "please select todo"}));
			valid = false;
		}
		if(stime===etime){
			setError((prev) => ({...prev,time: "start time and end time can not be same"}));
			valid = false;
		}
		if(startTime===new Date()){
			setError((prev) => ({...prev,time: "please select start time"}));
			valid = false;
		}

		const str1 =  stime.split(':');
		const str2 =  etime.split(':');
		const totalSeconds1 = parseInt(str1[0]) * 3600 + parseInt(str1[1]) * 60 + parseInt(str1[2]);
		const totalSeconds2 = parseInt(str2[0]) * 3600 + parseInt(str2[1]) * 60 + parseInt(str2[2]);
		if (totalSeconds1 > totalSeconds2 ) {
			setError((prev) => ({...prev,time: "starttime can not be greater than endtime"}));
			valid = false;
		}
		const data = {
			fk_todo: selectedTodo.id,
			date: activityDate,
			start_time: stime,
			end_time: etime,
			duration: secondsToHMS(hmsToSeconds(etime) - hmsToSeconds(stime)),
			idle_time: "00:00:00",
			fk_project: userProject.id,
			fk_user: selectedUser.id,
			is_manual: true
		};
		if(valid){
			dispatch(AddTime(data));
			setSelectedUser({name:"All Users",id:"0"});
			setSelectedTodo({name:"All Todos",id:"0"});
			setUserProject({name:"All Projects",id:"0"});
			setActivityDate(new Date());
			setStartTime(new Date());
			setEndTime(new Date());
			setShowModal(!showModal);
		}
	};

	const predefinedRanges:any = [
		{
			label: 'Today',
			value: [new Date(), new Date()],
			placement: 'left'
		},
		{
			label: 'Yesterday',
			value: [addDays(new Date(), -1), addDays(new Date(), -1)],
			placement: 'left'
		},
		{
			label: 'This week',
			value: [startOfWeek(new Date()), endOfWeek(new Date())],
			placement: 'left'
		},
		{
			label: 'Last 7 days',
			value: [subDays(new Date(), 6), new Date()],
			placement: 'left'
		},
		{
			label: 'Last 30 days',
			value: [subDays(new Date(), 29), new Date()],
			placement: 'left'
		},
		{
			label: 'This month',
			value: [startOfMonth(new Date()), new Date()],
			placement: 'left'
		},
		{
			label: 'Last month',
			value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
			placement: 'left'
		},
		{
			label: 'This year',
			value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
			placement: 'left'
		},
		{
			label: 'Last year',
			value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
			placement: 'left'
		},
		{
			label: 'All time',
			value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date()],
			placement: 'left'
		},
		{
			label: 'Last week',
			closeOverlay: false,
			value: (value:any) => {
				const [start = new Date()] = value || [];
				return [
					addDays(startOfWeek(start, { weekStartsOn: 0 }), -7),
					addDays(endOfWeek(start, { weekStartsOn: 0 }), -7)
				];
			},
			appearance: 'default'
		},
		{
			label: 'Next week',
			closeOverlay: false,
			value: (value:any) => {
				const [start = new Date()] = value || [];
				return [
					addDays(startOfWeek(start, { weekStartsOn: 0 }), 7),
					addDays(endOfWeek(start, { weekStartsOn: 0 }), 7)
				];
			},
			appearance: 'default'
		}
	];

	const handleChange = (value:any) =>{
		setValues(value);
	};

	const tables:tablesdataobj[] = [];

	let previous = "";
	const timingArr:totaltimeobj[] = [];
	
	{(userRes.role === "admin") && response.totaltime.forEach((item:totaltimeobj)=>{
		if(previous === item.date){
			let TotalMinutes = 0;
			let TodayTotalTime = "";
			const CurrentTime = item.duration;
			const PreviousTime = timingArr[timingArr.length-1].duration;
			TotalMinutes = Number(CurrentTime?.substring(0,2))*60 + Number(PreviousTime?.substring(0,2))*60;
			TotalMinutes = Number(CurrentTime?.substring(3,5)) + Number(PreviousTime?.substring(3,5));
			const totalHours = parseInt(`${TotalMinutes/60}`);
			const minutes = TotalMinutes%60;
			const formatedHours = totalHours<10?`0${totalHours}`:totalHours;
			const formatedMinutes = minutes<10?`0${minutes}`:minutes;
			TodayTotalTime = `${formatedHours}:${formatedMinutes}`;
			timingArr[timingArr.length-1] = {date:item.date,duration:TodayTotalTime};
		}else{
			timingArr.push({date:item.date,duration:item.duration});
			previous = item.date;
		}
	});}

	(userRes.role==="admin") ? (timingArr?.forEach((item:totaltimeobj)=>{
		const sheetdata = timesheetRes?.csvData?.filter((innerItem:timesheetobj)=>innerItem.date===item.date);
		const table = tableData?.filter((tableItem:tableobj)=>tableItem.hiddendate===item.date);
		tables.push({
			date: dayjs(item.date).format('ddd, MMM D, YYYY'),
			duration:item.duration,
			sheet:sheetdata,
			tablesData: table
		});
	})) : (response?.totaltime?.forEach((item:totaltimeobj)=>{
		const sheetdata = timesheetRes?.csvData?.filter((innerItem:timesheetobj)=>innerItem.date===item.date);
		const table = tableData?.filter((tableItem:tableobj)=>tableItem.hiddendate===item.date);
		tables.push({
			date: dayjs(item.date).format('ddd, MMM D, YYYY'),
			duration:item.duration,
			sheet:sheetdata,
			tablesData: table
		});
	}));

	// const DownloadPdf = () =>{
	// 	download goes here
	// };

	const CsvDownload = () =>{
		{userRes.role==="member" && dispatch(DownloadCsv({skip:0,enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10),limit:-1,projectId:selectedProject.id}));}
		{userRes.role==="admin" && dispatch(DownloadCsv({skip:0,enddate:values[1]?.toISOString().slice(0, 10),startdate:values[0]?.toISOString().slice(0, 10),limit:-1,userId:userName.id,projectId:selectedProject.id}));}
	};

	const list = [
		// {	
		// 	text: "To PDF",
		// 	handleclick: DownloadPdf,
		// 	link: process.env.REACT_APP_API_ENDPOINT
		// },
		{
			text: "To CSV",
			handleclick: () => CsvDownload(),
			link: `${process.env.REACT_APP_API_ENDPOINT}/result.csv`
		}
	];

	return (
		<Page>
			<div className='main'>
				<div className="timesheets">
					<div className="title">
						<h1 className='heading_2'>View & edit timesheets</h1>
					</div>
					<div className="row1">
						<DateRangePicker
							ranges={predefinedRanges}
							style={{ width: 300 }}
							shouldDisableDate={date => isAfter(date, new Date())}
							character='-'
							editable={false}
							format='MMM dd,yyyy'
							defaultValue={[new Date(),new Date()]}
							cleanable={false}
							value={values}
							onChange={handleChange}
						/>
						<div className='filter_wrapper'>
							<Button type='button' className='filter_button' onClick={handleDrawer}>Filters</Button>
							<Drawer name="timesheet" columns={columns} setColumns={setColumns} onClick={handleDrawer} showDrawer={showDrawer} selectedProject={selectedProject} setSelectedProject={setSelectedProject} selectedUser={userName} setSelectedUser={setUserName}/>
						</div>
					</div>
					<div className="row">
						<ToggleMenu button_content={<Download/>} selectMenuList={list}/>
						<Button type='button' onClick={handleModal} className='addtime_button' isDisabled={userRes.role!=="admin"}>Add time</Button>
						{showModal&&<Modal handleClose={handleModal} actionName='Add Time' title='Add Activity Log' content={content} onClick={handleModal} showModal={showModal} handleAction={addActivity}/>}
					</div>
					{(response.isLoading===true && <Spinner/>)}
					{(response.isLoading===false && tables.length>0) && (tables?.map((mainItem:tablesdataobj,index:number)=>{
						return(
							<div key={index}><h2 className='table_totaltime'>{mainItem.date} : {mainItem.duration}</h2>
								<div className="chart_container">
									<div className="workchart">
										{mainItem?.sheet?.map((item:any,index:number)=>{
											const leftArr = item.start_time.split(":");
											const leftDis = Number(leftArr[1]) + (Number(leftArr[0])*60);
											const timeDurationArr = item.duration.split(":");
											const timeDuration = Number(timeDurationArr[1])+ (Number(timeDurationArr[0])*60);
											const length = (timeDuration*100)/1440;
											return (<div key={index} className='task_duration' style={{left:`${(leftDis*100)/totalMinutes}%`,width:`${length}%`}}></div>);	
										})}
										<div className="axis">
											<div className="bar"></div>
											<div className="bar"></div>
											<div className="bar"></div>
										</div>
										<div className="time_axis">
											<div className="time">6am</div>
											<div className="time">12pm</div>
											<div className="time">6pm</div>
										</div>
									</div>
								</div>
								{(mainItem?.tablesData?.length>0)?<Table tableHeadings={tableHeading} tableData={mainItem?.tablesData}/>:<div className='nodata_wrapper'><NoData/></div>}
							</div>
						); 
					}))}
					{(response.isLoading===false && response.totaltime.length===0)&&<div className="nodata_wrapper"><NoData/></div>}
				</div>
			</div>
		</Page>
	);
};

export default Timesheets;
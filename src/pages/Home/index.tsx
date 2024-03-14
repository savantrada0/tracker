import React,{useEffect} from 'react';
import dayjs from "dayjs";
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { GetTimesheet, TimeOfWeek } from '../../redux/services/dashboard';
import { timesheetobj, timethisweekobj } from '../../utils/types';
import { Page,DashboardCard,Table, Spinner } from '../../components';
import "../../assets/style/pages/Home/style.scss";

const Home = () => {
	const dispatch = useAppDispatch();
	const response = useAppSelector((state: RootState) => state.dashboardData);
	const userRes = useAppSelector((state:RootState)=>state.userData);

	const currDate = new Date;
	const firstDate = currDate.getDate()-currDate.getDay()+1;
	const weekStartDate = new Date(currDate.setDate(firstDate)).toISOString().slice(0, 10);
	const date = dayjs().format('YYYY-MM-DD');

	useEffect(() => {
		dispatch(TimeOfWeek({startdate:weekStartDate,enddate:date}));
		dispatch(GetTimesheet({skip:0,enddate:date,startdate:weekStartDate,limit:-1}));
	}, [ date, dispatch, userRes.role,userRes.user.id, weekStartDate]);

	let TimeofWeek = "";
	let TodayTime = "";
	let TotalMinutes = 0;
	response?.timeofweek?.forEach((item:timethisweekobj)=>{
		const TimeOfDay= item.duration;
		TotalMinutes += Number(TimeOfDay?.substring(0,2))*60;
		TotalMinutes += Number(TimeOfDay?.substring(3,5));
		if(item.date===date){
			TodayTime = item.duration.substring(0,5);
		}
	});

	const totalHours = parseInt(`${TotalMinutes/60}`);
	const minutes = TotalMinutes%60;
	const formatedHours = totalHours<10?`0${totalHours}`:totalHours;
	const formatedMinutes = minutes<10?`0${minutes}`:minutes;
	TimeofWeek = `${formatedHours}:${formatedMinutes}`;

	let weeklyActivity = 0;
	let totalActivity = 0;
	let todayActivity = 0;
	let todayAcitivyCount = 0;
	response.timesheet?.forEach((item:timesheetobj)=>{
		const timeOfDay= Number(item.activity_percentage);
		totalActivity+=timeOfDay;
		if(item.date===date){
			todayAcitivyCount += 1;
			todayActivity+=Number(item.activity_percentage);
		}
	});
	totalActivity/=response.timesheet?.length;
	todayActivity/= todayAcitivyCount;

	const formatedActivity = parseInt(`${totalActivity}`);

	weeklyActivity = formatedActivity?formatedActivity:0;

	const tableHeadings = ["Project", "Date", "Start", "Stop", "Duration"];

	const randomColor = ["#78C1F3","#9BE8D8","#E2F6CA","#FDA769","#FFCACC"];

	const timesheetData:object[] = [];

	response.timesheet?.forEach((item:timesheetobj,index:number)=>{
		if(item.date==date&&timesheetData.length<10){
			const color = index%5;
			timesheetData.push({
				Project:<div className="task"><span className="logo" style={{background:randomColor[color]}}>{item.project.charAt(0).toUpperCase()}</span><p className='project_name'>{item.project}</p></div>,
				Date:dayjs(item.date).format('ddd, MMMM D, YYYY'),
				Start:item.start_time.substring(0,5),
				Stop:item.end_time.substring(0,5),
				Duration: item.duration
			});
		}
	});

	const firstDay = new Date();
	const lastDay = new Date();

	const day = firstDay.getDay();

	if(day != 1){
		firstDay.setHours(-24 * (day-1));
	}

	if(day != 7){
		lastDay.setHours(24 * (7-day));
	}
	
	const first = dayjs(firstDay).format('ddd, MMM D, YYYY');
	const last = dayjs(lastDay).format('ddd, MMM D, YYYY');

	return (
		<Page>
			<div className='main'>
				<div className="home">
					<div className="title1">
						<h1 className='heading_2'>Dashboard</h1>
						<span>{first} - {last}</span>
					</div>
					{(userRes.isLoading || response.isLoading)?
						<Spinner/>:      
						<>
							<div className="dashboard_card_wrapper">
								<DashboardCard title="TODAY'S ACTIVITY" timer={`${parseInt(`${todayActivity}`) || 0}%`} status="-" />
								<DashboardCard title="WEEKLY ACTIVITY" timer={`${weeklyActivity}%`} status="-" />
								<DashboardCard
									title="WORKED THIS WEEK"
									timer={TimeofWeek}
									status="-"
								/>
								<DashboardCard title="WORKED TODAY" timer={TodayTime===""?"00:00":TodayTime} status="-" />
							</div>
							<div className="datatables">
								<Table tableHeadings={tableHeadings} tableData={timesheetData} title="TIMESHEET" link='/timesheets' linkName='View timesheet'/>	
							</div>
						</>}
				</div>
			</div>
		</Page>
	);
};

export default Home;
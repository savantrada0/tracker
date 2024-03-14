import React,{useState,useEffect} from 'react';
import DatePicker from "react-multi-date-picker";
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { Button, NoData, Page, Spinner, UrlsTable } from '../../components';
import { urlsobj } from '../../utils/types';
import { Urls } from '../../redux/services/urls';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { LeftArrow, RightArrow } from '../../assets/images';
import "../../assets/style/pages/Urls/style.scss";

const Url = () => {
	const [value, setValue] = useState(new Date());
	const dispatch = useAppDispatch();
	const urlsRes = useAppSelector((state)=>state.urlsData);

	useEffect(()=>{
		dispatch(Urls({start_date:value?.toISOString().slice(0, 10),end_date:value?.toISOString().slice(0, 10)}));
	},[dispatch,value]);

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

	const tableHeading = ["Site","Time spent(hrs)","Date"];

	const tableData:object[] = [];
	urlsRes?.urls?.map((item:urlsobj)=>{
		tableData.push({
			"App name":item.domain,
			"Time spent(hrs)":item.duration,
			"Date":item.date
		});
	});

	return (
		<Page>
			<div className="main">
				<div className="urls">
					<div className="title">
						<h1 className='heading_2'>URL activity</h1>
					</div>
					<div className="row1">
						<div className='date_filter_wrapper'>
							<Button className='prev_next_button' onClick={()=>onPrevClick()} type='button'><LeftArrow/></Button>
							<Button className='prev_next_button' isDisabled={value.toDateString() === new Date().toDateString()} onClick={()=>onNextClick()} type='button'><RightArrow/></Button>
							<DatePicker maxDate={new Date()} format='MMM DD,YYYY' value={value} editable={false} onChange={handleChange} render={<InputIcon/>} />
						</div>
					</div>
					{urlsRes.isLoading === true && <Spinner/>}
					{urlsRes?.urls?.length>0 && urlsRes.isLoading===false && <UrlsTable tableHeadings={tableHeading} tableData={urlsRes.urls}/>}
					{urlsRes?.urls?.length===0 && urlsRes.isLoading===false && <div className='nodata_wrapper'><NoData/></div>}
				</div>
			</div> 
		</Page>
	);
};

export default Url;
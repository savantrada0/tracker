import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CreateMember, JobsList, TechnologiesList, UsersList } from '../../redux/services/people';
import { Button, Dropdown, EmailField, Page, PasswordField, TextField } from '../../components';
import { Jobdropdownobj, menuitemtype,AddMemberProps, memberdataobj } from '../../utils/types';
import "../../assets/style/pages/AddMember/style.scss";
import { Close } from '../../assets/images';

const AddMember = ({showCreate,setShowCreate}:AddMemberProps) => {
	const [values,setValues] = useState([{fname:"",mname:"",lname:"",email:"",password:"",role:"All",job:"All",technology:"All",jobId:"0",technologyId:"0"}]);
	const [error,setError] = useState<any>([]);

	const dispatch = useAppDispatch();
	
	const response = useAppSelector((state)=>state.membersData);

	useEffect(()=>{
		dispatch(JobsList());
		dispatch(TechnologiesList());
	},[dispatch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>,index:number) => {
		const { name, value} = e.target;
		const list:any = [...values];
		list[index][name] = value;
		setValues(list);
	};

	const handleRemove= (index:number)=>{
		const list=[...values];
		list.splice(index,1);
		setValues(list);
		const errorList = [...error];
		errorList.splice(index,1);
		setError(errorList);
	};

	const handleAddClick=()=>{ 
		setValues([...values, {fname:"",mname:"",lname:"",email:"",password:"",role:"All",job:"All",technology:"All",jobId:"0",technologyId:"0"}]);
	};

	const roles = [{name:"admin",id:"0"},{name:"member",id:"1"}];

	const jobs:menuitemtype[] = [];
	response.jobslist.forEach((item:Jobdropdownobj)=>{
		jobs.push({name:item.value,id:item.id});
	});

	const technologies:menuitemtype[] = [];
	response.technologieslist.forEach((item:Jobdropdownobj)=>{
		technologies.push({name:item.value,id:item.id});
	});

	const onSubmit = async()=>{
		const regexForPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/i;
		const regexForEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		setError([]);
		const data:object[] = [];
		const errorArr:any = [];
		let valid = true;
		values.map((item)=>{
			const obj = {fname:"",lname:"",mname:"",email:"",password:"",role:"",job:"",technology:""};
			if(item.fname===""){
				obj.fname="Firstname can not be empty";
				valid = false;
			}
			if(item.lname===""){
				obj.lname="Lastname can not be empty";
				valid = false;
			}
			if(item.mname===""){
				obj.mname="Middlename can not be empty";
				valid = false;
			}
			response.userslist.map((member:memberdataobj)=>{if(member.email===item.email){
				obj.email = "Email already in use";
				valid = false;
			}});
			if(item.email.length === 0){
				obj.email = "Email can not be empty";	
				valid = false;
			}else if(!item.email.match(regexForEmail)){
				obj.email = "Please enter valid email";
				valid = false;
			}
			if(item.password.length < 8){
				obj.password = "Password must be of minimum length 8";
				valid = false;
			}else if(!item.password.match(regexForPassword)){
				obj.password = "Password enter valid password";
				valid = false;
			}
			if(item.role==="All"){
				obj.role="Please select role";
				valid = false;
			}
			if(item.job==="All"){
				obj.job="Please select job";
				valid = false;
			}
			if(item.technology==="All"){
				obj.technology="Please select technology";
				valid = false;
			}
			data.push({
				first_name:item.fname,
				middle_name:item.mname,
				last_name:item.lname,
				email: item.email,
				password:item.password,
				role:item.role,
				job:item.jobId,
				technology: item.technologyId
			});
			errorArr.push(obj);
		});
		setError(errorArr);
		if(valid){
			const res = await dispatch(CreateMember(data));
			if(res.payload.status === 1){
				toast.success("Members Created Successfully");
				dispatch(UsersList({}));
			}else{
				toast.error("Something Went Wrong");
			}
			setValues([{fname:"",mname:"",lname:"",email:"",password:"",role:"All",job:"All",technology:"All",jobId:"0",technologyId:"0"}]);
			setShowCreate(!showCreate);
		}
	};

	const handleClose = () =>{
		setShowCreate(!showCreate);
	};

	return (
		<Page>
			<div className='main'>
				<div className="addmember">
					{values.map((item,i)=>{
						return(
							<div key={i} className='add_member_feilds'>
								{values.length!==1 && <Button  className="remove_feilds" type='button' onClick={()=> handleRemove(i)}><Close/></Button>}
								<div className='inputfeilds_wrapper'>
									<TextField name='fname' error={error[i]?.fname} label='First Name' placeholder='Enter first name' value={item.fname} onChange={(e)=>handleInputChange(e,i)}/>
									<TextField name='mname' error={error[i]?.mname} label='Middle Name' placeholder='Enter middle name' value={item.mname} onChange={(e)=>handleInputChange(e,i)}/>
									<TextField name='lname' error={error[i]?.lname} label='LastName' placeholder='Enter last name' value={item.lname} onChange={(e)=>handleInputChange(e,i)}/>
									<EmailField name='email' error={error[i]?.email} label='Email' placeholder='Enter email' value={item.email} onChange={(e)=>handleInputChange(e,i)}/>
									<PasswordField name='password' error={error[i]?.password} label='Password' placeholder='Enter password' value={item.password} onChange={(e)=>handleInputChange(e,i)}/>
								</div>
								<div className='dropdown_wrapper'>
									<Dropdown label='Role' error={error[i]?.role} index={i} values={values} name="role" dropdownList={roles} dropdownValue={item.role} multiple={true} setDropdownValue={setValues} />
									<Dropdown label='Job' error={error[i]?.job} index={i} values={values} name="job" id='jobId' dropdownList={jobs} dropdownValue={item.job} multiple={true} setDropdownValue={setValues}/>
									<Dropdown label='Technology' error={error[i]?.technology} index={i} values={values} name="technology" id="technologyId" dropdownList={technologies} dropdownValue={item.technology} multiple={true} setDropdownValue={setValues} />
								</div>
								{values.length-1===i && <Button  className="add_feilds" type='button' onClick={handleAddClick}>Add More</Button>}
							</div>
						);
					})}
					<div className="bottom_buttons">
						<Button type='button' className='cancel_button' onClick={handleClose}>Cancel</Button>
						<Button type='button' className='action_button' onClick={onSubmit}>Add</Button>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default AddMember;
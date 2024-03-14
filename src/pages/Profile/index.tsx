import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GetUser, UpdateUser } from '../../redux/services/login';
import { Button, Dropdown, Modal, Page, PasswordField, Spinner, TextField } from '../../components';
import { ProfilePic } from '../../assets/images';
import "../../assets/style/pages/Profile/style.scss";

const Profile = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const userRes = useAppSelector((state)=>state.userData);
	const [values,setValues] = useState({first_name:userRes?.user?.first_name,middle_name:userRes?.user?.middle_name,last_name:userRes?.user?.last_name,email:userRes?.user?.email,role:userRes?.user?.role,technology:userRes?.user?.technology,job: userRes?.user?.job});
	const [passwordValue,setPasswordValue] = useState({password:userRes?.user?.password});
	const [isPasswordModalVisible,setIsPasswordModalVisible] = useState(false);
	const [error, setError ] = useState({
		first_name: "",
		middle_name:"",
		last_name:"",
	});
	const [passwordError , setPasswordError] = useState({
		password: "",
	});

	useEffect(()=>{
		dispatch(GetUser());
	},[dispatch]);

	useEffect(() => {
		setValues({first_name:userRes.user.first_name,middle_name:userRes?.user?.middle_name,last_name:userRes?.user?.last_name,email:userRes.user.email,role:userRes.user.role,technology:userRes.user.technology,job: userRes?.user?.job});
	}, [userRes]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
		setPasswordValue((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const content = <div className='add_clients_feilds'>
		<PasswordField
			label="Password"
			name="password"
			value={passwordValue.password}
			onChange={handleChange}
			required={true}
			autocomplate="false"
			placeholder="Enter 8 or more characters"
			error={passwordError.password}
		/>
	</div>;

	const handleSave =  async() =>{
		let valid = true;
		setError({first_name: "",middle_name: "", last_name: ""});

		if(values.first_name === ""){
			setError((prev) => ({...prev,first_name: "Please enter first name."}));
			valid = false;
		}

		if(values.middle_name === ""){
			setError((prev) => ({...prev,middle_name: "Please enter middle name."}));	
			valid = false;
		}
		
		if(values.last_name === ""){
			setError((prev) => ({...prev,last_name: "Please enter last name."}));	
			valid = false;
		}
		
		if(valid){
			const res = await dispatch(UpdateUser({id:userRes?.user?.id || "",obj:{first_name: values.first_name, middle_name: values.middle_name, last_name: values.last_name}}));	
			if(res.payload.status === 1){
				toast.success("Data updated successfully.");
			}else{
				toast.error("Something Went Wrong.");
			}
		}	
	};


	const handleCancel = () =>{
		navigate(-1);
	};

	const handleUpdate =async () =>{
		const regexForPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/i;
		let valid = true;
		setPasswordError({password: ""});
		if(passwordValue.password.length < 8){
			setPasswordError((prev) => ({...prev,password: "Password must be of minimum length 8."}));
			valid = false;
		}else if(!passwordValue.password.match(regexForPassword)){
			setPasswordError((prev) => ({...prev,password: "Password must contain at least one special character, one capital letter, one lowercase letter, and one number."}));
			valid = false;
		}
		if(valid){
			const res = await dispatch(UpdateUser({id:userRes?.user?.id || "",obj:{password:passwordValue?.password}}));
			if(res.payload.status === 1){
				toast.success("Data updated successfully.");
			}else{
				toast.error("Something Went Wrong.");
			}
			setPasswordValue({password: ""});
			setIsPasswordModalVisible(false);
		}
	};

	const handleCloseModal = () =>{
		setIsPasswordModalVisible(false);
	};

	console.log(passwordValue.password);

	return (
		<Page>
			<div className='main'>
				<div className="profile">       
					<div className="leftside">
						<div className='user_image'>
							<img src={ProfilePic} alt="profile"/>
						</div>
						{userRes.role==="admin" && <Button className='actions_button' type="button" onClick={() => setIsPasswordModalVisible(true)}>Change password</Button>}
					</div>
					{userRes.isLoading?<Spinner/>:
						<div className="rightside">
							<h1 className='heading_2'>Edit Account</h1>
							<TextField label='First Name' error={error.first_name} disable={userRes?.user?.role === "member"} name="first_name" value={values.first_name} onChange={handleChange}/>
							<TextField label='Middle Name' error={error.middle_name} disable={userRes?.user?.role === "member"} name="middle_name" value={values.middle_name} onChange={handleChange}/>
							<TextField label='Last Name' error={error.last_name} disable={userRes?.user?.role === "member"} name="last_name" value={values.last_name} onChange={handleChange}/>
							<TextField label='Email' disable name="email" value={values.email} onChange={handleChange}/>
							{userRes?.user?.role === "admin" &&
							<Dropdown label='Role' dropdownValue={{name:userRes?.role,id:"0"}} classname='dropdown-update-profile' disable dropdownList={[]} />
							}
							{userRes?.user?.role === "member" && (
								<><Dropdown label='Job' dropdownValue={{name:values.job,id:"0"}} classname='dropdown-update-profile' disable dropdownList={[]} />
									<Dropdown label='Technology' dropdownValue={{name:values.technology,id:"0"}} classname='dropdown-update-profile' disable dropdownList={[]} /></>
							)}																							
							{userRes?.user?.role === "admin" &&
							<div className="bottom_buttons">
								<Button type='button' className='cancel_button' onClick={handleCancel}>Cancel</Button>
								<Button type='button' className='action_button' onClick={handleSave}>Save</Button>
							</div>
							}
						</div>}
				</div>
				{isPasswordModalVisible && <Modal isDisabled={passwordValue.password===0||undefined ? true : false} handleClose={handleCloseModal} actionName='Update' title='Change Password' content={content} onClick={handleCloseModal} showModal={isPasswordModalVisible} handleAction={handleUpdate}/>}
			</div>
		</Page>
	);
};

export default Profile;
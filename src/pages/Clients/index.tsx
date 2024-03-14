import React,{useEffect, useState} from 'react';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { AddClient, ClientList, DeleteClient, UpdateClient } from '../../redux/services/client';
import { Button, EmailField, Modal, NoData, Page, Paginate, SearchInput, Spinner, Table, Tabs, TextField, ToggleMenu } from '../../components';
import { clientobj } from '../../utils/types';
import "../../assets/style/pages/Clients/style.scss";
import { DownArrow } from '../../assets/images';
import { toast } from 'react-toastify';

const Clients = () => {
	const tabsData = ["ACTIVE","ARCHIVE"];
	const [selectedTab, setSelectedTab] = useState("ACTIVE");
	const [clients,setClients] = useState("");
	const [showModal,setShowModal] = useState(false);
	const [updateModal,setUpdateModal] = useState(false);
	const [confirmModal,setConfirmModal] = useState(false);
	const [values,setValues] = useState({name:"",email:"",contact:""});
	const [error,setError] = useState({name:"",email:"",contact:""});
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage,setPostPerPage] = useState(5);
	const [actionData,setActionData] = useState<clientobj|null>(null);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	const response = useAppSelector((state:RootState)=>state.clientsData);
	const userRes = useAppSelector((state:RootState)=>state.userData);

	const data:clientobj[] = response?.clientlist?.slice(indexOfFirstPost, indexOfLastPost);

	const dispatch = useAppDispatch();

	useEffect(()=>{
		{userRes.role==="admin" && dispatch(ClientList());}
	},[dispatch,userRes.role]);

	useEffect(()=>{
		if(response.clientlist.length!==0 && currentPage>Math.ceil(response.clientlist.length / postsPerPage)){
			setCurrentPage(Math.ceil(response.clientlist.length / postsPerPage));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[response.clientlist.length]);

	const handleUpdate = async() =>{
		const regexForEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		let valid = true;
		setError({name: "",email: "",contact:""});

		if(values.name === ""){
			setError((prev) => ({...prev,name: "Please enter client name."}));
			valid = false;
		}

		if(values.email.length === 0){
			setError((prev) => ({...prev,email: "Email can not be empty."}));	
			valid = false;
		}else if(!values.email.match(regexForEmail)){
			setError((prev) => ({...prev,email: "Please enter valid email."}));
			valid = false;
		}
		
		if(valid){
			const res = await dispatch(UpdateClient({id:actionData?.id || "",obj:{name: values.name,email:values.email,contact: values.contact}}));
			if(res.payload.status === 1){
				toast.success("Client Updated Successfully");
				dispatch(ClientList());
			}else{
				toast.error("Something Went Wrong");
			}
			setValues({name:"",email:"",contact:""});
			setError({name: "",email: "",contact:""});
			setUpdateModal(!updateModal);
		}
	};

	const handleUpdateModal = () =>{
		setValues({name:"",email:"",contact:""});
		setUpdateModal(!updateModal);
		setError({name: "",email: "",contact:""});
	};

	const setUpdate = () =>{
		setValues({name:actionData?.name||"",email:actionData?.email||"",contact:actionData?.contact||""});
		setUpdateModal(!updateModal);
	};

	const handleDelete = async() =>{
		const res = await dispatch(DeleteClient({id:actionData?.id || ""}));
		if(res.payload.status === 1){
			toast.success("Client Deleted Successfully");
			dispatch(ClientList());
			setConfirmModal(!confirmModal);
		}else{
			toast.error("Something Went Wrong");
			setConfirmModal(!confirmModal);
		}
	};

	const setData = (item:clientobj) =>{
		setActionData(item);
	};

	const tableHeadings = ["Name", "Email", "Contact", "Actions"];

	const tableData:object[] = [];

	{userRes.role==="admin" && data.forEach((item:clientobj)=>{
		tableData.push({
			Name: item.name,
			Email: item.email,
			Contact: item.contact,
			Actions: <ToggleMenu classname="action_toggle" onclick={()=>setData(item)} button_content={<>Actions <DownArrow/></>} selectMenuList={[{text:"Edit Client",handleclick:()=>setUpdate()},{text:"Delete Client",handleclick:()=>handleDeleteModal()}]}/>
		});
	});}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
		setClients(e.target.value);
	};

	const content = <div className='add_clients_feilds'>
		<TextField name='name' error={error.name} label='Name' placeholder='Enter Client Name' value={values.name} onChange={handleInputChange}/>
		<EmailField name='email' error={error.email} label='Email' placeholder='Enter email address' value={values.email} onChange={handleInputChange}/>
		<TextField name='contact' error={error.contact} label='Contact Number' placeholder='Enter Contact Number' value={values.contact} onChange={handleInputChange}/>
	</div>;

	const addClient = async() =>{
		const regexForEmail = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
		let valid = true;
		setError({name: "",email: "",contact:""});

		if(values.name === ""){
			setError((prev) => ({...prev,name: "Please enter client name."}));
			valid = false;
		}

		if(values.email.length === 0){
			setError((prev) => ({...prev,email: "Email can not be empty."}));	
			valid = false;
		}else if(!values.email.match(regexForEmail)){
			setError((prev) => ({...prev,email: "Please enter valid email."}));
			valid = false;
		}

		if(values.contact.length === 0){
			setError((prev) => ({...prev,contact: "Contact can not be empty."}));	
			valid = false;
		}
		
		if(valid){
			const data = {
				name:values.name,
				contact: values.contact,
				email: values.email
			};
			const res = await dispatch(AddClient(data));
			if(res.payload.status === 1){
				toast.success("Client Created Successfully");
				dispatch(ClientList());
			}else{
				toast.error("Something Went Wrong");
			}
			setValues({name:"",email:"",contact:""});
			setError({name: "",email: "",contact:""});
			setShowModal(!showModal);
		}
	};
	
	const handleModal = () =>{
		setValues({name:"",email:"",contact:""});
		setShowModal(!showModal);
		setError({name: "",email: "",contact:""});
	};

	const paginate = (pageNumber:number) => {
		setCurrentPage(pageNumber);
	};

	const previousPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	
	const nextPage = () => {
		if (currentPage !== Math.ceil(response.clientlist.length / postsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleDeleteModal = () =>{
		setConfirmModal(!confirmModal);
	};

	return (
		<Page>
			<div className="main">
				<div className="clients">
					<div className="title">
						<h1 className='heading_2'>Clients</h1>
					</div>
					{userRes.role==="member" && <NoData classname='nodata_client'/>}
					{userRes.role==="admin" && 
					<>
						<div className="tabs_container">
							<Tabs selectedClass='selected_button2' selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabsData={tabsData}/>
						</div>
						<div className="tableheader">
							<SearchInput name="clients" value={clients} onChange={handleChange} placeholder="Search clients"/>
							<Button
								type="button"
								className='Add_client_button'
								onClick={handleModal}
							>Add Client</Button>
							{updateModal && <Modal handleClose={handleUpdateModal} actionName='Update' title='Update Client' content={content} onClick={handleUpdateModal} showModal={updateModal} handleAction={handleUpdate}/>}
							{showModal && <Modal handleClose={handleModal} actionName='Add Client' title='Add Client' content={content} onClick={handleModal} showModal={showModal} handleAction={addClient}/>}
							{confirmModal && <Modal showModal={confirmModal} handleClose={handleDeleteModal} onClick={handleDeleteModal} title="Confirm" content={<h1 className='confirm_message'>Are You Sure Want To Delete?</h1>} actionName="Yes" handleAction={handleDelete}/> }
						</div>
						{response.isLoading && <Spinner/>}
						{response.isLoading===false &&
							<div className="table_wrapper">
								{selectedTab === tabsData[0] ? (						
									(tableData.length>0 ? <Table tableHeadings={tableHeadings} tableData={tableData} />:<NoData/>)
								) : (
									<h1 className='message'>No Clients</h1>
								)}
							</div>}
						{selectedTab === tabsData[0] && response.isLoading===false && response.clientlist.length>5 && <Paginate postsPerPage={postsPerPage} currentPage={currentPage} 
							totalDatas={response.clientlist.length}
							paginate={paginate} previousPage={previousPage} nextPage={nextPage} setPostPerPage={setPostPerPage}/>}
					</>}
				</div>
			</div> 
		</Page>
	);
};

export default Clients;
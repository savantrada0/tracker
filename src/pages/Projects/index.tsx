import React,{useEffect, useState} from 'react';
import { toast } from 'react-toastify';
import { addmemberdata, addmemberlistobj, clientobj, menuitemtype, projectstype, userlistobj } from '../../utils/types';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { Getprojects } from '../../redux/services/dashboard';
import { Addproject, Deleteproject, Updateproject } from '../../redux/services/project';
import { ClientList } from '../../redux/services/client';
import { UsersList } from '../../redux/services/people';
import { AddMemberstoProject, DeleteMemberfromProject, MembersbyProject } from '../../redux/services/projectmember';
import { Button,Checkbox,Dropdown, Modal, NoData, Page, Paginate, SearchInput, Table, Tabs, TextField, ToggleSwitch, ToggleMenu, Spinner } from '../../components';
import { Close, DownArrow, User } from '../../assets/images';
import "../../assets/style/pages/Projects/style.scss";

const Projects = () => {
	const tabsData = ["ACTIVE","ARCHIVE"];
	const [selectedTab, setSelectedTab] = useState("ACTIVE");
	const modalTabs = ["Add members","Delete members"];
	const [isInternal,setIsInternal] = useState<string[]>([]);
	const [selectedModal, setSelectedModal] = useState("Add members");
	const [projects,setProjects] = useState("");
	const [showModal,setShowModal] = useState(false);
	const [updateModal,setUpdateModal] = useState(false);
	const [memberModal,setMemberModal] = useState(false);
	const [confirmModal,setConfirmModal] = useState(false);
	const [projectName,setProjectName] = useState("");
	const [searchMember,setSearchMember] = useState({addSearch:"",removeSearch:""});
	const [values,setValues] = useState<boolean[]>([]);
	const [selectedClient,setSelectedClient] = useState({name:"All",id:"0"});
	const [actionData,setActionData] = useState<projectstype|null>(null);
	const [projectId,setProjectId] = useState("0");
	const [error,setError] = useState({project:""});
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage,setPostPerPage] = useState(5);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	const response = useAppSelector((state:RootState)=>state.dashboardData);
	const userRes = useAppSelector((state:RootState)=>state.userData);
	const clientRes = useAppSelector((state:RootState)=>state.clientsData);
	const membersRes = useAppSelector((state:RootState)=>state.membersData);
	const memberByProject = useAppSelector((state:RootState)=>state.projectmemberData);

	const data:projectstype[] = response?.projects?.slice(indexOfFirstPost, indexOfLastPost);

	const dispatch = useAppDispatch();

	useEffect(()=>{
		{userRes.role==="member" && dispatch(Getprojects({name:"/get-my-projects",dashboard:true}));}
		{userRes.role==="admin" &&
		dispatch(Getprojects({}));
		dispatch(ClientList());}
	},[dispatch,userRes.role]);

	useEffect(()=>{
		{userRes.role==="admin" &&
		dispatch(MembersbyProject({id:projectId}));
		dispatch(UsersList({job:"0",technology:"0",role:"All"}));}
	},[projectId,dispatch,memberByProject.status,userRes.role]);

	const updateProject = async() =>{
		let valid = true;
		setError({project: ""});
		if(projectName === ""){
			setError((prev) => ({...prev,project: "Project name must be required."}));
			valid = false;
		}
		if(valid){
			let data = {};
			if(selectedClient.id!=="0"){
				data = {
					name:projectName,
					is_internal:isInternal.includes("internal")?true:false,
					fk_client : selectedClient.id
				};
			}else{
				data = {
					name:projectName,
					is_internal:isInternal.includes("internal")?true:false,
				};
			}
			const res = await dispatch(Updateproject({id:actionData?.id || "",obj:data}));
			if(res.payload.status === 1){
				{userRes.role==="member" && dispatch(Getprojects({name:"/get-my-projects",dashboard:true}));}
				{userRes.role==="admin" && dispatch(Getprojects({}));}
				toast.success("Project Updated Successfully");
			}else{
				toast.error("Something Went Wrong");
			}
			setProjectName("");
			setSelectedClient({name:"All",id:"0"});
			setIsInternal([]);
			setUpdateModal(!updateModal);
		}
	};

	const handleUpdateModal = () =>{
		setProjectName("");
		setSelectedClient({name:"All",id:"0"});
		setError({project: ""});
		setUpdateModal(!updateModal);
	};

	const handleCloseModal = () =>{
		setValues([]);
		setProjectId("0");
		setSearchMember({addSearch:"",removeSearch:""});
		setMemberModal(!memberModal);
	};

	const setUpdate = () =>{
		clientRes.clientlist.forEach((item:clientobj)=>
		{
			if(item.id===actionData?.fk_client){
				setSelectedClient({id:item.id,name:item.name});
			}
		});
		setProjectName(actionData?.name || "");
		if(actionData?.is_internal === true){
			setIsInternal(["internal"]);
		}
		setUpdateModal(!updateModal);
	};

	const setData = (item:projectstype) =>{
		setActionData(item);
	};

	const handleDelete = async() =>{
		const res = await dispatch(Deleteproject({id:actionData?.id || ""}));
		if(res.payload.status === 1){
			{userRes.role==="member" && dispatch(Getprojects({name:"/get-my-projects",dashboard:true}));}
			{userRes.role==="admin" && dispatch(Getprojects({}));}
			toast.success("Project Deleted Successfully");
			setConfirmModal(!confirmModal);
		}else{
			toast.error("something wend wrong");
			setConfirmModal(!confirmModal);
		}
	};

	useEffect(()=>{
		if(response.projects.length!==0 && currentPage>Math.ceil(response.projects.length / postsPerPage)){
			setCurrentPage(Math.ceil(response.projects.length / postsPerPage));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[response.projects.length]);

	const tableHeadings = userRes.role === "admin" ? ["Name", "Teams", "Members", "Todos", "Budget","Actions"]:["Name", "Teams", "Todos", "Budget"];

	const tableData:object[] = [];

	const randomColor = ["#78C1F3","#9BE8D8","#E2F6CA","#FDA769","#FFCACC"];

	data?.forEach((item:projectstype,index)=>{
		const color = index%5;
		{userRes.role==="admin" ? tableData.push({
			Name: <div className='project_name'><span className='p_icon' style={{background:randomColor[color]}}>{item.name?.substring(0,1).toUpperCase()}</span>{item.name}</div>,
			Teams: "None",
			Members: <Button onClick={()=>handleMemberModal(item.id || "")} className='addmember_button_wrapper' type='button'><User/></Button>,
			Todos: item.todo?.length,
			Budget: "",
			Actions: <ToggleMenu classname="action_toggle" onclick={()=>setData(item)} button_content={<>Actions <DownArrow/></>} selectMenuList={[{text:"Edit Project",handleclick:()=>setUpdate()},{text:"Delete Project",handleclick:() => handleDeleteModal()}]}/>
		}) : tableData.push({
			Name: <div className='project_name'><span className='p_icon' style={{background:randomColor[color]}}>{item.name?.substring(0,1)}</span>{item.name}</div>,
			Teams: "None",
			Todos: item.todo?.length,
			Budget: "",
		});}
	});

	const memberNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
		const { name, value } = e.target;
		setSearchMember((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProjects(e.target.value);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
		setProjectName(e.target.value);
	};

	const handleMemberModal = (id:string) =>{
		setProjectId(id); 
		dispatch(MembersbyProject({id:projectId}));
		dispatch(UsersList({job:"0",technology:"0",role:"All"}));
		setMemberModal(!memberModal);
	};

	const handleRemove = (id:string) =>{
		dispatch(DeleteMemberfromProject({id:id}));
	};

	const addMemberList:addmemberlistobj[] = [];

	const checkboxChange = (e:React.ChangeEvent<HTMLInputElement>) => {
		const newArray:boolean[] = [...values];
		newArray[Number(e.target.id)] = !newArray[Number(e.target.id)];
		setValues(newArray);
	};

	const clientsList:menuitemtype[] = [];

	clientRes?.clientlist?.forEach((item:clientobj)=>clientsList.push({name:item.name,id:item.id}));

	const content = <div className='add_projects_feilds'>
		<TextField name='projectname' error={error.project} label='Project Name' placeholder='Enter Project Name' value={projectName} onChange={handleInputChange}/>
		<Dropdown label='Select Client' dropdownList={clientsList} dropdownValue={selectedClient} setDropdownValue={setSelectedClient}/>
		<div className='switch_toggle_wrapper'>
			<ToggleSwitch
				id="showComplated"
				small
				optionLabels={["Yes", "No"]}
				checked={isInternal}
				onChange={setIsInternal}
				disabled={false}
				name="internal"
			/>
			<label htmlFor="showComplated">Is Project Internal?</label>
		</div>
	</div>;

	{membersRes.userslist?.map((elementPerent:userlistobj) =>{
		let isInProject = false;
		memberByProject.memberbyprojectlist?.map((elementChild:userlistobj)=>{
			if(elementPerent.id===elementChild.fk_user){
				isInProject = true;
			}
		});
		if(!isInProject){
			addMemberList.push({name:elementPerent.first_name,id:elementPerent.id});
		}
	});}

	const renderMembers = <div className='members_feilds'>
		<div className="tabs_container2">
			<Tabs selectedClass='selected_button' selectedTab={selectedModal} setSelectedTab={setSelectedModal} tabsData={modalTabs}/>
		</div>
		{selectedModal===modalTabs[0]?
			<>
				<div className='search_feilds'>
					<SearchInput placeholder='Search members' value={searchMember.addSearch} name="addSearch" onChange={memberNameChange}/>
					{/* <Button className='selectall_button' type="button">Select all</Button>
					<Button className='clearall_button' type='button'>Clear all</Button> */}
				</div>
				<div className="memberlist_wrapper">
					<div className="memberslist">
						{addMemberList.length === 0 && "No Member Availble To Add"}
						{searchMember.addSearch==="" && addMemberList.map((item,index)=>{
							return <Checkbox checked={values[index]} onChange={(e)=>checkboxChange(e)} key={index} value={values[index]} name='checkbox' label={item.name} id={`${index}`}/>;
						})}
						{searchMember.addSearch!=="" && addMemberList.map((item,index)=>{
							if(item.name.includes(searchMember.addSearch)){
								return <Checkbox checked={values[index]} onChange={(e)=>checkboxChange(e)} key={index} value={values[index]} name='checkbox' label={item.name} id={`${index}`}/>;
							}
						})}
					</div>
				</div>
			</>:<>
				<div>
					<SearchInput placeholder='Search members' value={searchMember.removeSearch} name="removesearch" onChange={memberNameChange}/>
				</div>
				<div className="memberlist_wrapper">
					<div className="memberslist">
						{memberByProject.memberbyprojectlist.length === 0 && "No Member To Remove"}
						{searchMember.removeSearch==="" && memberByProject.memberbyprojectlist?.map((item:userlistobj,index:number)=>{
							return <div key={index} className="member remove_wrapper">{item.user?.first_name}<Button className="remove_feilds" type='button' onClick={()=> handleRemove(item.id)}><Close/></Button></div>;
						})}
						{searchMember.removeSearch!=="" && memberByProject.memberbyprojectlist?.map((item:userlistobj,index:number)=>{
							if(item.user?.first_name.includes(searchMember.removeSearch)){
								return <div key={index} className="member remove_wrapper">{item.user?.first_name}<Button className="remove_feilds" type='button' onClick={()=> handleRemove(item.id)}><Close/></Button></div>;
							}
						})}
					</div>
				</div>
			</>
		}
	</div>;

	const addProject = async() =>{
		let valid = true;
		setError({project: ""});
		if(projectName === ""){
			setError((prev) => ({...prev,project: "Project name must be required."}));
			valid = false;
		}
		if(valid){
			let data = {};
			if(selectedClient.id!=="0"){
				data = {
					name:projectName,
					is_internal:isInternal.includes("internal")?true:false,
					fk_client : selectedClient.id
				};
			}else{
				data = {
					name:projectName,
					is_internal:isInternal.includes("internal")?true:false,
				};
			}
			const res = await dispatch(Addproject(data));
			if(res.payload.status === 1){
				{userRes.role==="member" && dispatch(Getprojects({name:"/get-my-projects",dashboard:true}));}
				{userRes.role==="admin" && dispatch(Getprojects({}));}
				toast.success("Project Created Successfully");
			}else{
				toast.error("Something Went Wrong");
			}
			setProjectName("");
			setSelectedClient({name:"All",id:"0"});
			setIsInternal([]);
			setShowModal(!showModal);
		}
	};

	const updateMembers = () =>{
		const data:addmemberdata[] = [];
		addMemberList.map((item,index)=>{
			if(values[index]===true){
				data.push({fk_user:item.id,fk_project:projectId});
			}
		});
		setProjectId("0");
		setValues([]);
		setSearchMember({addSearch:"",removeSearch:""});
		dispatch(AddMemberstoProject({members:data}));
		setMemberModal(!memberModal);
	};

	const handleModal = () =>{
		setProjectName("");
		setSelectedClient({name:"All",id:"0"});
		setIsInternal([]);
		setError({project: ""});
		setShowModal(!showModal);
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
		if (currentPage !== Math.ceil(response.projects.length / postsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleDeleteModal = () =>{
		setConfirmModal(!confirmModal);
	};

	return (
		<Page>
			<div className="main">
				<div className="projects">
					<div className="title">
						<h1 className='heading_2'>Projects</h1>
					</div>
					<div className="tabs_container">
						<Tabs selectedClass='selected_button2' selectedTab={selectedTab} setSelectedTab={setSelectedTab} tabsData={tabsData}/>
					</div>
					<div className="tableheader">
						<SearchInput name="projects" value={projects} onChange={handleChange} placeholder="Search projects"/>
						{userRes.role === "admin" && <Button
							type="button"
							className='Add_project_button'
							onClick={handleModal}
						>Add projects</Button>}
						{showModal && <Modal handleClose={handleModal} actionName='Add Project' title='Add Project' content={content} onClick={handleModal} showModal={showModal} handleAction={addProject}/>}
						{memberModal && <Modal handleClose={handleCloseModal} actionName='Save' title='Members' content={renderMembers} onClick={handleCloseModal} showModal={memberModal} handleAction={updateMembers}/>}
						{updateModal && <Modal handleClose={handleUpdateModal} actionName='Update Project' title='Update' content={content} onClick={handleUpdateModal} showModal={updateModal} handleAction={updateProject}/>}
						{confirmModal && <Modal showModal={confirmModal} handleClose={handleDeleteModal} onClick={handleDeleteModal} title="Confirm" content={<h1 className='confirm_message'>Are You Sure Want To Delete?</h1>} actionName="Yes" handleAction={handleDelete}/>}
					</div>
					{response.isLoading?<Spinner/>:
						<>
							<div className="table_wrapper">
								{selectedTab === tabsData[0] ? (						
									(tableData?.length>0 ? <Table tableHeadings={tableHeadings} tableData={tableData} />:<NoData/>)	
								) : (
									<h1 className='message'>No projects</h1>
								)}
							</div>
							{selectedTab === tabsData[0]&& response?.projects?.length>5 && <Paginate postsPerPage={postsPerPage} currentPage={currentPage} totalDatas={response.projects.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} setPostPerPage={setPostPerPage}/>}
						</>
					}
				</div>
			</div>
		</Page>
	);
};

export default Projects;
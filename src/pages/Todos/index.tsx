import React,{useEffect, useState} from 'react';
import { menuitemtype,projectstype, todolistobj, userlistobj } from '../../utils/types';
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store';
import { Getprojects } from '../../redux/services/dashboard';
import {TodoList,AddTodo, MarkComplate, UpdateTodo} from "../../redux/services/todo";
import { UsersList } from '../../redux/services/people';
import { Button, Dropdown, Modal, NoData, Page, Paginate, SearchInput, Table, TextField, ToggleSwitch, ToggleMenu, Spinner } from '../../components';
import { DownArrow } from '../../assets/images';
import "../../assets/style/pages/Todos/style.scss";
import { ProjectsbyMember } from '../../redux/services/projectmember';
import { toast } from 'react-toastify';

const Todos = () => {
	const [values,setValues] = useState({todo:"",todoName:""});
	const [showComplated,setShowComplated] = useState<string[]>([]);
	const [selectedAssignee,setSelectedAssignee] = useState({name:"Select Assignee",id:"0"});
	const [selectedProject,setSelectedProject] = useState({name:"Select Project",id:"0"});
	const [todoUser,setTodoUser] = useState({name:"Select Assignee",id:"0"});
	const [todoProject,setTodoProject] = useState({name:"Select Project",id:"0"});
	const [error,setError] = useState({todoName:"",project:"",assignee:""});
	const [showModal,setShowModal] = useState(false);
	const [updateModal,setUpdateModal] = useState(false);
	const [actionData,setActionData] = useState<todolistobj|null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage,setPostPerPage] = useState(5);

	const dispatch = useAppDispatch();
	const userRes = useAppSelector((state:RootState)=>state.userData);
	const response = useAppSelector((state:RootState)=>state.todosData);
	const responseDash = useAppSelector((state:RootState)=>state.dashboardData);
	const resAssignee = useAppSelector((state:RootState)=>state.membersData);
	const projectsByMember = useAppSelector((state:RootState)=>state.projectmemberData);

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const data = response?.todolist?.slice(indexOfFirstPost, indexOfLastPost);

	useEffect(()=>{
		dispatch(Getprojects({name:userRes.role==="admin"?"":"/get-my-projects"}));
		{userRes.role==="admin" && dispatch(UsersList({job:"0",technology:"0",role:"All"}));}
	},[dispatch,userRes.role]);
	
	useEffect(()=>{
		dispatch(ProjectsbyMember({id:todoUser.id}));
	},[todoUser.id,dispatch]);

	useEffect(()=>{
		{userRes.role==="admin" ? dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:selectedAssignee.id})):
			dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:userRes.user.id===""?"0":userRes.user.id}));}
	},[dispatch,userRes,showComplated,selectedAssignee.id,selectedProject.id]);

	useEffect(()=>{
		if(response.status === 1){
			{userRes.role==="admin" ? dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:selectedAssignee.id})):
				dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:userRes.user.id===""?"0":userRes.user.id}));}
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[response.status]);

	useEffect(()=>{
		if(response.todolist.length!==0 && currentPage>Math.ceil(response.todolist.length / postsPerPage)){
			setCurrentPage(Math.ceil(response.todolist.length / postsPerPage));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[response.todolist.length]);

	const handleUpdate = async() =>{
		let valid = true;
		setError({todoName:"",project:"",assignee:""});

		if(values.todoName === ""){
			setError((prev) => ({...prev,todoName: "Todo name must be required."}));
			valid = false;
		}

		if(todoProject.id==="0"){
			setError((prev) => ({...prev,project: "Please select project."}));
			valid = false;
		}

		if(todoUser.id==="0"){
			setError((prev) => ({...prev,assignee: "Please select assignee."}));
			valid = false;
		}
		
		if(valid){
			const res = await dispatch(UpdateTodo({id:actionData?.id,obj:{title: values.todoName,fk_project: todoProject.id,fk_user: todoUser.id}}));
			if(res.payload.status === 1){
				{userRes.role==="admin" ? dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:selectedAssignee.id})):
					dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:userRes.user.id===""?"0":userRes.user.id}));}
				toast.success("Todo Updated Successfully");
			}
			setTodoProject({name:"Select Project",id:"0"});
			setTodoUser({name:"Select Assignee",id:"0"});
			setValues((prev) => ({...prev,todoName:""}));
			setError({todoName:"",project:"",assignee:""});
			setUpdateModal(!updateModal);
		}
	};

	const handleUpdateModal = () =>{
		setTodoProject({name:"Select Project",id:'0'});
		setTodoUser({name:"Select Assignee",id:'0'});
		setValues((prev) => ({...prev,todoName:""}));
		setError({todoName:"",project:"",assignee:""});
		setUpdateModal(!updateModal);
	};

	const updateComplate = () =>{
		dispatch(MarkComplate({id:actionData?.id ,obj:{is_completed:actionData?.is_completed?false:true}}));
	};

	const setUpdate = () =>{
		setTodoUser({name:actionData?.user?.first_name || "Select Assignee",id:actionData?.fk_user || "0"});
		setTodoProject({name:actionData?.project?.name || "Select Project",id:actionData?.fk_project || "0"});
		setValues((prev) => ({...prev,todoName:actionData?.title || ""}));
		setUpdateModal(!updateModal);
	};

	const setData = (item:todolistobj) =>{
		setActionData(item);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const projectsList:menuitemtype[] = [];
	const assigneeList:menuitemtype[] = [];
	const projectsByMemberList:menuitemtype[] = [];

	{userRes.role==="admin"?
		resAssignee?.userslist?.forEach((item:userlistobj)=>assigneeList.push({name:item.first_name!==null?item.first_name:"",id:item.id})):
		assigneeList.push({name:userRes.user.first_name,id:userRes.user.id});
	projectsByMember?.projectbymemberlist?.forEach((item:projectstype)=>projectsByMemberList.push({name:item?.project?.name || "",id:item.fk_project || ""}));}
	responseDash?.projects?.forEach((item:projectstype)=>projectsList.push({name:item.name || "",id:item.id || "0"}));


	const content = <div className='add_todo_feilds'>
		<TextField name='todoName' error={error.todoName} label='Name' placeholder='Enter Todo' value={values.todoName} onChange={handleInputChange}/>
		<Dropdown dropdownList={assigneeList} label="Select Assignee" error={error.assignee} dropdownValue={todoUser} setDropdownValue={setTodoUser} />
		<Dropdown dropdownList={userRes.role==="admin"?projectsByMemberList:projectsList} error={error.project} label='Select Project' dropdownValue={todoProject} setDropdownValue={setTodoProject}/>
	</div>;

	const addTodo = async() =>{
		let valid = true;
		setError({todoName:"",project:"",assignee:""});

		if(values.todoName === ""){
			setError((prev) => ({...prev,todoName: "Todo name must be required."}));
			valid = false;
		}

		if(todoProject.id==="0"){
			setError((prev) => ({...prev,project: "Please select project."}));
			valid = false;
		}

		if(todoUser.id==="0"){
			setError((prev) => ({...prev,assignee: "Please select assignee."}));
			valid = false;
		}
		
		if(valid){
			const res = await dispatch(AddTodo({title: values.todoName,fk_project: todoProject.id,fk_user: todoUser.id}));
			if(res.payload.status === 1){
				{userRes.role==="admin" ? dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:selectedAssignee.id})):
					dispatch(TodoList({projectid:selectedProject.id,iscomplated:showComplated.includes("todos")?true:false,userid:userRes.user.id===""?"0":userRes.user.id}));}
				toast.success("Todo Created Successfully");
			}else{
				toast.error("Something Went Wrong");
			}
			setTodoProject({name:"Select Project",id:"0"});
			setTodoUser({name:"Select Assignee",id:"0"});
			setValues((prev) => ({...prev,todoName:""}));
			setError({todoName:"",project:"",assignee:""});
			setShowModal(!showModal);
		}
	};

	const handleModal = () =>{
		setTodoProject({name:"Select Project",id:"0"});
		setTodoUser({name:"Select Assignee",id:"0"});
		setValues((prev) => ({...prev,todoName:""}));
		setError({todoName:"",project:"",assignee:""});
		setShowModal(!showModal);
	};

	const tableHeadings = ["Todo", "Assignee", "Project", "Actions"];

	const tableData:object[] = [];

	data?.forEach((item:todolistobj)=>{
		tableData.push({
			Todo: item.title,
			Assignee: item?.user?.first_name,
			Project: item?.project?.name,
			Actions:<ToggleMenu classname="action_toggle" onclick={()=>setData(item)} button_content={<>Actions <DownArrow/></>} selectMenuList={[{text:"Edit",handleclick:()=>setUpdate()},{text:showComplated.includes("todos")?"Reopen todo":"Mark as complate",handleclick:()=>updateComplate()}]}/>
		});
	});

	const paginate = (pageNumber:number) => {
		setCurrentPage(pageNumber);
	};

	const previousPage = () => {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	};
	
	const nextPage = () => {
		if (currentPage !== Math.ceil(response.todolist.length / postsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<Page>
			<div className="main">
				<div className="todos">
					<div className="title">
						<h1 className='heading_2'>To-dos</h1>
					</div>
					<div className="filter_container">
						<div className="select_menus">
							<div className="select_col">
								<label>PROJECT</label>
								<Dropdown dropdownList={projectsList} dropdownValue={selectedProject} setDropdownValue={setSelectedProject}/>
							</div>
							<div className="select_col">
								<label>ASSIGNEE</label>
								<Dropdown dropdownList={assigneeList} dropdownValue={selectedAssignee} setDropdownValue={setSelectedAssignee}/>
							</div>
						</div>
						<div className="add_todo_wrapper">
							<Button
								type="button"
								className='Add_todo_button'
								onClick={handleModal}
							>Add a to-do</Button>
							{updateModal && <Modal handleClose={handleUpdateModal} actionName='Update' title='Update To-do' content={content} onClick={handleUpdateModal} showModal={updateModal} handleAction={handleUpdate}/>}
							{showModal && <Modal handleClose={handleModal} actionName='Add To-do' title='Add To-do' content={content} onClick={handleModal} showModal={showModal} handleAction={addTodo}/>}
						</div>
					</div>
					<div className="tableheader">
						<div className='toggle_wrapper'>
							<ToggleSwitch
								id="showComplated"
								small
								optionLabels={["Yes", "No"]}
								checked={showComplated}
								onChange={setShowComplated}
								disabled={false}
								name="todos"
							/>
							<label htmlFor="showComplated">SHOW COMPLETED TO-DOS</label>
						</div>
						<SearchInput name="todo" value={values.todo} onChange={handleInputChange} placeholder="Search to-dos"/>
					</div>
					{response.isLoading?<Spinner/>:
						<>
							<div className="table_wrapper">						
								{tableData?.length>0?<Table tableHeadings={tableHeadings} tableData={tableData} />:<NoData/>}	
							</div>
							{response?.todolist?.length>5 && <Paginate postsPerPage={postsPerPage} currentPage={currentPage} 
								totalDatas={response.todolist.length}
								paginate={paginate} previousPage={previousPage} nextPage={nextPage} setPostPerPage={setPostPerPage}/>}
						</>}
				</div>
			</div> 
		</Page>
	);
};

export default Todos;
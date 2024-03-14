import React, { useEffect,useState } from 'react';
import { userlistobj } from '../../utils/types';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { DeleteMember, UsersList } from '../../redux/services/people';
import { Button, Drawer, Modal, NoData, Page, Paginate, SearchInput, Spinner, Table, ToggleMenu,} from '../../components';
import AddMember from '../AddMember';
import "../../assets/style/pages/People/style.scss";
import { DownArrow } from '../../assets/images';
import { toast } from 'react-toastify';

const People = () => {
	const [showDrawer,setShowDrawer] = useState(false);
	const [showCreate,setShowCreate] = useState(false);
	const [showUpdate,setShowUpdate] = useState(false);
	const [members,setMembers] = useState("");
	const [confirmModal,setConfirmModal] = useState(false);
	const [membersRole,setMembersRole] = useState({name:"All",id:"0"});
	const [filterJob,setFilterJob] = useState({name:"All",id:"0"});
	const [filterTechnology,setFilterTechnology] = useState({name:"All",id:"0"});
	const [actionData,setActionData] = useState<userlistobj|null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage,setPostPerPage] = useState(5);
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;

	const dispatch = useAppDispatch();
	
	const response = useAppSelector((state)=>state.membersData);
	const userRes = useAppSelector((state)=>state.userData);

	const data = response?.userslist?.slice(indexOfFirstPost, indexOfLastPost);

	useEffect(() => {
		{userRes.role==="admin" && dispatch(UsersList({role:membersRole.name,search_word:members,job:filterJob.id,technology:filterTechnology.id}));}
	}, [dispatch,filterJob.id,filterTechnology.id,membersRole.name,userRes.role,members]);

	useEffect(()=>{
		if(response.userslist.length!==0 && currentPage>Math.ceil(response.userslist.length / postsPerPage)){
			setCurrentPage(Math.ceil(response.userslist.length / postsPerPage));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	},[response.userslist.length]);

	const setData = (item:userlistobj) =>{
		setActionData(item);
	};

	const handleDeleteModal = () =>{
		setConfirmModal(!confirmModal);
	};

	const handleDelete = async() =>{
		const res = await dispatch(DeleteMember({id:actionData?.id || ""}));
		if(res.payload.status === 1){
			dispatch(UsersList({role:membersRole.name,search_word:members,job:filterJob.id,technology:filterTechnology.id}));
			toast.success("Member Deleted Successfully");
			setConfirmModal(!confirmModal);
		}else{
			toast.error("something wend wrong");
			setConfirmModal(!confirmModal);
		}
	};

	const tableHeadings = ["Name", "Email", "Role", "Job", "Technology","Actions"];

	const tableData:object[] = [];

	{userRes.role==="admin" && data.forEach((item:userlistobj)=>{
		tableData.push({
			Name: item.first_name,
			Email: item.email,
			Role:item.role,
			Job: item.job,
			Technology: item.technology,
			Actions: <ToggleMenu classname="action_toggle" onclick={()=>setData(item)} button_content={<>Actions <DownArrow/></>} selectMenuList={[{text:"Update Member",handleclick:() => setShowUpdate(true)},{text:"Delete Member",handleclick:() => handleDeleteModal()}]}/>
		});
	});}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMembers(e.target.value);
	};

	const handleDrawer = () =>{
		setShowDrawer(!showDrawer);
	};

	const handleCreate = () =>{
		setShowCreate(!showCreate);
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
		if (currentPage !== Math.ceil(response.userslist.length / postsPerPage)) {
			setCurrentPage(currentPage + 1);
		}
	};

	return (
		<Page>
			<div className='main'>
				<div className="people">
					<div className="people_title">
						<h1 className='heading_2'>Members</h1>
					</div>
					{userRes.isLoading ? <Spinner/>:(userRes.role==="member" && <NoData classname='nodata_msg_member'/>)}
					{(userRes.role==="admin") && ((showCreate || showUpdate)?<AddMember setShowCreate={setShowCreate} setShowUpdate={setShowUpdate} showUpdate={showUpdate} showCreate={showCreate}/>:<>
						<div className="tableheader">
							<SearchInput name="members" value={members} onChange={handleChange} placeholder="Search members"/>
							<div className='rightside'>
								<Button
									type="button"
									className='add_member_button'
									onClick={handleCreate}
								>Add members</Button>
								<Button type='button' className='filter_button' onClick={handleDrawer}>Filters</Button>
								<Drawer filterJob={filterJob} filterTechnology={filterTechnology} setFilterJob={setFilterJob} setFilterTechnology={setFilterTechnology} name="roles" onClick={handleDrawer} showDrawer={showDrawer} selectedRole={membersRole} setSelectedRole={setMembersRole} />
								{confirmModal && <Modal showModal={confirmModal} handleClose={handleDeleteModal} onClick={handleDeleteModal} title="Confirm" content={<h1 className='confirm_message'>Are You Sure Want To Delete?</h1>} actionName="Yes" handleAction={handleDelete}/>}
							</div>
						</div>
						{response.isLoading?<Spinner/>:<>
							<div className="table_wrapper">
								{tableData.length>0?<Table tableHeadings={tableHeadings} tableData={tableData} />:<NoData/>}
							</div>
							{(response?.userslist?.length>5)&&<Paginate postsPerPage={postsPerPage} currentPage={currentPage} totalDatas={response.userslist.length} paginate={paginate} previousPage={previousPage} nextPage={nextPage} setPostPerPage={setPostPerPage}/>}
						</>}
					</>)}
				</div>
			</div>
		</Page>
	);
};

export default People;

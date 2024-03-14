export interface ButtonProps {
    id?: string
    children: JSX.Element | string;
    sx?: object;
    className?: string;
    type: "button" | "submit" | "reset";
    onClick?: () => void;
    onSubmit?: () => void;
    variant?: 'primary' | 'secondary' | 'text';
    size?: 'small' | 'medium' | 'large';
    isDisabled?:boolean
}
export interface CardProps {
    children: JSX.Element
}
export interface PageProps {
    className?: string,
    children: JSX.Element
}
export interface TextFieldProps {
    id?: string,
    name: string;
    className?: string;
    value: string;
    required?: boolean;
    autocomplate?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    disable?: boolean;
    size?: 'small' | 'medium' | 'large';
    startIcon?:JSX.Element;
    endIcon?:JSX.Element;
}
export interface PasswordFieldProps {
    id?: string,
    name: string;
    className?: string;
    value: string;
    required?: boolean;
    autocomplate?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    disable?: boolean;
    size?: 'small' | 'medium' | 'large';
    startIcon?:JSX.Element;
    endIcon?:JSX.Element;
}
export interface EmailFieldProps {
    id?:string;
    name: string;
    className?: string;
    value: string | number;
    required?: boolean;
    autocomplate?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    placeholder?: string;
    error?: string;
    disable?: boolean;
    size?: 'small' | 'medium' | 'large';
    startIcon?:JSX.Element;
    endIcon?:JSX.Element;
}
export interface CheckboxProps {
    id?:string;
    name: string;
    className?: string;
    value: boolean;
    required?: boolean;
    autocomplate?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    label?: JSX.Element | string;
    checked?:boolean
}
export interface HeaderProps{
    hamburgerToggle: boolean;
    setHamburgerToggle: (arg0: boolean) => void;
}
export interface expandmenu{
    menuName: string;
    link: string;
}
export interface menulistobj{
    name: string,
    menus?: expandmenu[],
    link: string,
    icon: JSX.Element | string
}
export interface SidebarProps{
    hamburgerToggle: boolean;
    toggle: boolean;
    setToggle: (arg1: boolean) => void;
    menuList: menulistobj[];
}
export interface SidebarmenuProps{
    buttonName: string;
    list: expandmenu[];
    selectedMenu: string;
    setSelectedMenu: (arg0: string) => void;
}

export type selectmenutype = {
    link?: string;
    text?: string;
    icon?: JSX.Element;
    handleclick?: () => void;
}

export interface SelectmenuProps{
    selectMenuList: selectmenutype[];
    button_content: JSX.Element;
    classname?:string
    onclick?:()=>void | undefined
}

export interface DashboardcardProps{
    title: string;
    timer?: string;
    status?: string;   
    showCaseImg?:JSX.Element;
}
export interface TableProps{
    tableHeadings: string[];
    tableData: object[];
    title?: string;
    link?: string;
    linkName?:string;
}

export interface UrlsTableProps{
    tableHeadings: string[];
    tableData: urlsobj[];
}
export interface ReportTableProps{
    title: string;
    title1: string;
    title2: string;
    data:projectstype[];
    link?:string
}
export interface RecentActivityProps{
    recentActivityData: activityobj[]
    title:string
    link:string
}
export interface TabsProps{
    tabsData: string[];
    classname?:string;
    selectedTab:string;
    setSelectedTab:(arg1:string)=>void;
    selectedClass:string;
}

export interface menuitemtype{
    name:string;
    id:string;
    index?:number;
    values?:memberdataobj[];
    feildname?:string;
    email?:string
}

export interface memberdataobj{
    fname: string; 
    mname: string; 
    lname: string; 
    email: string; 
    password: string; 
    role: string; 
    job: string; 
    technology: string; 
    jobId: string; 
    technologyId: string;
}

export interface multiplelistobj{
    name?: string; 
    id?: string;
    feildName?:string;
    index?:number,
    values?:memberdataobj[];
    selectId?:string;
}

export interface DropdownProps{
    dropdownList: menuitemtype[] | { name: string; id: string; email?:string }[] | undefined;
    dropdownValue: selectobj | string | any;
    setDropdownValue?: ((arg1:selectobj) => void) | any;
    classname?:string
    multiple?: boolean
    index?:number
    values?:memberdataobj[]
    name?:string
    id?:string
    label?:string
    error?:string
    disable?: boolean
}

export interface selectobj {
    name:string
    id:string
}

export interface DrawerProps {
    onClick: () => void;
    showDrawer: boolean;
    name:string;
    selectedProject?:{name:string,id:string},
    setSelectedProject?:(arg:selectobj)=>void,
    level?:{name:string,id:string},
    setLevel?:(arg:selectobj)=>void,
    selectedRole?:{name:string,id:string},
    setSelectedRole?:(arg:selectobj)=>void,
    technologyMenu?:menuitemtype[],
    jobMenu?:menuitemtype[],
    selectedUser?:{name:string,id:string},
    setSelectedUser?:(arg:selectobj)=>void,
    filterJob?:selectobj,
    filterTechnology?:selectobj
    setFilterJob?:(arg:selectobj)=>void,
    setFilterTechnology?:(arg:selectobj)=>void,
    userMenu?:menuitemtype[],
    columns?:string[],
    setColumns?:(arg:string[])=>void
}
export interface SearchInputProps{
    placeholder: string;
    classname?: string;
    name:string;
    onChange:(arg1:React.ChangeEvent<HTMLInputElement>)=>void;
    value:string;
}
export interface TooltipProps{
    content?: string;
    direction?: string;
    sx: {
        color: string;
        background: string;
    };
}
export interface ActivityCardProps{
    project:string;
    screenshotsUrls: string[];
    task:string;
    startTime:string;
    endTime?:string;
    accuracy?:string;
    time?:string;
}
export interface ImageViewerProps{
    screenshotsUrls: string[];
    setToggle: (arg1:boolean)=>void;
    toggle:boolean;
}

export interface activityobj{
    activity_percentage:string
    date:string
    id:string
    duration:string
    end_time:string
    idle_time:string
    project:string
    screen_activity:string[]
    screenshots:string[]
    start_time:string
    todo:string
}

export interface ScreenshotsProps{
    activities: activityobj[]
}

export interface AllscreenshotsProps{
    activities: activityobj[]
}

export interface Todotypes{
    name:string,
    duration:string
}

export interface projectstype{
	duration?: string,
	id?:string,
	name?:string,
    title?:string,
	todo?:Todotypes[],
    domain?:string,
	date?:string,
	urls?:object[],
    user?:{
        first_name:string
    },
    project?:{
        name:string
    }
    fk_project?:string
    fk_client?:string
    is_internal?:boolean
}

export interface timethisweekobj{
    date: string
    duration:string
}

export interface timesheetobj{
    id:string
    member:string
    project:string
    todo:string
    date:string
    start_time:string
    end_time:string
    duration:string
    idle_time:string
    activity_percentage:string
    technology: string
    job:string
    email:string
    notes:string
    week:string
}

export interface todolistobj{
    id:string,
    title:string,
    fk_project:string,
    fk_user:string,
    duration: string,
    is_completed:boolean,
    status:string,
    user:{email:string,first_name:string,last_name:string},
    project:{name:string},
}

export interface projecttimeobj{
    name:string,
    duration:string,
    date:string
}

export interface todowidgetobj{
    title:string,
    duration:string
}

export interface initialStatetype{
	isLoading:boolean,
	isSuccess:boolean,
	projects: projectstype[],
	appurls:projectstype[],
    timeofweek: timethisweekobj[],
    timesheet: timesheetobj[]
    projecttime: projecttimeobj[]
    todos: todowidgetobj[]
}

export interface initialStatetodo{
    todolist: todolistobj[]
}

export interface todosparams{
    start_date:string,
    end_date:string
}

export interface timeofweekparams{
    startdate: string;
    enddate:string;
    userId?:string;
}

export interface timesheetparams{
    limit?:number
    skip?:number
    startdate?:string
    enddate?:string,
    userId?:string
    projectId?:string
    percentage?:string
}

export interface acitivitylistparams{
    startdate:string
    enddate:string
    limit:number
    skip:number
    project_id?: string
    min_percentage?:string
    userId?:string
}

export interface totaltimeparams{
    startdate:string
    enddate:string
    userId?:string
}

export interface appurlsparams{
    startdate:string
    enddate:string
    skip:number
    limit:number
    userId:string
}

export interface todolistparams{
    userid?: string
    projectid?:string
    iscomplate?:boolean
}

export interface getprojectsparams{
    name?:string
    limit?:string
    dashboard?:boolean
}

export interface ModalProps{
    handleAction?: ()=>void
    onClick: ()=>void
    showModal:boolean
    title: string
    content: JSX.Element
    actionName:string
    handleClose:()=>void
    isDisabled?: boolean
}

export interface Userlistparams{
    role?:string
    limit?:string
    skip?:string
    search_word?:string
    job?:string
    technology?:string
}

export interface userlistobj{
    id:string,
    role:string,
    first_name:string,
    middle_name:string,
    last_name:string,
    job:string,
    technology:string,
    email:string,
    status: string
    user?:{first_name:string}
    fk_user?:string
}

export interface Jobdropdownobj{
    id:string,
    value:string
    handleAction:(arg:object)=>void
}

export interface projectobj{
    is_internal:boolean
    fk_client:string | null
    estimated_hours: string | null 
    created_by :string  
    status : string
    duration?: string,
	id?:string,
	name?:string,
	todo?:Todotypes[],
    domain?:string,
	date?:string,
	urls?:object[],
}

export interface clientobj{
    id:string,
    name:string,
    contact:string,
    email:string,
    status:string
}

export interface PaginateProps{
    setPostPerPage: (arg:number)=>void,
    postsPerPage:number,
    currentPage:number,
    totalDatas:number,
    paginate:(arg:number)=>void,
    previousPage:()=>void,
    nextPage:()=>void,
}

export interface ReportCardProps{
    name:string,
    description:string
}

export interface ToggleSwitchProps{
    name:string
    id: string,
    checked: string[],
    onChange: (arg:string[])=>void,
    optionLabels: string[],
    small: boolean,
    disabled?: boolean
}

export interface todoparams{
    id?:string
    projectid?: string,
    userid?:string,
    iscomplated?:boolean
    obj?: object
}

export interface clientparams{
    id:string,
    obj?:object
}

export interface projectparams{
    id?:string,
    obj?:object
}

export interface addmemberdata{
    fk_user:string,
    fk_project:string
}

export interface projectmemberparams{
    id?:string
    members?: addmemberdata[]
}

export interface AddMemberProps{
    showCreate:boolean,
    setShowCreate:(arg:boolean)=>void,
    setShowUpdate:(arg:boolean)=>void,
    showUpdate:boolean
}

export interface addmemberlistobj{
    name:string,
    id:string
}

export interface NodataProps{
    classname?: string;
    content?:string | JSX.Element;
}

export interface projecttimeparams{
    start_date: string,
    end_date: string
}

export interface urlsparams{
    start_date: string,
    end_date:string
}

export interface urlobj{
    title:string,
    url:string,
    duration:string,
    last_visit_time:string
} 

export interface urlsobj {
    domain:string,
    date:string,
    duration:string,
    urls: urlobj[]
}

export interface totaltimeobj {
    date:string,
    duration:string
}

export interface tablesdataobj {
    date: string,
	duration:string,
	sheet:object[],
	tablesData: tableobj[]
}

export interface tableobj{
    Project:JSX.Element
	Duration:string
	Idle:string,
	Activity:string,
	Time:string,
	Member:string,
    Todo:string,
    Date:string,
    Email:string,
    Job:string,
    Technology:string,
    Week: string,
    Notes:string,
    hiddendate:string
}

export interface peopleparams{
    id:string
}
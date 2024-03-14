import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { timeofweekparams,timesheetparams,appurlsparams,getprojectsparams,projecttimeparams, todosparams } from "../../utils/types";

export const Getprojects = createAsyncThunk('dashboard/projects', async (obj:getprojectsparams, { rejectWithValue }) => {
	try {
		const projects =await API.get(`/project${obj.name?obj.name:""}${obj.dashboard?"?dashboard="+obj.dashboard:""}${obj.name && obj.dashboard?"&$limit=":"?$limit="}${obj.limit?obj.limit:"-1"}`);
		return projects.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const Appurls = createAsyncThunk('dashboard/appurls', async (obj:appurlsparams, { rejectWithValue }) => {
	try {
		const appurls =await API.get(`/widgets?widget_name=urls&start_date=${obj.startdate}&end_date=${obj.enddate}&$limit=${obj.limit}&$skip=${obj.skip}&fk_user:${obj.userId?obj.userId:""}`);
		return appurls.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const TimeOfWeek = createAsyncThunk('dashboard/workedtimebyweek', async (obj:timeofweekparams, { rejectWithValue }) => {
	try {
		const totalworkedtime =await API.get(`/widgets?widget_name=day&start_date=${obj.startdate}&end_date=${obj.enddate}${obj.userId?"&fk_user"+obj.userId:""}`);
		return totalworkedtime.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const GetTimesheet = createAsyncThunk('dashboard/accuracybyweek', async (obj:timesheetparams, { rejectWithValue }) => {
	try {
		const totalworkedtime =await API.get(`widgets?widget_name=timesheet&start_date=${obj.startdate || ""}&end_date=${obj.enddate || ""}&$limit=${obj.limit || -1}&$skip=${obj.skip || 0}${obj.userId?(obj.userId!=="0"?"&fk_user="+obj.userId:""):""}${obj.projectId?(obj.projectId!=="0"?"&fk_project="+obj.projectId:""):""}`);
		return totalworkedtime.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const GetProjectTime = createAsyncThunk('dashboard/getprojecttime', async (obj:projecttimeparams, { rejectWithValue }) => {
	try {
		const projecttime =await API.get(`/widgets?widget_name=project&start_date=${obj.start_date}&end_date=${obj.end_date}`);
		return projecttime.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const GetTodos = createAsyncThunk('dashboard/todos', async (obj:todosparams, { rejectWithValue }) => {
	try {
		const todos =await API.get(`/widgets?widget_name=todo&start_date=${obj.start_date}&end_date=${obj.end_date}`);
		return todos.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
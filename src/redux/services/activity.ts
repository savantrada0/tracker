import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { acitivitylistparams,totaltimeparams } from "../../utils/types";

export const ActivityList = createAsyncThunk('activity/list', async (obj:acitivitylistparams, { rejectWithValue }) => {
	try {
		const activity =await API.get(`/analysis?${(obj.project_id&&obj.project_id!=="0")?"fk_project="+obj.project_id:""}&start_date=${obj.startdate}&end_date=${obj.enddate}&$limit=${obj.limit}&$skip=${obj.skip}${(obj.min_percentage&&obj.min_percentage!=="")?"&min_activity_percentage="+obj.min_percentage:""}${(obj.userId&&obj.userId!=="0")?"&fk_user="+obj.userId:""}`);
		return activity.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const Totaltime = createAsyncThunk('activity/totaltime', async (obj:totaltimeparams , { rejectWithValue }) => {
	try {
		const time =await API.get(`/widgets?widget_name=day&start_date=${obj.startdate}&end_date=${obj.enddate}${obj.userId?(obj.userId==="0"?"":"&fk_user="+obj.userId):""}`);
		return time.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { timesheetparams } from "../../utils/types";

const customConfig = {
	headers: {
		'Content-Type': 'multipart/form-data'
	}
};

export const AddTime = createAsyncThunk('time/add', async (obj:object, { rejectWithValue }) => {
	try {
		const acitvity =await API.post("/activity-log",obj,customConfig);
		return acitvity.data;
	} catch (error) {
		return rejectWithValue(error);
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

export const GetCsvData = createAsyncThunk('timesheet/csvdata', async (obj:timesheetparams, { rejectWithValue }) => {
	try {
		const csvData =await API.get(`export-csv?start_date=${obj.startdate || ""}&end_date=${obj.enddate || ""}&$limit=${obj.limit || -1}&$skip=${obj.skip || 0}${obj.userId?(obj.userId!=="0"?"&fk_user="+obj.userId:""):""}${obj.projectId?(obj.projectId!=="0"?"&fk_project="+obj.projectId:""):""}${obj.percentage?(obj.percentage!=="0"?"&min_activity_percentage="+obj.percentage:""):""}`);
		return csvData.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const DownloadCsv = createAsyncThunk('timesheet/downloadcsv', async (obj:timesheetparams, { rejectWithValue }) => {
	try {
		const csvData =await API.get(`export-csv/download?start_date=${obj.startdate || ""}&end_date=${obj.enddate || ""}&$limit=${obj.limit || -1}&$skip=${obj.skip || 0}${obj.userId?(obj.userId!=="0"?"&fk_user="+obj.userId:""):""}${obj.projectId?(obj.projectId!=="0"?"&fk_project="+obj.projectId:""):""}${obj.percentage?(obj.percentage!=="0"?"&min_activity_percentage="+obj.percentage:""):""}`);
		return csvData.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
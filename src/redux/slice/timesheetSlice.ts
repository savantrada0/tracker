import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddTime, DownloadCsv, GetCsvData, GetTimesheet } from "../services/timesheet";
import API from "../api";

const initialState = {
	isLoading: true,
	isSuccess: false,
	timesheet: [],
	csvData: [],
	DownloadCsv: [],
	status: 0
};

export const timesheetSlice = createSlice({
	name: 'project',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(AddTime.pending, (state) => {
			state.isLoading = true;
			state.status = 0;
		});
		builder.addCase(AddTime.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.status = payload.status;
		});
		builder.addCase(AddTime.rejected, (state) => {
			state.isLoading = false;
			state.status = 0;
		});
		builder.addCase(GetTimesheet.pending, (state) => {
			state.isLoading = true;
			state.status = 0;
		});
		builder.addCase(GetTimesheet.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.timesheet = payload?.data;
			state.isLoading = false;
		});
		builder.addCase(GetCsvData.pending, (state) => {
			state.isLoading = true;
			state.status = 0;
		});
		builder.addCase(GetCsvData.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.csvData = payload?.data;
			state.isLoading = false;
		});
		builder.addCase(GetCsvData.rejected, (state) => {
			state.isLoading = false;
			state.status = 0;
		});
		builder.addCase(DownloadCsv.pending, (state) => {
			state.isLoading = true;
			state.status = 0;
		});
		builder.addCase(DownloadCsv.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.DownloadCsv = payload?.data;
			API.get('/result.csv');
			state.isLoading = false;
		});
		builder.addCase(DownloadCsv.rejected, (state) => {
			state.isLoading = false;
			state.status = 0;
		});
	},
});

export default timesheetSlice.reducer;
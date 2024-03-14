import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Appurls, GetProjectTime, GetTimesheet, GetTodos, Getprojects, TimeOfWeek } from "../services/dashboard";
import { initialStatetype } from "../../utils/types";

const initialState:initialStatetype = {
	projects: [],
	todos: [],
	appurls: [],
	timeofweek: [],
	timesheet: [],
	projecttime: [],
	isLoading: true,
	isSuccess: false,
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(Getprojects.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(Getprojects.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.projects = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(Appurls.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(Appurls.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.appurls = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(TimeOfWeek.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(TimeOfWeek.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.timeofweek = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(GetTimesheet.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(GetTimesheet.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.timesheet = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(GetProjectTime.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(GetProjectTime.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.projecttime = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(GetTodos.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(GetTodos.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.todos = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
	},
});

export default dashboardSlice.reducer;
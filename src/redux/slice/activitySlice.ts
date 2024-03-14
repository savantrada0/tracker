import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ActivityList, Totaltime } from "../services/activity";

const initialState = {
	data: [],
	totaltime: [],
	isLoading: true,
	isSuccess: false,
};

export const activitySlice = createSlice({
	name: 'activity',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(ActivityList.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(ActivityList.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.data = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(ActivityList.rejected, (state) => {
			state.isLoading = false;
			state.isSuccess = false;
		});
		builder.addCase(Totaltime.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(Totaltime.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.totaltime = payload.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
	},
});

export default activitySlice.reducer;
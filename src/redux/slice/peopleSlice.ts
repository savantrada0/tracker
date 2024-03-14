import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CreateMember, JobsList, TechnologiesList, UsersList } from "../services/people";

const initialState = {
	userslist: [],
	jobslist: [],
	technologieslist: [],
	status: 0,
	isLoading: true,
	isSuccess: false,
};

export const peopleSlice = createSlice({
	name: 'people',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(UsersList.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(UsersList.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.userslist = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(JobsList.pending, (state) => {
			state.isLoading = false;
			state.isSuccess = false;
		});
		builder.addCase(JobsList.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.jobslist = payload.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(TechnologiesList.pending, (state) => {
			state.isLoading = false;
			state.isSuccess = false;
		});
		builder.addCase(TechnologiesList.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.technologieslist = payload.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(CreateMember.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.status = 0;
		});
		builder.addCase(CreateMember.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.status = payload.status;
			state.isSuccess = true;
		});
		builder.addCase(CreateMember.rejected, (state) => {
			state.isLoading = false;
			state.status = 0;
			state.isSuccess = false;
		});
	},
});

export default peopleSlice.reducer;
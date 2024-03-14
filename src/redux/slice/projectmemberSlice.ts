import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ProjectsbyMember,MembersbyProject, AddMemberstoProject, DeleteMemberfromProject } from "../services/projectmember";

const initialState = {
	projectbymemberlist:[],
	memberbyprojectlist:[],
	isLoading: true,
	isSuccess: false,
	status: 0
};

export const projectmemberSlice = createSlice({
	name: 'projectmember',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(ProjectsbyMember.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(ProjectsbyMember.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.projectbymemberlist = payload?.data;
			state.isLoading = false;
		});
		builder.addCase(MembersbyProject.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(MembersbyProject.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.memberbyprojectlist = payload.data;
			state.isLoading = false;
		});
		builder.addCase(AddMemberstoProject.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.status = 0;
		});
		builder.addCase(AddMemberstoProject.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.status = payload.status;
		});
		builder.addCase(DeleteMemberfromProject.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.status = 0;
		});
		builder.addCase(DeleteMemberfromProject.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.status = payload.status;
		});
	},
});

export default projectmemberSlice.reducer;
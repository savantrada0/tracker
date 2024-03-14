import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Addproject, Deleteproject, Updateproject } from "../services/project";

const initialState = {
	isLoading: true,
	isSuccess: false,
	message: ""
};

export const projectSlice = createSlice({
	name: 'project',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(Addproject.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(Addproject.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.message = payload.message;
		});
		builder.addCase(Updateproject.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(Updateproject.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.message = payload.message;
		});
		builder.addCase(Deleteproject.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(Deleteproject.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.message = payload.message;
		});
	},
});

export default projectSlice.reducer;
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddClient, ClientList, DeleteClient, GetClient, UpdateClient } from "../services/client";

const initialState = {
	client: null,
	clientlist: [],
	isLoading: true,
	isSuccess: false,
	status:0,
	message: ""
};

export const clientSlice = createSlice({
	name: 'client',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(AddClient.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.status = 0;
		});
		builder.addCase(AddClient.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.message = payload.message;
			state.status = payload.status;
		});
		builder.addCase(ClientList.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(ClientList.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.clientlist = payload?.data;
			state.isLoading = false;
		});
		builder.addCase(UpdateClient.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.status  = 0;
		});
		builder.addCase(UpdateClient.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.message = payload.message;
			state.status = payload.status;
		});
		builder.addCase(DeleteClient.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.status = 0;
		});
		builder.addCase(DeleteClient.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.message = payload.message;
			state.status = payload.status;
		});
		builder.addCase(GetClient.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(GetClient.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.client = payload.data;
			state.isLoading = false;
		});
	},
});

export default clientSlice.reducer;
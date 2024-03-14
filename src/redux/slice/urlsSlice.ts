import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Urls } from "../services/urls";

const initialState = {
	urls: [],
	isLoading: true,
	isSuccess: false,
};

export const urlsSlice = createSlice({
	name: 'urls',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(Urls.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(Urls.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.urls = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
	},
});

export default urlsSlice.reducer;
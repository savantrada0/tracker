import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddTodo, MarkComplate, TodoList, UpdateTodo } from "../services/todo";

const initialState = {
	todolist: [],
	isLoading: true,
	isSuccess: false,
	message:"",
	status:0
};

export const todoSlice = createSlice({
	name: 'todo',
	initialState: initialState,
	reducers: {
	},
	extraReducers(builder) {
		builder.addCase(AddTodo.pending, (state) => {
			state.message="";
			state.isLoading = true;
			state.isSuccess= false;
		});
		builder.addCase(AddTodo.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.message = payload.message;
		});
		builder.addCase(TodoList.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(TodoList.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.todolist = payload?.data;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(UpdateTodo.pending, (state) => {
			state.message="";
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(UpdateTodo.fulfilled, (state,{ payload }: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.message = payload.message;
		});
		builder.addCase(MarkComplate.pending, (state) => {
			state.isLoading = true;
			state.isSuccess = false;
			state.status = 0;
		});
		builder.addCase(MarkComplate.fulfilled, (state,{payload}:PayloadAction<any>) => {
			state.status = payload.status;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(MarkComplate.rejected, (state,{payload}:PayloadAction<any>) => {
			state.status = payload.status;
			state.isLoading = false;
			state.isSuccess = false;
		});
	},
});

export default todoSlice.reducer;
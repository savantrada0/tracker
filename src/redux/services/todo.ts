import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import {todoparams} from "../../utils/types";

export const TodoList = createAsyncThunk('todos/list', async (data:todoparams, { rejectWithValue }) => {
	try {
		const todos =await API.get(`/todo?${data.projectid!="0"?"&fk_project="+data.projectid:""}${data.userid!="0"?"&fk_user="+data.userid:""}${data.iscomplated!==undefined?"&is_completed="+data.iscomplated : ""}`);
		return todos.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const AddTodo = createAsyncThunk('todos/add', async (data:object, { rejectWithValue }) => {
	try {
		const todo =await API.post("/todo",data);
		return todo.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const UpdateTodo = createAsyncThunk('todos/update', async (data:todoparams, { rejectWithValue }) => {
	try {
		const todo =await API.patch(`/todo/${data.id}`,data.obj);
		return todo.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const MarkComplate = createAsyncThunk('todos/mark', async (data:todoparams, { rejectWithValue }) => {
	try {
		const todo =await API.patch(`/todo/${data.id}`,data.obj);
		return todo.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
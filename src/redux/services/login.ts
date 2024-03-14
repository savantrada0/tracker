import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";

export const Login = createAsyncThunk('user/login', async (data:object, { rejectWithValue }) => {
	try {
		const user = await API.post("/authentication",data);
		return user.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const GetUser = createAsyncThunk('user/getuser', async (arg, { rejectWithValue }) => {
	try {
		const user = await API.get("/users/profile/me");
		return user.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const UpdateUser = createAsyncThunk('users/update', async (data:any, { rejectWithValue }) => {
	try {
		const user = await API.patch(`/users/${data.id}`,data.obj);
		return user.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});
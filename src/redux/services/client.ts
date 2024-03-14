import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientparams} from "../../utils/types";
import API from "../api";

export const ClientList = createAsyncThunk('clients/list', async (arg, { rejectWithValue }) => {
	try {
		const clients =await API.get("/client");
		return clients.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const AddClient = createAsyncThunk('clients/add', async (data:object, { rejectWithValue }) => {
	try {
		const client =await API.post("/client",data);
		return client.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const UpdateClient = createAsyncThunk('clients/update', async (data:clientparams, { rejectWithValue }) => {
	try {
		const client =await API.patch(`/client/${data.id}`,data.obj);
		return client.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const DeleteClient = createAsyncThunk('clients/delete', async (data:clientparams, { rejectWithValue }) => {
	try {
		const client =await API.delete(`/client/${data.id}`);
		return client.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const GetClient = createAsyncThunk('clients/get', async (data:clientparams, { rejectWithValue }) => {
	try {
		const client =await API.get(`/client/${data.id}`);
		return client.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
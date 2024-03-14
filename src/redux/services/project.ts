import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import {projectparams} from "../../utils/types";

export const Addproject = createAsyncThunk('project/add', async (obj:object, { rejectWithValue }) => {
	try {
		const project =await API.post("/project",obj);
		return project.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const Updateproject = createAsyncThunk('clients/update', async (data:projectparams, { rejectWithValue }) => {
	try {
		const project =await API.patch(`/project/${data.id}`,data.obj);
		return project.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const Deleteproject = createAsyncThunk('clients/delete', async (data:projectparams, { rejectWithValue }) => {
	try {
		const project =await API.delete(`/project/${data.id}`);
		return project.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
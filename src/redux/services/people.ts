import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { Userlistparams, peopleparams } from "../../utils/types";

export const UsersList = createAsyncThunk('peoples/list', async (obj:Userlistparams, { rejectWithValue }) => {
	try {
		const users =await API.get(`users/get-users?$limit=${obj.limit?obj.limit:"-1"}&$skip=${obj.skip?obj.skip:"0"}${obj.search_word?"&search_keyword="+obj.search_word:""}${obj.job==="0"?"":"&job="+obj.job}${obj.technology==="0"?"":"&technology="+obj.technology}${obj.role==="All"?"":"&role="+obj.role}`);
		return users.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const JobsList = createAsyncThunk('jobs/list', async (arg, { rejectWithValue }) => {
	try {
		const jobs =await API.get("/lookup?label=job&$select[]=id&$select[]=value");
		return jobs.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const TechnologiesList = createAsyncThunk('technologies/list', async (arg, { rejectWithValue }) => {
	try {
		const technologies =await API.get("/lookup?label=technology&$select[]=id&$select[]=value");
		return technologies.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const CreateMember = createAsyncThunk('peoples/add', async (obj:object, { rejectWithValue }) => {
	try {
		const member =await API.post("/users",obj);
		return member.data;
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const DeleteMember = createAsyncThunk('peoples/delete', async (data:peopleparams, { rejectWithValue }) => {
	try {
		const member =await API.delete(`/users/${data.id}`);
		return member.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import { projectmemberparams } from "../../utils/types";

export const ProjectsbyMember = createAsyncThunk('projectmember/projectlist', async (obj:projectmemberparams, { rejectWithValue }) => {
	try {
		const projects =await API.get(`/project-member?$limit=-1${obj.id==="0"?"":"&fk_user="+obj.id}`);
		return projects.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const MembersbyProject = createAsyncThunk('projectmember/memberlist', async (obj:projectmemberparams, { rejectWithValue }) => {
	try {
		const members =await API.get(`/project-member?$limit=-1${obj.id?(obj.id==="0"?"":"&fk_project="+obj.id):""}`);
		return members.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const AddMemberstoProject = createAsyncThunk('projectmember/addmember', async (obj:projectmemberparams, { rejectWithValue }) => {
	try {
		const members =await API.post('/project-member',obj.members);
		return members.data;
	} catch (error) {
		rejectWithValue(error);
	}
});

export const DeleteMemberfromProject = createAsyncThunk('projectmember/deletemember', async (obj:projectmemberparams, { rejectWithValue }) => {
	try {
		const member =await API.delete(`/project-member/${obj.id}`);
		return member.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
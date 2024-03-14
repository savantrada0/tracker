import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api";
import {urlsparams} from "../../utils/types";

export const Urls = createAsyncThunk('urls/list', async (obj:urlsparams, { rejectWithValue }) => {
	try {
		const urls =await API.get(`/widgets?widget_name=urls&start_date=${obj.start_date}&end_date=${obj.end_date}&$limit=-1&$skip=0`);
		return urls.data;
	} catch (error) {
		rejectWithValue(error);
	}
});
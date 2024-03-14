import userSlice from "./slice/userSlice";
import activitySlice from "./slice/activitySlice";
import dashboardSlice from "./slice/dashboardSlice";
import peopleSlice from "./slice/peopleSlice";
import projectSlice from "./slice/projectSlice";
import timesheetSlice from "./slice/timesheetSlice";
import todoSlice from "./slice/todoSlice";
import clientSlice from "./slice/clientSlice";
import projectmemberSlice from "./slice/projectmemberSlice";
import urlsSlice from "./slice/urlsSlice";
import { AnyAction, Reducer, combineReducers } from "@reduxjs/toolkit";
import { RootState } from "./store";

const combinedReducer = combineReducers({
	userData: userSlice,
	activityData: activitySlice,
	dashboardData: dashboardSlice,
	membersData: peopleSlice,
	projectData: projectSlice,
	timesheetData: timesheetSlice,
	todosData: todoSlice,
	clientsData: clientSlice,
	projectmemberData: projectmemberSlice,
	urlsData: urlsSlice
});

export const RootReducer:Reducer = (state:RootState, action:AnyAction) => {
	if (action.type === 'user/LogoutReducer') {
		state = {} as RootState;
	}
	return combinedReducer(state, action);
};
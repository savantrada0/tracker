import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { GetUser, Login, UpdateUser } from "../services/login";

export interface UserType{
	token:string,
	user: {
		id:string,email:string,first_name:string,middle_name: string, last_name: string,role: string,technology:string,job:string,password: string
	},
	role:string,
	isLoading:boolean,
	isSuccess:boolean
	status: number,
	message: string
}

const accessToken = localStorage.getItem("token");
const initialState:UserType = {
	token: accessToken?JSON.parse(accessToken):"",
	user: {id:"",email:"",first_name:"",middle_name: "", last_name: "",role: "", technology:"", job:"",password:""},
	role: "",
	isLoading: true,
	isSuccess: false,
	status: 1,
	message: ""
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		LogoutReducer: (state) => {
			localStorage.clear();
			state.token = "";
			state.user = {id:"",email:"",first_name:"",middle_name: "", last_name: "", role: "", technology:"", job:"",password:""};
		}
	},
	extraReducers(builder) {
		builder.addCase(Login.pending, (state) => {
			state.isLoading = true;
			state.isSuccess= false;
		});
		builder.addCase(Login.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.user = payload?.data?.user;
			state.token = payload?.data?.accessToken;			state.role = payload?.data?.user?.role;
			state.status = payload?.status;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(Login.rejected, (state, { payload }: PayloadAction<any>) => {
			state.status = payload?.response?.data?.status;
			state.isLoading = false;
			state.isSuccess = false;
		});
		builder.addCase(GetUser.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(GetUser.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.message = "";
			state.user = payload?.data;
			state.role = payload?.data?.role;
			state.status = payload?.status;
			state.isLoading = false;
			state.isSuccess = true;
		});
		builder.addCase(UpdateUser.pending, (state) => {
			state.message = "";
			state.isLoading = true;
			state.isSuccess = false;
		});
		builder.addCase(UpdateUser.fulfilled, (state, { payload }: PayloadAction<any>) => {
			state.user = payload.data;
			state.role = payload?.data?.role;
			state.isLoading = false;
			state.isSuccess = true;
			state.status = payload?.status;
			state.message = payload?.message;
		});
		builder.addCase(UpdateUser.rejected, (state, { payload }: PayloadAction<any>) => {
			state.status= payload.status;
			state.message= payload.message;
			state.isLoading = false;
			state.isSuccess = false;
		});
	},
});

export const { LogoutReducer } = userSlice.actions;

export default userSlice.reducer;
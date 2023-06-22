import { createSlice } from "@reduxjs/toolkit";

export const ProfileSlice = createSlice({
  name: "profile",
  initialState: {
    isLoggedIn: false,
    profile: {}, //email , name , phone_number , sub ==ID
  },
  reducers: {
    setProfile: (state, action) => {
      return { ...state, isLoggedIn: true, profile: action.payload };
    },
    updateEmail: (state,action)=>
    {
      return {...state,isLoggedIn:true, profile:{...state.profile,"email":action.payload}}
    },
    updateName: (state,action)=>
    {
      return {...state,isLoggedIn:true, profile:{...state.profile,"name":action.payload}}
    },
    logout: (state, action) => {
      return {
        ...state,
        loggedIn: false,
        profile:{},
      };
    },
    resetProfile:(state,action) =>
    {
      return {...state, profile:{}}
    },
    update: (state, action) => {
      return { ...state, profile: {...state.profile,...action.payload}};
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProfile,resetProfile, logout, update,updateEmail,updateName } = ProfileSlice.actions;

export default ProfileSlice.reducer;

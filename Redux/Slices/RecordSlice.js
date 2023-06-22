import { createSlice } from "@reduxjs/toolkit";

export const RecordSlice = createSlice({
  name: "Record",
  initialState: {
    name:"",
    audio_uri: "",

  },
  reducers: {
    setName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    setAudioUri: (state, action) => {
      return {
        ...state,
        audio_uri: action.payload,
      };
    },
    resetRecord: (state, action) => {
      return {
        ...state,
        name: "",
        audio_uri: "",
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {setName,setAudioUri,resetRecord} = RecordSlice.actions;

export default RecordSlice.reducer;

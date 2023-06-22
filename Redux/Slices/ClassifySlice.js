import { createSlice } from "@reduxjs/toolkit";

export const ChildrenSlice = createSlice({
  name: "children",
  initialState: {
    children:[],
    loaded:false,
    // name:"", array will have objects of the following attributes
    // DOB:"",
    //id:""
    // image:"",
    // vaccinesTaken:[],
    //vaccinesNotTaken:
    //bookings:
  },
  reducers: {
    addChild: (state, action) => {
      if(state.children.includes(action.payload))
      {
        return {...state,loaded:true}
      }
      return { ...state, loaded:true, children: [...state.children,action.payload] };
    },
    resetChildren: (state,action) =>
    {
      return {...state,children:[]}
    },
  }
});

// Action creators are generated for each case reducer function
export const { addChild,resetChildren } = ChildrenSlice.actions;

export default ChildrenSlice.reducer;

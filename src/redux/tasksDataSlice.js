import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const tasksDataSlice = createSlice({
  name: 'tasksData',
  initialState,
  reducers: {
    setData: (state, action) =>{
        if(!action.payload.module){
          state.value = action.payload
        }
        else if(action.payload.activeElement.id && action.payload.module === "tasks"){
          state.value.forEach(el => {
            if(el.id === action.payload.res.id){
              el.description= action.payload.activeElement.description;
              el.duedate= action.payload.activeElement.duedate;
              el.priority= action.payload.activeElement.priority;
              el.priorityName= action.payload.activeElement.priorityName;
            }
          })
        }
        else if(!action.payload.activeElement.id && action.payload.module){
          state.value.push(action.payload.res);
        }
    },
    markDone: (state, action)=>{
      state.value.forEach(el => {
        if(el.id === action.payload.id){
          el.done = action.payload.done;
        }
      })
    },
    deleteElement:(state, action)=>{
      state.value = state.value.filter(el => el.id !== action.payload.id);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setData, markDone, deleteElement } = tasksDataSlice.actions

export default tasksDataSlice.reducer
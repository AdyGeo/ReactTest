import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const notesDataSlice = createSlice({
  name: 'notesData',
  initialState,
  reducers: {
    setData: (state, action) =>{
      if(!action.payload.module){
        state.value = action.payload
      }
      else if(action.payload.activeElement.id && action.payload.module === "notes"){
        state.value.forEach(el => {
          if(el.id === action.payload.res.id){
            el.title = action.payload.activeElement.title;
            el.description= action.payload.activeElement.description;
          }
        })
      }
      else if(!action.payload.activeElement.id && action.payload.module){
        state.value.push(action.payload.res);
      }
    },
    deleteElement:(state, action)=>{
      state.value = state.value.filter(el => el.id !== action.payload.id);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setData, markDone, deleteElement } = notesDataSlice.actions

export default notesDataSlice.reducer
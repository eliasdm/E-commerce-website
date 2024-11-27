import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers:{
    setUserDatails : (state,action)=>{
        state.user=action.payload
        console.log("user details.......",action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { setUserDatails } = userSlice.actions

export default userSlice.reducer
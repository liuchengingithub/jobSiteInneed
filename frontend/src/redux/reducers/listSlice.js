import {createSlice} from '@reduxjs/toolkit'
//设置状态的初始值
const initialState = {
    jobList : []
}
export const listSlice = createSlice({
    name:'jobList',
    initialState,
    reducers:{
        updateList:(state, action)=>{
            state.jobList = action.payload
        }
    }
})

export const {updateList} = searchSlice.actions
export default searchSlice.reducer
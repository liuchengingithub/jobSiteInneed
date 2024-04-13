import {createSlice} from '@reduxjs/toolkit'
//设置状态的初始值
const initialState = {
    keyword : ''
}
export const searchSlice = createSlice({
    name:'searchJob',
    initialState,
    reducers:{
        onSearch:(state, action)=>{
            state.keyword = action.payload === undefined? '': action.payload
        }
    }
})

export const {onSearch} = searchSlice.actions
export default searchSlice.reducer
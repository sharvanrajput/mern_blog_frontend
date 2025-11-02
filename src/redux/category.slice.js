import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    category: []
}

export const categorySlice = createSlice({
    name: "cagetory",
    initialState,
    reducers: {
        setCategory: (state, action) => {
            state.category = action.payload
        }
    }
})

export const { setCategory } = categorySlice.actions
export default categorySlice.reducer
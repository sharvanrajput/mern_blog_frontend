import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    comments: []
}

export const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        setComments: (state, action) => {
            state.comments = action.payload || []
        },
        unsetComment: (state, action) => {
            state.comments = []
        }
    }
})

export const { setComments, unsetComment } = commentSlice.actions
export default commentSlice.reducer

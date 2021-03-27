import { createSlice } from '@reduxjs/toolkit'

const reducerSlice = createSlice({
  name: 'user_interface',
  initialState: {
    data: 
  },
  reducers: {
    openEditModal: (state, action) => {
      state.editModalIsOpen.isOpen = true;
      state.editModalIsOpen.id = action.payload
    },
  }
})

export const {  } = reducerSlice.actions

export default reducerSlice.reducer
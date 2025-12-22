import { createSlice } from '@reduxjs/toolkit'
import AddMasterClassForm from '../../components/AddMasterClassForm/AddMasterClassForm'

const initialState = {
  items: [
    {
      id: 1,
      title: "Питание при диабете",
      price: 2500,
      description: "Основы правильного питания при сахарном диабете",
      doctor: "Доктор Иванова",
    },
    {
      id: 2, 
      title: "Инсулинорезистентность",
      price: 3000,
      description: "Как справиться с инсулинорезистентностью",
      doctor: "Доктор Петров",
    }
  ],
}

const masterClassesSlice = createSlice({
  name: 'masterClasses',
  initialState,
  reducers: {
    addMasterClass: (state, action) => {
      const newClass = {
        id: Date.now(),
        ...action.payload
      }
      state.items.push(newClass)
    },
    updateMasterClass: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id)
      if (index !== -1) {
        state.items[index] = action.payload
      }
    },
    deleteMasterClass: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    }
  }
})

export const { addMasterClass, updateMasterClass, deleteMasterClass } = masterClassesSlice.actions
export default masterClassesSlice.reducer
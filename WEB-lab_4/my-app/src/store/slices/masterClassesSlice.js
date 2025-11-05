import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [
    {
      id: 1,
      title: "Правильное питание для начинающих",
      description: "Основы здорового питания и составление рациона",
      price: 2500,
      participants: ["Анна Иванова", "Петр Сидоров", "Мария Козлова"],
      content: "В этом мастер-классе вы узнаете основы правильного питания, научитесь составлять сбалансированный рацион и подбирать продукты согласно вашим потребностям.",
      duration: 120,
      category: "основы",
      difficulty: "начальный",
      instructor: "Доктор Смирнова",
      date: "2024-02-15",
      maxParticipants: 20
    },
    {
      id: 2,
      title: "Диетические десерты без сахара",
      description: "Приготовление вкусных и полезных десертов",
      price: 3500,
      participants: ["Ольга Петрова", "Иван Кузнецов"],
      content: "Научимся готовить вкусные десерты без сахара и вредных добавок. Практический мастер-класс с дегустацией.",
      duration: 90,
      category: "десерты",
      difficulty: "средний",
      instructor: "Шеф-повар Орлова",
      date: "2024-02-20",
      maxParticipants: 15
    }
  ],
  currentClass: null,
  loading: false,
  error: null
};

const masterClassesSlice = createSlice({
  name: 'masterClasses',
  initialState,
  reducers: {
    // Создание нового мастер-класса
    addMasterClass: (state, action) => {
      const newClass = {
        ...action.payload,
        id: Math.max(...state.items.map(item => item.id)) + 1,
        participants: []
      };
      
      // Валидация данных
      if (!newClass.title || !newClass.description || !newClass.price) {
        state.error = "Все обязательные поля должны быть заполнены";
        return;
      }
      
      if (newClass.price < 0) {
        state.error = "Цена не может быть отрицательной";
        return;
      }
      
      state.items.push(newClass);
      state.error = null;
    },
    
    // Обновление мастер-класса
    updateMasterClass: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.items.findIndex(item => item.id === id);
      
      if (index !== -1) {
        // Валидация при обновлении
        if (updates.price && updates.price < 0) {
          state.error = "Цена не может быть отрицательной";
          return;
        }
        
        state.items[index] = { ...state.items[index], ...updates };
        state.error = null;
      }
    },
    
    // Удаление мастер-класса
    deleteMasterClass: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);
    },
    
    // Добавление участника
    addParticipant: (state, action) => {
      const { classId, participantName } = action.payload;
      const masterClass = state.items.find(item => item.id === classId);
      
      if (masterClass) {
        if (masterClass.participants.length >= masterClass.maxParticipants) {
          state.error = "Достигнуто максимальное количество участников";
          return;
        }
        
        if (masterClass.participants.includes(participantName)) {
          state.error = "Участник уже записан на этот мастер-класс";
          return;
        }
        
        masterClass.participants.push(participantName);
        state.error = null;
      }
    },
    
    // Установка текущего мастер-класса для просмотра
    setCurrentClass: (state, action) => {
      state.currentClass = action.payload;
    },
    
    // Очистка ошибок
    clearError: (state) => {
      state.error = null;
    },
    
    // Установка состояния загрузки
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  addMasterClass,
  updateMasterClass,
  deleteMasterClass,
  addParticipant,
  setCurrentClass,
  clearError,
  setLoading
} = masterClassesSlice.actions;

export default masterClassesSlice.reducer;
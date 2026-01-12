import api from './api';

export const instructorService = {
  // Получить всех инструкторов
  getAll: async (params = {}) => {
    const response = await api.get('/instructors', { params });
    return response.data;
  },

  // Получить инструктора по ID
  getById: async (id) => {
    const response = await api.get(`/instructors/${id}`);
    return response.data;
  },

  // Проверить существование инструктора
  checkExists: async (id) => {
    const response = await api.get(`/instructors/${id}/exists`);
    return response.data;
  },

  // Создать инструктора
  create: async (data) => {
    const response = await api.post('/instructors', data);
    return response.data;
  },

  // Обновить инструктора
  update: async (id, data) => {
    const response = await api.put(`/instructors/${id}`, data);
    return response.data;
  },

  // Удалить инструктора
  delete: async (id) => {
    const response = await api.delete(`/instructors/${id}`);
    return response.data;
  },
};

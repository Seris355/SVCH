import api from './api';

export const masterClassService = {
  // Получить все мастер-классы
  getAll: async (params = {}) => {
    const response = await api.get('/masterclasses', { params });
    return response.data;
  },

  // Получить мастер-класс по ID
  getById: async (id) => {
    const response = await api.get(`/masterclasses/${id}`);
    return response.data;
  },

  // Проверить существование мастер-класса
  checkExists: async (id) => {
    const response = await api.get(`/masterclasses/${id}/exists`);
    return response.data;
  },

  // Создать мастер-класс
  create: async (data) => {
    const response = await api.post('/masterclasses', data);
    return response.data;
  },

  // Обновить мастер-класс
  update: async (id, data) => {
    const response = await api.put(`/masterclasses/${id}`, data);
    return response.data;
  },

  // Удалить мастер-класс
  delete: async (id) => {
    const response = await api.delete(`/masterclasses/${id}`);
    return response.data;
  },
};


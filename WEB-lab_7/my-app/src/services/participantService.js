import api from './api';

export const participantService = {
  // Получить всех участников
  getAll: async (params = {}) => {
    const response = await api.get('/participants', { params });
    return response.data;
  },

  // Получить участника по ID
  getById: async (id) => {
    const response = await api.get(`/participants/${id}`);
    return response.data;
  },

  // Проверить существование участника
  checkExists: async (id) => {
    const response = await api.get(`/participants/${id}/exists`);
    return response.data;
  },

  // Создать участника
  create: async (data) => {
    const response = await api.post('/participants', data);
    return response.data;
  },

  // Обновить участника
  update: async (id, data) => {
    const response = await api.put(`/participants/${id}`, data);
    return response.data;
  },

  // Удалить участника
  delete: async (id) => {
    const response = await api.delete(`/participants/${id}`);
    return response.data;
  },
};

import React, { useState, useEffect } from 'react';
import { instructorService } from '../../services/instructorService';
import { participantService } from '../../services/participantService';
import './MasterClassForm.css';

const MasterClassForm = ({ masterClass, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    date: '',
    photo: '',
    instructorId: '',
    participantIds: [],
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [instructorsRes, participantsRes] = await Promise.all([
          instructorService.getAll({ limit: 1000 }),
          participantService.getAll({ limit: 1000 }),
        ]);
        setInstructors(instructorsRes.data);
        setParticipants(participantsRes.data);
      } catch (err) {
        alert('Ошибка при загрузке данных');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (masterClass) {
      const date = masterClass.date ? new Date(masterClass.date).toISOString().slice(0, 16) : '';
      setFormData({
        name: masterClass.name || '',
        description: masterClass.description || '',
        price: masterClass.price || '',
        date: date,
        photo: masterClass.photo || '',
        instructorId: masterClass.instructorId || '',
        participantIds: masterClass.participantIds || [],
      });
    }
  }, [masterClass]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Название обязательно для заполнения';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Название должно содержать минимум 2 символа';
    } else if (formData.name.trim().length > 200) {
      newErrors.name = 'Название не должно превышать 200 символов';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Описание обязательно для заполнения';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Описание должно содержать минимум 10 символов';
    } else if (formData.description.trim().length > 5000) {
      newErrors.description = 'Описание не должно превышать 5000 символов';
    }

    if (!formData.price) {
      newErrors.price = 'Цена обязательна для заполнения';
    } else if (isNaN(formData.price) || parseFloat(formData.price) < 0) {
      newErrors.price = 'Цена должна быть положительным числом';
    }

    if (!formData.date) {
      newErrors.date = 'Дата обязательна для заполнения';
    } else {
      const selectedDate = new Date(formData.date);
      const now = new Date();
      if (selectedDate <= now) {
        newErrors.date = 'Дата должна быть в будущем';
      }
    }

    if (formData.photo && formData.photo.trim()) {
      try {
        new URL(formData.photo);
      } catch {
        newErrors.photo = 'Некорректный URL';
      }
    }

    if (!formData.instructorId) {
      newErrors.instructorId = 'Инструктор обязателен для выбора';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleParticipantToggle = (participantId) => {
    setFormData(prev => {
      const currentIds = prev.participantIds || [];
      const newIds = currentIds.includes(participantId)
        ? currentIds.filter(id => id !== participantId)
        : [...currentIds, participantId];
      return { ...prev, participantIds: newIds };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setSubmitting(true);
    try {
      await onSubmit({
        name: formData.name.trim(),
        description: formData.description.trim(),
        price: parseFloat(formData.price),
        date: new Date(formData.date).toISOString(),
        photo: formData.photo.trim() || null,
        instructorId: parseInt(formData.instructorId),
        participantIds: formData.participantIds,
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Ошибка при сохранении';
      alert(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="loading">Загрузка...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content masterclass-form-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{masterClass ? 'Редактировать мастер-класс' : 'Добавить мастер-класс'}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="masterclass-form">
          <div className="form-group">
            <label htmlFor="name">
              Название <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
              placeholder="Введите название мастер-класса"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">
              Описание <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={errors.description ? 'error' : ''}
              placeholder="Введите описание мастер-класса"
              rows="4"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">
                Цена <span className="required">*</span>
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className={errors.price ? 'error' : ''}
                placeholder="0.00"
                step="0.01"
                min="0"
              />
              {errors.price && <span className="error-message">{errors.price}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="date">
                Дата <span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={errors.date ? 'error' : ''}
              />
              {errors.date && <span className="error-message">{errors.date}</span>}
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="photo">Фото (URL)</label>
            <input
              type="url"
              id="photo"
              name="photo"
              value={formData.photo}
              onChange={handleChange}
              className={errors.photo ? 'error' : ''}
              placeholder="https://example.com/photo.jpg"
            />
            {errors.photo && <span className="error-message">{errors.photo}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="instructorId">
              Инструктор <span className="required">*</span>
            </label>
            <select
              id="instructorId"
              name="instructorId"
              value={formData.instructorId}
              onChange={handleChange}
              className={errors.instructorId ? 'error' : ''}
            >
              <option value="">Выберите инструктора</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.fullName} - {instructor.specialization}
                </option>
              ))}
            </select>
            {errors.instructorId && <span className="error-message">{errors.instructorId}</span>}
          </div>

          <div className="form-group">
            <label>Участники</label>
            <div className="participants-select">
              {participants.map(participant => (
                <label key={participant.id} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formData.participantIds?.includes(participant.id) || false}
                    onChange={() => handleParticipantToggle(participant.id)}
                  />
                  <span>{participant.fullName} ({participant.email})</span>
                </label>
              ))}
              {participants.length === 0 && (
                <div className="empty-message">Нет доступных участников</div>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose} className="btn-secondary">
              Отмена
            </button>
            <button type="submit" className="btn-primary" disabled={submitting}>
              {submitting ? 'Сохранение...' : (masterClass ? 'Сохранить' : 'Создать')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MasterClassForm;


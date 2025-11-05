import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMasterClass, clearError } from '../../store/slices/masterClassesSlice';
import './AddMasterClassForm.css';

const AddMasterClassForm = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.masterClasses);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    duration: '',
    category: 'basics',
    difficulty: 'beginner',
    instructor: '',
    content: '',
    maxParticipants: 20
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const masterClassData = {
      ...formData,
      price: parseInt(formData.price),
      duration: parseInt(formData.duration),
      maxParticipants: parseInt(formData.maxParticipants),
      date: new Date().toISOString().split('T')[0]
    };

    dispatch(addMasterClass(masterClassData));
    
    // Если нет ошибок, закрываем форму
    if (!error) {
      setFormData({
        title: '',
        description: '',
        price: '',
        duration: '',
        category: 'basics',
        difficulty: 'beginner',
        instructor: '',
        content: '',
        maxParticipants: 20
      });
      if (onClose) onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Очищаем ошибку при изменении поля
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <div className="add-master-class-form">
      <h2>{t('addNewMasterClass')}</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('title')} *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('description')} *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="3"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('price')} (₽) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>{t('duration')} (мин) *</label>
            <input
              type="number"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>{t('category')}</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="basics">{t('basics')}</option>
              <option value="desserts">{t('desserts')}</option>
              <option value="breakfast">{t('breakfast')}</option>
              <option value="mainCourses">{t('mainCourses')}</option>
            </select>
          </div>

          <div className="form-group">
            <label>{t('difficulty')}</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="beginner">{t('beginner')}</option>
              <option value="intermediate">{t('intermediate')}</option>
              <option value="advanced">{t('advanced')}</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>{t('instructor')} *</label>
          <input
            type="text"
            name="instructor"
            value={formData.instructor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>{t('content')}</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Максимальное количество участников</label>
          <input
            type="number"
            name="maxParticipants"
            value={formData.maxParticipants}
            onChange={handleChange}
            min="1"
            max="100"
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-save">
            {t('save')}
          </button>
          <button type="button" onClick={onClose} className="btn-cancel">
            {t('cancel')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddMasterClassForm;
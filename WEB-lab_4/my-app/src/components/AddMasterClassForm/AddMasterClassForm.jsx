import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addMasterClass } from '../../store/slices/masterClassesSlice';
import './AddMasterClassForm.css';

const AddMasterClassForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    doctor: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.price || !formData.description || !formData.doctor) {
      alert('Заполните все поля');
      return;
    }

    if (formData.price < 0) {
      alert('Цена не может быть отрицательной');
      return;
    }

    dispatch(addMasterClass({
      ...formData,
      price: Number(formData.price)
    }));

    setFormData({
      title: '',
      price: '',
      description: '',
      doctor: ''
    });
    
    alert('Мастер-класс добавлен!');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="add-form">
      <h2>{t('addNewClass')}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>{t('title')}:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder={t('title')}
          />
        </div>

        <div className="form-group">
          <label>{t('price')} (руб.):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder={t('price')}
          />
        </div>

        <div className="form-group">
          <label>{t('doctor')}:</label>
          <input
            type="text"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            placeholder={t('doctor')}
          />
        </div>

        <div className="form-group">
          <label>{t('description')}:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('description')}
            rows="4"
          />
        </div>

        <button type="submit" className="submit-btn">
          {t('addClass')}
        </button>
      </form>
    </div>
  );
};

export default AddMasterClassForm;
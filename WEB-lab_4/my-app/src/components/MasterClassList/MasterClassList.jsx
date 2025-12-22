import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { deleteMasterClass, updateMasterClass } from '../../store/slices/masterClassesSlice';
import { setSearch, setPriceRange, setSortBy, resetFilters } from '../../store/slices/filtersSlice';
import EditMasterClassForm from '../EditMasterClassForm/EditMasterClassForm';
import './MasterClassList.css';

  const MasterClassList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.masterClasses);
  const { search, minPrice, maxPrice, sortBy } = useSelector(state => state.filters);
  const [editingItem, setEditingItem] = useState(null);

  const filteredClasses = items
    .filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.doctor.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    )
    .filter(item => item.price >= minPrice && item.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'doctor') return a.doctor.localeCompare(b.doctor);
      return a.title.localeCompare(b.title);
    });

  const handleDelete = (id) => {
    if (window.confirm(t('confirmDelete'))) {
      dispatch(deleteMasterClass(id));
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
  };

  return (
    <div className="master-class-list">
      {editingItem && (
        <EditMasterClassForm 
          item={editingItem} 
          onCancel={handleCancelEdit}
        />
      )}
      
      <div className="filters">
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={search}
          onChange={(e) => dispatch(setSearch(e.target.value))}
          className="search-input"
        />
        
        <div className="price-filter">
          <label>{t('priceFrom')}: </label>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => dispatch(setPriceRange({ min: Number(e.target.value), max: maxPrice }))}
          />
          <label> {t('priceTo')}: </label>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => dispatch(setPriceRange({ min: minPrice, max: Number(e.target.value) }))}
          />
        </div>

        <select 
          value={sortBy} 
          onChange={(e) => dispatch(setSortBy(e.target.value))}
          className="sort-select"
        >
          <option value="title">{t('sortTitle')}</option>
          <option value="price">{t('sortPrice')}</option>
          <option value="doctor">{t('sortDoctor')}</option>
        </select>

        <button onClick={() => dispatch(resetFilters())} className="reset-btn">
          {t('resetFilters')}
        </button>
      </div>

      <div className="classes-grid">
        {filteredClasses.map(item => (
          <div key={item.id} className="class-card">
            <h3>{item.title}</h3>
            <p className="doctor">{t('doctor')}: {item.doctor}</p>
            <p className="description">{item.description}</p>
            <p className="price">{t('price')}: {item.price} руб.</p>
            <div className="card-buttons">
              <button 
                onClick={() => handleEdit(item)}
                className="edit-btn"
              >
                {t('edit')}
              </button>
              <button 
                onClick={() => handleDelete(item.id)}
                className="delete-btn"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MasterClassList;
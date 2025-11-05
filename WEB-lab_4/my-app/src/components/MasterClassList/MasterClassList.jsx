import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentClass, deleteMasterClass } from '../../store/slices/masterClassesSlice';
import { setCategory, setDifficulty, setSortBy, setSearchQuery } from '../../store/slices/filtersSlice';
import './MasterClassList.css';

const MasterClassList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  
  const { items } = useSelector(state => state.masterClasses);
  const { category, difficulty, sortBy, searchQuery } = useSelector(state => state.filters);

  // Фильтрация и сортировка
  const filteredAndSortedClasses = items
    .filter(masterClass => {
      const matchesCategory = category === 'all' || masterClass.category === category;
      const matchesDifficulty = difficulty === 'all' || masterClass.difficulty === difficulty;
      const matchesSearch = masterClass.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          masterClass.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesDifficulty && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'priceLow':
          return a.price - b.price;
        case 'priceHigh':
          return b.price - a.price;
        case 'newest':
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const handleViewDetails = (masterClass) => {
    dispatch(setCurrentClass(masterClass));
    // Здесь можно добавить навигацию на страницу деталей
  };

  const handleDelete = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот мастер-класс?')) {
      dispatch(deleteMasterClass(id));
    }
  };

  return (
    <div className="master-class-list-container">
      <div className="filters-section">
        <h3>{t('filters')}</h3>
        
        <div className="filter-group">
          <input
            type="text"
            placeholder={t('search')}
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label>{t('category')}:</label>
          <select 
            value={category} 
            onChange={(e) => dispatch(setCategory(e.target.value))}
          >
            <option value="all">{t('all')}</option>
            <option value="basics">{t('basics')}</option>
            <option value="desserts">{t('desserts')}</option>
            <option value="breakfast">{t('breakfast')}</option>
            <option value="mainCourses">{t('mainCourses')}</option>
          </select>
        </div>

        <div className="filter-group">
          <label>{t('difficulty')}:</label>
          <select 
            value={difficulty} 
            onChange={(e) => dispatch(setDifficulty(e.target.value))}
          >
            <option value="all">{t('all')}</option>
            <option value="beginner">{t('beginner')}</option>
            <option value="intermediate">{t('intermediate')}</option>
            <option value="advanced">{t('advanced')}</option>
          </select>
        </div>

        <div className="filter-group">
          <label>{t('sortBy')}:</label>
          <select 
            value={sortBy} 
            onChange={(e) => dispatch(setSortBy(e.target.value))}
          >
            <option value="newest">{t('newest')}</option>
            <option value="priceLow">{t('priceLow')}</option>
            <option value="priceHigh">{t('priceHigh')}</option>
          </select>
        </div>
      </div>

      <div className="master-classes-grid">
        {filteredAndSortedClasses.length === 0 ? (
          <p className="no-classes">{t('noMasterClasses')}</p>
        ) : (
          filteredAndSortedClasses.map(masterClass => (
            <div key={masterClass.id} className="master-class-card">
              <div className="card-header">
                <h3 className="class-title">{masterClass.title}</h3>
                <span className="class-price">{masterClass.price} ₽</span>
              </div>
              
              <p className="class-description">{masterClass.description}</p>
              
              <div className="class-details">
                <span className="detail-item">
                  <strong>{t('instructor')}:</strong> {masterClass.instructor}
                </span>
                <span className="detail-item">
                  <strong>{t('duration')}:</strong> {masterClass.duration} мин
                </span>
                <span className="detail-item">
                  <strong>{t('participants')}:</strong> {masterClass.participants.length}/{masterClass.maxParticipants}
                </span>
              </div>

              <div className="card-actions">
                <button 
                  onClick={() => handleViewDetails(masterClass)}
                  className="btn-view"
                >
                  Подробнее
                </button>
                <button 
                  onClick={() => handleDelete(masterClass.id)}
                  className="btn-delete"
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MasterClassList;
import React from 'react';
import './MasterClassList.css';

const MasterClassList = ({
  masterClasses,
  loading,
  onEdit,
  onDelete,
  onView,
  filters,
  onFilterChange,
  pagination,
  onPageChange,
}) => {
  if (loading) {
    return <div className="loading">Загрузка...</div>;
  }

  return (
    <div className="masterclass-list-container">
      <div className="filters">
        <div className="filter-group">
          <label>Поиск:</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Поиск по названию или описанию..."
          />
        </div>
        <div className="filter-group">
          <label>ID Инструктора:</label>
          <input
            type="number"
            value={filters.instructorId}
            onChange={(e) => onFilterChange('instructorId', e.target.value)}
            placeholder="Фильтр по инструктору..."
          />
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>Цена от:</label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => onFilterChange('minPrice', e.target.value)}
              placeholder="0"
              step="0.01"
            />
          </div>
          <div className="filter-group">
            <label>Цена до:</label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => onFilterChange('maxPrice', e.target.value)}
              placeholder="10000"
              step="0.01"
            />
          </div>
        </div>
        <div className="filter-row">
          <div className="filter-group">
            <label>Дата от:</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => onFilterChange('dateFrom', e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>Дата до:</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => onFilterChange('dateTo', e.target.value)}
            />
          </div>
        </div>
        <div className="filter-group">
          <label>Сортировка:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
          >
            <option value="id">ID</option>
            <option value="name">Название</option>
            <option value="price">Цена</option>
            <option value="date">Дата</option>
            <option value="createdAt">Дата создания</option>
          </select>
          <select
            value={filters.sortOrder}
            onChange={(e) => onFilterChange('sortOrder', e.target.value)}
          >
            <option value="ASC">По возрастанию</option>
            <option value="DESC">По убыванию</option>
          </select>
        </div>
      </div>

      {masterClasses.length === 0 ? (
        <div className="empty-state">Мастер-классы не найдены</div>
      ) : (
        <>
          <div className="masterclass-grid">
            {masterClasses.map((masterClass) => (
              <div key={masterClass.id} className="masterclass-card">
                {masterClass.photo && (
                  <div className="masterclass-photo">
                    <img src={masterClass.photo} alt={masterClass.name} />
                  </div>
                )}
                <div className="masterclass-info">
                  <h3>{masterClass.name}</h3>
                  <p className="masterclass-description">
                    {masterClass.description.length > 100
                      ? `${masterClass.description.substring(0, 100)}...`
                      : masterClass.description}
                  </p>
                  <div className="masterclass-details">
                    <div className="detail-item">
                      <strong>Цена:</strong> {parseFloat(masterClass.price).toFixed(2)} ₽
                    </div>
                    <div className="detail-item">
                      <strong>Дата:</strong>{' '}
                      {new Date(masterClass.date).toLocaleString('ru-RU')}
                    </div>
                    {masterClass.instructor && (
                      <div className="detail-item">
                        <strong>Инструктор:</strong> {masterClass.instructor.fullName}
                      </div>
                    )}
                    <div className="detail-item">
                      <strong>Участников:</strong> {masterClass.participants?.length || 0}
                    </div>
                  </div>
                  <div className="card-actions">
                    <button
                      className="btn-view"
                      onClick={() => onView(masterClass)}
                    >
                      Просмотр
                    </button>
                    <button
                      className="btn-edit"
                      onClick={() => onEdit(masterClass)}
                    >
                      Редактировать
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => onDelete(masterClass.id)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={pagination.page === 1}
                onClick={() => onPageChange(pagination.page - 1)}
              >
                Назад
              </button>
              <span>
                Страница {pagination.page} из {pagination.totalPages}
              </span>
              <button
                disabled={pagination.page === pagination.totalPages}
                onClick={() => onPageChange(pagination.page + 1)}
              >
                Вперед
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MasterClassList;


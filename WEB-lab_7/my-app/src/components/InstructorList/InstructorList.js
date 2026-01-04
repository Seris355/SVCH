import React from 'react';
import './InstructorList.css';

const InstructorList = ({
  instructors,
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
    <div className="instructor-list-container">
      <div className="filters">
        <div className="filter-group">
          <label>Поиск:</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Поиск по ФИО или специализации..."
          />
        </div>
        <div className="filter-group">
          <label>Специализация:</label>
          <input
            type="text"
            value={filters.specialization}
            onChange={(e) => onFilterChange('specialization', e.target.value)}
            placeholder="Фильтр по специализации..."
          />
        </div>
        <div className="filter-group">
          <label>Сортировка:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange('sortBy', e.target.value)}
          >
            <option value="id">ID</option>
            <option value="fullName">ФИО</option>
            <option value="specialization">Специализация</option>
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

      {instructors.length === 0 ? (
        <div className="empty-state">Инструкторы не найдены</div>
      ) : (
        <>
          <table className="instructor-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ФИО</th>
                <th>Специализация</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {instructors.map((instructor) => (
                <tr key={instructor.id}>
                  <td>{instructor.id}</td>
                  <td>{instructor.fullName}</td>
                  <td>{instructor.specialization}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-view"
                        onClick={() => onView(instructor)}
                      >
                        Просмотр
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => onEdit(instructor)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => onDelete(instructor.id)}
                      >
                        Удалить
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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

export default InstructorList;



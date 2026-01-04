import React from 'react';
import './ParticipantList.css';

const ParticipantList = ({
  participants,
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
    <div className="participant-list-container">
      <div className="filters">
        <div className="filter-group">
          <label>Поиск:</label>
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
            placeholder="Поиск по ФИО, email или телефону..."
          />
        </div>
        <div className="filter-group">
          <label>Email:</label>
          <input
            type="text"
            value={filters.email}
            onChange={(e) => onFilterChange('email', e.target.value)}
            placeholder="Фильтр по email..."
          />
        </div>
        <div className="filter-group">
          <label>Телефон:</label>
          <input
            type="text"
            value={filters.phone}
            onChange={(e) => onFilterChange('phone', e.target.value)}
            placeholder="Фильтр по телефону..."
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
            <option value="email">Email</option>
            <option value="phone">Телефон</option>
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

      {participants.length === 0 ? (
        <div className="empty-state">Участники не найдены</div>
      ) : (
        <>
          <table className="participant-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>ФИО</th>
                <th>Email</th>
                <th>Телефон</th>
                <th>Действия</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td>{participant.id}</td>
                  <td>{participant.fullName}</td>
                  <td>{participant.email}</td>
                  <td>{participant.phone}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-view"
                        onClick={() => onView(participant)}
                      >
                        Просмотр
                      </button>
                      <button
                        className="btn-edit"
                        onClick={() => onEdit(participant)}
                      >
                        Редактировать
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => onDelete(participant.id)}
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

export default ParticipantList;


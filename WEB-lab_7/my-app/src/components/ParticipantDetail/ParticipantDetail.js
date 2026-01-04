import React from 'react';
import './ParticipantDetail.css';

const ParticipantDetail = ({ participant, onClose }) => {
  if (!participant) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Детальная информация об участнике</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="detail-content">
          <div className="detail-field">
            <label>ID:</label>
            <span>{participant.id}</span>
          </div>

          <div className="detail-field">
            <label>ФИО:</label>
            <span>{participant.fullName}</span>
          </div>

          <div className="detail-field">
            <label>Email:</label>
            <span>{participant.email}</span>
          </div>

          <div className="detail-field">
            <label>Телефон:</label>
            <span>{participant.phone}</span>
          </div>

          {participant.createdAt && (
            <div className="detail-field">
              <label>Дата создания:</label>
              <span>{new Date(participant.createdAt).toLocaleString('ru-RU')}</span>
            </div>
          )}

          {participant.updatedAt && (
            <div className="detail-field">
              <label>Дата обновления:</label>
              <span>{new Date(participant.updatedAt).toLocaleString('ru-RU')}</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantDetail;


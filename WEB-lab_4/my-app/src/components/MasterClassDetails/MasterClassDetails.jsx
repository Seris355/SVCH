import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { addParticipant, updateMasterClass, deleteMasterClass } from '../../store/slices/masterClassesSlice';
import './MasterClassDetails.css';

const MasterClassDetails = ({ masterClass, onClose, onEdit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { error } = useSelector(state => state.masterClasses);
  
  const [participantName, setParticipantName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...masterClass });

  const handleAddParticipant = (e) => {
    e.preventDefault();
    if (participantName.trim()) {
      dispatch(addParticipant({
        classId: masterClass.id,
        participantName: participantName.trim()
      }));
      if (!error) {
        setParticipantName('');
      }
    }
  };

  const handleSaveEdit = () => {
    dispatch(updateMasterClass({
      id: masterClass.id,
      updates: editData
    }));
    if (!error) {
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Вы уверены, что хотите удалить этот мастер-класс?')) {
      dispatch(deleteMasterClass(masterClass.id));
      if (onClose) onClose();
    }
  };

  if (!masterClass) return null;

  return (
    <div className="master-class-details">
      <div className="details-header">
        <h2>{masterClass.title}</h2>
        <button onClick={onClose} className="btn-close">×</button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="details-content">
        {!isEditing ? (
          <>
            <div className="detail-section">
              <h3>{t('description')}</h3>
              <p>{masterClass.description}</p>
            </div>

            <div className="detail-section">
              <h3>{t('content')}</h3>
              <p>{masterClass.content}</p>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <strong>{t('price')}:</strong>
                <span>{masterClass.price} ₽</span>
              </div>
              <div className="detail-item">
                <strong>{t('duration')}:</strong>
                <span>{masterClass.duration} {t('minutes')}</span>
              </div>
              <div className="detail-item">
                <strong>{t('category')}:</strong>
                <span>{t(masterClass.category)}</span>
              </div>
              <div className="detail-item">
                <strong>{t('difficulty')}:</strong>
                <span>{t(masterClass.difficulty)}</span>
              </div>
              <div className="detail-item">
                <strong>{t('instructor')}:</strong>
                <span>{masterClass.instructor}</span>
              </div>
              <div className="detail-item">
                <strong>Дата:</strong>
                <span>{masterClass.date}</span>
              </div>
            </div>

            <div className="detail-section">
              <h3>{t('participants')} ({masterClass.participants.length}/{masterClass.maxParticipants})</h3>
              {masterClass.participants.length > 0 ? (
                <ul className="participants-list">
                  {masterClass.participants.map((participant, index) => (
                    <li key={index} className="participant-item">
                      {participant}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Пока нет участников</p>
              )}
            </div>

            <form onSubmit={handleAddParticipant} className="add-participant-form">
              <input
                type="text"
                placeholder={t('participantName')}
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                disabled={masterClass.participants.length >= masterClass.maxParticipants}
              />
              <button 
                type="submit"
                disabled={!participantName.trim() || masterClass.participants.length >= masterClass.maxParticipants}
              >
                {t('addParticipant')}
              </button>
            </form>
          </>
        ) : (
          <div className="edit-form">
            <div className="form-group">
              <label>{t('title')}</label>
              <input
                type="text"
                value={editData.title}
                onChange={(e) => setEditData({...editData, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>{t('description')}</label>
              <textarea
                value={editData.description}
                onChange={(e) => setEditData({...editData, description: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>{t('content')}</label>
              <textarea
                value={editData.content}
                onChange={(e) => setEditData({...editData, content: e.target.value})}
                rows="4"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('price')}</label>
                <input
                  type="number"
                  value={editData.price}
                  onChange={(e) => setEditData({...editData, price: parseInt(e.target.value)})}
                />
              </div>
              <div className="form-group">
                <label>{t('duration')}</label>
                <input
                  type="number"
                  value={editData.duration}
                  onChange={(e) => setEditData({...editData, duration: parseInt(e.target.value)})}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="details-actions">
        {!isEditing ? (
          <>
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              {t('edit')}
            </button>
            <button onClick={handleDelete} className="btn-delete">
              {t('delete')}
            </button>
          </>
        ) : (
          <>
            <button onClick={handleSaveEdit} className="btn-save">
              {t('save')}
            </button>
            <button onClick={() => setIsEditing(false)} className="btn-cancel">
              {t('cancel')}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MasterClassDetails;
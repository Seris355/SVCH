import React, { useState, useEffect } from 'react';
import { participantService } from '../../../services/participantService';
import ParticipantForm from '../../../components/ParticipantForm/ParticipantForm';
import ParticipantList from '../../../components/ParticipantList/ParticipantList';
import ParticipantDetail from '../../../components/ParticipantDetail/ParticipantDetail';
import './Participants.css';

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [selectedParticipant, setSelectedParticipant] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    email: '',
    phone: '',
    sortBy: 'id',
    sortOrder: 'ASC',
  });

  const fetchParticipants = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      const response = await participantService.getAll(params);
      setParticipants(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при загрузке участников');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParticipants();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setEditingParticipant(null);
    setShowForm(true);
  };

  const handleEdit = (participant) => {
    setEditingParticipant(participant);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого участника?')) {
      try {
        await participantService.delete(id);
        fetchParticipants();
      } catch (err) {
        alert(err.response?.data?.message || 'Ошибка при удалении участника');
      }
    }
  };

  const handleView = (participant) => {
    setSelectedParticipant(participant);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingParticipant(null);
  };

  const handleCloseDetail = () => {
    setSelectedParticipant(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingParticipant) {
        await participantService.update(editingParticipant.id, data);
      } else {
        await participantService.create(data);
      }
      handleCloseForm();
      fetchParticipants();
    } catch (err) {
      throw err;
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  return (
    <div className="participants-page">
      <div className="participants-header">
        <h1>Управление участниками</h1>
        <button className="btn-primary" onClick={handleCreate}>
          Добавить участника
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <ParticipantList
        participants={participants}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        filters={filters}
        onFilterChange={handleFilterChange}
        pagination={pagination}
        onPageChange={handlePageChange}
      />

      {showForm && (
        <ParticipantForm
          participant={editingParticipant}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      {selectedParticipant && (
        <ParticipantDetail
          participant={selectedParticipant}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Participants;


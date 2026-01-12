import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchParticipants,
  createParticipant,
  updateParticipant,
  deleteParticipant,
  setPage,
  setFilters,
  resetFilters,
} from '../../../store/slices/participantsSlice';
import ParticipantForm from '../../../components/ParticipantForm/ParticipantForm';
import ParticipantList from '../../../components/ParticipantList/ParticipantList';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import './Participants.css';

const Participants = () => {
  const dispatch = useAppDispatch();
  const { items: participants, loading, error, pagination, filters } = useAppSelector((state) => state.participants);
  
  const [showForm, setShowForm] = useState(false);
  const [editingParticipant, setEditingParticipant] = useState(null);
  const [inputFilters, setInputFilters] = useState(filters);

  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      ...filters,
    };
    dispatch(fetchParticipants(params));
  }, [dispatch, pagination.page, filters]);

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
        await dispatch(deleteParticipant(id)).unwrap();
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        };
        dispatch(fetchParticipants(params));
      } catch (err) {
        alert(err.message || 'Ошибка при удалении участника');
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingParticipant(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingParticipant) {
        await dispatch(updateParticipant({ id: editingParticipant.id, participantData: data })).unwrap();
      } else {
        await dispatch(createParticipant(data)).unwrap();
      }
      handleCloseForm();
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      dispatch(fetchParticipants(params));
    } catch (err) {
      throw err;
    }
  };

  const handleFilterChange = (field, value) => {
    setInputFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    dispatch(setFilters(inputFilters));
  };

  const handleResetFilters = () => {
    const defaultFilters = {
      search: '',
      email: '',
      phone: '',
      sortBy: 'id',
      sortOrder: 'ASC',
    };
    setInputFilters(defaultFilters);
    dispatch(resetFilters());
  };

  const handlePageChange = (newPage) => {
    dispatch(setPage(newPage));
  };

  return (
    <div>
      <Header />
      <main className="page-container">
        <div className="participants-page">
          <div className="participants-header">
            <h1>Управление участниками</h1>
          </div>

          {error && <div className="error-message">{error}</div>}

          <ParticipantList
            participants={participants}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            filters={inputFilters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onResetFilters={handleResetFilters}
            pagination={pagination}
            onPageChange={handlePageChange}
            onAdd={handleCreate}
          />

          {showForm && (
            <ParticipantForm
              participant={editingParticipant}
              onSubmit={handleFormSubmit}
              onClose={handleCloseForm}
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Participants;

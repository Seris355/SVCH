import React, { useState, useEffect } from 'react';
import { masterClassService } from '../../../services/masterClassService';
import MasterClassForm from '../../../components/MasterClassForm/MasterClassForm';
import MasterClassList from '../../../components/MasterClassList/MasterClassList';
import MasterClassDetail from '../../../components/MasterClassDetail/MasterClassDetail';
import './MasterClasses.css';

const MasterClasses = () => {
  const [masterClasses, setMasterClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingMasterClass, setEditingMasterClass] = useState(null);
  const [selectedMasterClass, setSelectedMasterClass] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    instructorId: '',
    minPrice: '',
    maxPrice: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'id',
    sortOrder: 'ASC',
  });

  const fetchMasterClasses = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      };
      const response = await masterClassService.getAll(params);
      setMasterClasses(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при загрузке мастер-классов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasterClasses();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setEditingMasterClass(null);
    setShowForm(true);
  };

  const handleEdit = (masterClass) => {
    setEditingMasterClass(masterClass);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этот мастер-класс?')) {
      try {
        await masterClassService.delete(id);
        fetchMasterClasses();
      } catch (err) {
        alert(err.response?.data?.message || 'Ошибка при удалении мастер-класса');
      }
    }
  };

  const handleView = async (masterClass) => {
    try {
      const response = await masterClassService.getById(masterClass.id);
      setSelectedMasterClass(response.data);
    } catch (err) {
      alert('Ошибка при загрузке детальной информации');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMasterClass(null);
  };

  const handleCloseDetail = () => {
    setSelectedMasterClass(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingMasterClass) {
        await masterClassService.update(editingMasterClass.id, data);
      } else {
        await masterClassService.create(data);
      }
      handleCloseForm();
      fetchMasterClasses();
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
    <div className="masterclasses-page">
      <div className="masterclasses-header">
        <h1>Управление мастер-классами</h1>
        <button className="btn-primary" onClick={handleCreate}>
          Добавить мастер-класс
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <MasterClassList
        masterClasses={masterClasses}
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
        <MasterClassForm
          masterClass={editingMasterClass}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      {selectedMasterClass && (
        <MasterClassDetail
          masterClass={selectedMasterClass}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default MasterClasses;


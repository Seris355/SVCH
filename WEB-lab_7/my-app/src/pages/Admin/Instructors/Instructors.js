import React, { useState, useEffect } from 'react';
import { instructorService } from '../../../services/instructorService';
import InstructorForm from '../../../components/InstructorForm/InstructorForm';
import InstructorList from '../../../components/InstructorList/InstructorList';
import InstructorDetail from '../../../components/InstructorDetail/InstructorDetail';
import './Instructors.css';

const Instructors = () => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    specialization: '',
    sortBy: 'id',
    sortOrder: 'ASC',
  });

  const fetchInstructors = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      const response = await instructorService.getAll(params);
      setInstructors(response.data);
      setPagination(prev => ({
        ...prev,
        total: response.pagination.total,
        totalPages: response.pagination.totalPages,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Ошибка при загрузке инструкторов');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, [pagination.page, filters]);

  const handleCreate = () => {
    setEditingInstructor(null);
    setShowForm(true);
  };

  const handleEdit = (instructor) => {
    setEditingInstructor(instructor);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Вы уверены, что хотите удалить этого инструктора?')) {
      try {
        await instructorService.delete(id);
        fetchInstructors();
      } catch (err) {
        alert(err.response?.data?.message || 'Ошибка при удалении инструктора');
      }
    }
  };

  const handleView = (instructor) => {
    setSelectedInstructor(instructor);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingInstructor(null);
  };

  const handleCloseDetail = () => {
    setSelectedInstructor(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingInstructor) {
        await instructorService.update(editingInstructor.id, data);
      } else {
        await instructorService.create(data);
      }
      handleCloseForm();
      fetchInstructors();
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
    <div className="instructors-page">
      <div className="instructors-header">
        <h1>Управление инструкторами</h1>
        <button className="btn-primary" onClick={handleCreate}>
          Добавить инструктора
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <InstructorList
        instructors={instructors}
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
        <InstructorForm
          instructor={editingInstructor}
          onSubmit={handleFormSubmit}
          onClose={handleCloseForm}
        />
      )}

      {selectedInstructor && (
        <InstructorDetail
          instructor={selectedInstructor}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default Instructors;



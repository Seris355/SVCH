import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchInstructors,
  createInstructor,
  updateInstructor,
  deleteInstructor,
  setPage,
  setFilters,
  resetFilters,
} from '../../../store/slices/instructorsSlice';
import InstructorForm from '../../../components/InstructorForm/InstructorForm';
import InstructorList from '../../../components/InstructorList/InstructorList';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import './Instructors.css';

const Instructors = () => {
  const dispatch = useAppDispatch();
  const { items: instructors, loading, error, pagination, filters } = useAppSelector((state) => state.instructors);
  
  const [showForm, setShowForm] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState(null);
  const [inputFilters, setInputFilters] = useState(filters);

  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      ...filters,
    };
    dispatch(fetchInstructors(params));
  }, [dispatch, pagination.page, filters]);

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
        await dispatch(deleteInstructor(id)).unwrap();
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        };
        dispatch(fetchInstructors(params));
      } catch (err) {
        alert(err.message || 'Ошибка при удалении инструктора');
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingInstructor(null);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingInstructor) {
        await dispatch(updateInstructor({ id: editingInstructor.id, instructorData: data })).unwrap();
      } else {
        await dispatch(createInstructor(data)).unwrap();
      }
      handleCloseForm();
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      dispatch(fetchInstructors(params));
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
      specialization: '',
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
        <div className="instructors-page">
          <div className="instructors-header">
            <h1>Управление инструкторами</h1>
          </div>

          {error && <div className="error-message">{error}</div>}

          <InstructorList
            instructors={instructors}
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
            <InstructorForm
              instructor={editingInstructor}
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

export default Instructors;

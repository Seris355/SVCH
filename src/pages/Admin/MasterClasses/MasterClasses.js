import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  fetchMasterClasses,
  createMasterClass,
  updateMasterClass,
  deleteMasterClass,
  fetchMasterClassById,
  setPage,
  setFilters,
  resetFilters,
  setCurrentMasterClass,
  clearCurrentMasterClass,
} from '../../../store/slices/masterClassesSlice';
import MasterClassForm from '../../../components/MasterClassForm/MasterClassForm';
import MasterClassList from '../../../components/MasterClassList/MasterClassList';
import MasterClassDetail from '../../../components/MasterClassDetail/MasterClassDetail';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import './MasterClasses.css';

const MasterClasses = () => {
  const dispatch = useAppDispatch();
  const { items: masterClasses, loading, error, pagination, filters, currentItem: selectedMasterClass } = useAppSelector((state) => state.masterClasses);
  
  const [showForm, setShowForm] = useState(false);
  const [editingMasterClass, setEditingMasterClass] = useState(null);
  const [inputFilters, setInputFilters] = useState(filters);

  useEffect(() => {
    const params = {
      page: pagination.page,
      limit: pagination.limit,
      ...Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v !== '')
      ),
    };
    dispatch(fetchMasterClasses(params));
  }, [dispatch, pagination.page, filters]);

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
        await dispatch(deleteMasterClass(id)).unwrap(); 
        const params = {
          page: pagination.page,
          limit: pagination.limit,
          ...Object.fromEntries(
            Object.entries(filters).filter(([_, v]) => v !== '')
          ),
        };
        dispatch(fetchMasterClasses(params));
      } catch (err) {
        alert(err.message || 'Ошибка при удалении мастер-класса');
      }
    }
  };

  const handleView = async (masterClass) => {
    try {
      await dispatch(fetchMasterClassById(masterClass.id)).unwrap();
    } catch (err) {
      alert('Ошибка при загрузке детальной информации');
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingMasterClass(null);
  };

  const handleCloseDetail = () => {
    dispatch(clearCurrentMasterClass());
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingMasterClass) {
        await dispatch(updateMasterClass({ id: editingMasterClass.id, masterClassData: data })).unwrap();
      } else {
        await dispatch(createMasterClass(data)).unwrap();
      }
      handleCloseForm();
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v !== '')
        ),
      };
      dispatch(fetchMasterClasses(params));
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
      instructorId: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
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
        <div className="masterclasses-page">
          <div className="masterclasses-header">
            <h1>Управление мастер-классами</h1>
          </div>

          {error && <div className="error-message">{error}</div>}

          <MasterClassList
            masterClasses={masterClasses}
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onView={handleView}
            filters={inputFilters}
            onFilterChange={handleFilterChange}
            onSearch={handleSearch}
            onResetFilters={handleResetFilters}
            pagination={pagination}
            onPageChange={handlePageChange}
            onAdd={handleCreate}
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
      </main>
      <Footer />
    </div>
  );
};

export default MasterClasses;

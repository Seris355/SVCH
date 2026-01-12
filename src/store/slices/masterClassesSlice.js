import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { masterClassService } from '../../services/masterClassService';


export const fetchMasterClasses = createAsyncThunk(
  'masterClasses/fetchMasterClasses',
  async (params = {}) => {
    const response = await masterClassService.getAll(params);
    return response;
  }
);

export const fetchMasterClassById = createAsyncThunk(
  'masterClasses/fetchMasterClassById',
  async (id) => {
    const response = await masterClassService.getById(id);
    return response;
  }
);

export const createMasterClass = createAsyncThunk(
  'masterClasses/createMasterClass',
  async (masterClassData) => {
    const response = await masterClassService.create(masterClassData);
    return response;
  }
);

export const updateMasterClass = createAsyncThunk(
  'masterClasses/updateMasterClass',
  async ({ id, masterClassData }) => {
    const response = await masterClassService.update(id, masterClassData);
    return response;
  }
);

export const deleteMasterClass = createAsyncThunk(
  'masterClasses/deleteMasterClass',
  async (id) => {
    const response = await masterClassService.delete(id);
    return response;
  }
);

const masterClassesSlice = createSlice({
  name: 'masterClasses',
  initialState: {
    items: [],
    currentItem: null,
    loading: false,
    error: null,
    pagination: {
      page: 1,
      limit: 10,
      total: 0,
      totalPages: 0,
    },
    filters: {
      search: '',
      instructorId: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'name',
      sortOrder: 'ASC',
    },
  },
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.page = 1; 
    },
    resetFilters: (state) => {
      state.filters = {
        search: '',
        instructorId: '',
        minPrice: '',
        maxPrice: '',
        sortBy: 'name',
        sortOrder: 'ASC',
      };
      state.pagination.page = 1;
    },
    setCurrentMasterClass: (state, action) => {
      state.currentItem = action.payload;
    },
    clearCurrentMasterClass: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchMasterClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMasterClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchMasterClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchMasterClassById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMasterClassById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload.data;
      })
      .addCase(fetchMasterClassById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(createMasterClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMasterClass.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(createMasterClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(updateMasterClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMasterClass.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(updateMasterClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(deleteMasterClass.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteMasterClass.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(deleteMasterClass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPage,
  setFilters,
  resetFilters,
  setCurrentMasterClass,
  clearCurrentMasterClass,
  clearError,
} = masterClassesSlice.actions;

export default masterClassesSlice.reducer;
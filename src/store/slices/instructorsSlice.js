import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instructorService } from '../../services/instructorService';


export const fetchInstructors = createAsyncThunk(
  'instructors/fetchInstructors',
  async (params = {}) => {
    const response = await instructorService.getAll(params);
    return response;
  }
);

export const fetchInstructorById = createAsyncThunk(
  'instructors/fetchInstructorById',
  async (id) => {
    const response = await instructorService.getById(id);
    return response;
  }
);

export const createInstructor = createAsyncThunk(
  'instructors/createInstructor',
  async (instructorData) => {
    const response = await instructorService.create(instructorData);
    return response;
  }
);

export const updateInstructor = createAsyncThunk(
  'instructors/updateInstructor',
  async ({ id, instructorData }) => {
    const response = await instructorService.update(id, instructorData);
    return response;
  }
);

export const deleteInstructor = createAsyncThunk(
  'instructors/deleteInstructor',
  async (id) => {
    const response = await instructorService.delete(id);
    return response;
  }
);

const instructorsSlice = createSlice({
  name: 'instructors',
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
      specialization: '',
      sortBy: 'id',
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
        specialization: '',
        sortBy: 'id',
        sortOrder: 'ASC',
      };
      state.pagination.page = 1;
    },
    setCurrentInstructor: (state, action) => {
      state.currentItem = action.payload;
    },
    clearCurrentInstructor: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchInstructors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructors.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchInstructors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchInstructorById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstructorById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload.data;
      })
      .addCase(fetchInstructorById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(createInstructor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createInstructor.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(createInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(updateInstructor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateInstructor.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(updateInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(deleteInstructor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteInstructor.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(deleteInstructor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPage,
  setFilters,
  resetFilters,
  setCurrentInstructor,
  clearCurrentInstructor,
  clearError,
} = instructorsSlice.actions;

export default instructorsSlice.reducer;
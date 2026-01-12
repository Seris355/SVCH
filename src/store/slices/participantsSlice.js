import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { participantService } from '../../services/participantService';


export const fetchParticipants = createAsyncThunk(
  'participants/fetchParticipants',
  async (params = {}) => {
    const response = await participantService.getAll(params);
    return response;
  }
);

export const fetchParticipantById = createAsyncThunk(
  'participants/fetchParticipantById',
  async (id) => {
    const response = await participantService.getById(id);
    return response;
  }
);

export const createParticipant = createAsyncThunk(
  'participants/createParticipant',
  async (participantData) => {
    const response = await participantService.create(participantData);
    return response;
  }
);

export const updateParticipant = createAsyncThunk(
  'participants/updateParticipant',
  async ({ id, participantData }) => {
    const response = await participantService.update(id, participantData);
    return response;
  }
);

export const deleteParticipant = createAsyncThunk(
  'participants/deleteParticipant',
  async (id) => {
    const response = await participantService.delete(id);
    return response;
  }
);

const participantsSlice = createSlice({
  name: 'participants',
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
      email: '',
      phone: '',
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
        email: '',
        phone: '',
        sortBy: 'id',
        sortOrder: 'ASC',
      };
      state.pagination.page = 1;
    },
    setCurrentParticipant: (state, action) => {
      state.currentItem = action.payload;
    },
    clearCurrentParticipant: (state) => {
      state.currentItem = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchParticipants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipants.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.pagination = {
          ...state.pagination,
          ...action.payload.pagination,
        };
      })
      .addCase(fetchParticipants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchParticipantById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchParticipantById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentItem = action.payload.data;
      })
      .addCase(fetchParticipantById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(createParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createParticipant.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(createParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(updateParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateParticipant.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(updateParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(deleteParticipant.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteParticipant.fulfilled, (state) => {
        state.loading = false;
        
      })
      .addCase(deleteParticipant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setPage,
  setFilters,
  resetFilters,
  setCurrentParticipant,
  clearCurrentParticipant,
  clearError,
} = participantsSlice.actions;

export default participantsSlice.reducer;
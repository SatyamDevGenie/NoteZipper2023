import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_BASE_URL = '/api';

// Async thunks
export const fetchNotes = createAsyncThunk(
  'notes/fetchNotes',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data } = await axios.get(`${API_BASE_URL}/notes`, config);
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to fetch notes';
      return rejectWithValue(message);
    }
  }
);

export const createNote = createAsyncThunk(
  'notes/createNote',
  async ({ title, content, category }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${API_BASE_URL}/notes/create`,
        { title, content, category },
        config
      );

      toast.success('Note created successfully!');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to create note';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ id, title, content, category }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_BASE_URL}/notes/${id}`,
        { title, content, category },
        config
      );

      toast.success('Note updated successfully!');
      return data;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to update note';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${auth.userInfo.token}`,
        },
      };

      await axios.delete(`${API_BASE_URL}/notes/${id}`, config);
      toast.success('Note deleted successfully!');
      return id;
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'Failed to delete note';
      toast.error(message);
      return rejectWithValue(message);
    }
  }
);

// Notes slice
const notesSlice = createSlice({
  name: 'notes',
  initialState: {
    notes: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Notes
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Note
      .addCase(createNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes.push(action.payload);
        state.success = true;
      })
      .addCase(createNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Note
      .addCase(updateNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.notes.findIndex(note => note._id === action.payload._id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
        state.success = true;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Note
      .addCase(deleteNote.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = state.notes.filter(note => note._id !== action.payload);
        state.success = true;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearSuccess, setNotes } = notesSlice.actions;
export default notesSlice.reducer;
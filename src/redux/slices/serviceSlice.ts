import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { Service, ServiceDetails } from '../types';

const apiUrl = 'http://localhost:7070/api/services';

const initialState = {
  services: [] as Service[],
  serviceDetails: null as ServiceDetails | null,
  loading: false,
  error: '',
};

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  try {
    const response = await axios.get<Service[]>(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch services');
  }
});

export const fetchServiceDetails = createAsyncThunk(
  'services/fetchServiceDetails',
  async (serviceId: string) => {
    try {
      const response = await axios.get<ServiceDetails>(`${apiUrl}/${serviceId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch service details');
    }
  }
);

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch services';
        state.loading = false;
      })
      .addCase(fetchServiceDetails.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(fetchServiceDetails.fulfilled, (state, action) => {
        state.serviceDetails = action.payload;
        state.loading = false;
      })
      .addCase(fetchServiceDetails.rejected, (state, action) => {
        state.error = action.error.message ?? 'Failed to fetch service details';
        state.loading = false;
      });
  },
});

export const serviceReducer = servicesSlice.reducer;

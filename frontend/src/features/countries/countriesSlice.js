import { 
  createSlice, 
  createAsyncThunk, 
  createEntityAdapter 
} from "@reduxjs/toolkit";
import axios from "axios";

const COUNTRIES_URL = "http://localhost:4000/api/countries";

const countriesAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.country_code.localeCompare(a.country_code)
});

const initialState = countriesAdapter.getInitialState({
  status: "idle",
  error: null
});

export const fetchCountries = createAsyncThunk("countries/fetchCountries", async (userId) => {
  const response = await axios.get(`${COUNTRIES_URL}/${userId}`);
  return response.data;
});

export const addNewCountry = createAsyncThunk("countries/addNewCountry", async ({ userId, input }) => {
  const response = await axios.post(COUNTRIES_URL, { userId, input }, { withCredentials: true });
  return response.data;
});

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.status = "succeeded";
        countriesAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewCountry.fulfilled, (state, action) => {
        if (!action.payload?.id) {
          state.status = "succeeded";
          return;
        }
        countriesAdapter.upsertOne(state, action.payload);
      })
      .addCase(addNewCountry.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllCountries,
  selectById: selectCountryById,
  selectIds: selectCountryIds  
} = countriesAdapter.getSelectors(state => state.visitedCountries);

export default countriesSlice.reducer;
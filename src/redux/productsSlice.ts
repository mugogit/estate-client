import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Dispatch } from "redux";
import { getEstates } from "../api/estates";
import { Estate, FilterState } from "../types/types";

interface estatesState {
  estates: {
    estatesList: Estate[];
    loading: boolean;
  };
}

const initialState: estatesState = {
  estates: {
    estatesList: [],
    loading: false,
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setEstatesList: (state, action: PayloadAction<Estate[]>) => {
      state.estates.estatesList = action.payload;
    },
    setEstatesLoading: (state, action: PayloadAction<boolean>) => {
      state.estates.loading = action.payload;
    },
  },
});

export const getEstatesAsync =
  (data?: FilterState) => async (dispatch: Dispatch) => {
    try {
      dispatch(setEstatesLoading(true));
      const response = await getEstates(data);
      response && dispatch(setEstatesList(response.data));
    } catch (err) {
      // TODO show error toast notification
      alert(err);
    } finally {
      dispatch(setEstatesLoading(false));
    }
  };

export const { setEstatesList, setEstatesLoading } = productsSlice.actions;

export default productsSlice.reducer;

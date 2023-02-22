import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { saveAs } from 'file-saver';

import {
  apiCalculateOffers,
  apiCalculateSustainability,
  apiDownloadDocument,
  IApiCalculateOffersParams,
  IApiCalculateSustainabilityParams,
} from '@/utils/api';
import { RootState } from '@/store/index';

export const calculateSustainability = createAsyncThunk(
  'main/calculateSustainability',
  async (requestData: IApiCalculateSustainabilityParams) => {
    return await apiCalculateSustainability(requestData);
  },
);

export const calculateOffers = createAsyncThunk(
  'main/calculateOffers',
  async (requestData: IApiCalculateOffersParams, thunkAPI) => {
    thunkAPI.dispatch(changeIsLoading(true));

    const rawData = await apiCalculateOffers(requestData);
    return {
      offers: rawData?.interestRatesOverview as IOffer[],
      viability: {
        isCalculated: true,
        loanToValueRatio: rawData?.minNetLtv * 100,
        sustainability: rawData?.minAffordability * 100,
      },
      requestData,
    };
  },
);

export const downloadDocument = createAsyncThunk(
  'main/apiDownloadDocument',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState;
    if (!state.main.requestData) {
      return;
    }

    thunkAPI.dispatch(changeIsLoading(true));

    const rawData = await apiDownloadDocument(state.main.requestData);
    saveAs(rawData, 'HypoCheck.pdf');
    return true;
  },
);

export interface IViability {
  isCalculated: boolean;
  loanToValueRatio: number | undefined;
  sustainability: number | undefined;
}

export enum IOfferProductType {
  Fixed = 'Fixed',
  Saron = 'Saron',
  Variable = 'Variable',
}

export interface IOffer {
  productType: IOfferProductType;
  duration?: number;
  interestRateFrom: number;
  interestRateMonthlyCostFrom: number;
}

export interface IMainState {
  isLoading: boolean;
  advisorEMail?: string;
  viability: IViability;
  offers: IOffer[];
  requestData?: IApiCalculateOffersParams;
}

const initialState: IMainState = {
  isLoading: false,
  advisorEMail: undefined,
  viability: {
    isCalculated: false,
    loanToValueRatio: undefined,
    sustainability: undefined,
  },
  offers: [],
  requestData: undefined,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    login: (state, action: PayloadAction<string>) => {
      state.advisorEMail = action.payload;
      localStorage.setItem('adve', action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateSustainability.fulfilled, (state, action) => {
        state.viability = action.payload;
      })
      .addCase(calculateOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.offers = action?.payload?.offers || [];
        state.requestData = action?.payload?.requestData;
        if (action?.payload?.viability?.isCalculated) {
          state.viability = action.payload.viability;
        }
      })
      .addCase(calculateOffers.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(downloadDocument.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(downloadDocument.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

// Selectors
export const selectIsLoading = (state: RootState) => state.main.isLoading;
export const selectAdvisorEMail = (state: RootState) => state.main.advisorEMail;
export const selectViability = (state: RootState) => state.main.viability || {};
export const selectOffers = (state: RootState) => state.main.offers || [];

// Action creators are generated for each case reducer function
export const { changeIsLoading, login } = mainSlice.actions;

export default mainSlice.reducer;

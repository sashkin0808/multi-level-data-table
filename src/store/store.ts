import { configureStore, combineReducers, PayloadAction } from '@reduxjs/toolkit'
import { api } from '../services/api/api';
import { Row, RowTree } from '../components/TableRow/TableRow.types';
import { createSlice } from "@reduxjs/toolkit";
import { findElInArr, changeElInArr, deleteElFromArr, createEmptyEl, applyChanged } from './store.service';

export type RootState = ReturnType<typeof rootReducer>;

const rowsSlice = createSlice({
  name: 'rows',
  initialState: [],
  reducers: {
    createNewRow: (state, action: PayloadAction<{ parentId: number, cliendId: number }>) => {
      const newRow = createEmptyEl(action.payload.cliendId);
      if (action.payload.parentId === null) {
        state.push(newRow);
      } else {
        const parent = findElInArr(state, action.payload.parentId);
        parent.child.push(newRow);
      }
    }
  },
  extraReducers(builder) {
    builder.addMatcher(
      api.endpoints.getRows.matchFulfilled,
      (state, { payload }) => {
        if (payload.length) return payload;

        return [createEmptyEl()];
      }
    );
    builder.addMatcher(
      api.endpoints.addRow.matchFulfilled,
      (state, { payload }) => {
        const newEl = { ...payload.response.current, child: [] };
        let newState = changeElInArr(state, payload.cliendId, newEl);
        newState = applyChanged(payload.response.changed, newState);
        return newState;
      }
    );
    builder.addMatcher(
      api.endpoints.deleteRow.matchFulfilled,
      (state, { payload }) => {
        let newState = deleteElFromArr(state, payload.deletedId);
        newState = applyChanged(payload.response.changed, newState);
        if (newState.length) return newState;

        return [createEmptyEl()];
      }
    );
    builder.addMatcher(
      api.endpoints.updateRow.matchFulfilled,
      (state, { payload }) => {
        const oldEl = findElInArr(state, payload.cliendId);
        const newEl = { ...oldEl, ...payload.response.current };
        let newState = changeElInArr(state, payload.cliendId, newEl);
        payload.response.changed.forEach(el => {
          const findedEl = findElInArr(state, el.id);
          const changedEl = { ...findedEl, ...el };
          newState = changeElInArr(newState, el.id, changedEl);
        });
        return newState;
      }
    );
  }
});

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  rows: rowsSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([
      api.middleware
    ]
    )
});
export const {
  createNewRow
} = rowsSlice.actions;

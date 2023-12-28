import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RowTree, RowChangeResponse, RowUpdateRequest, RowCreateRequest, RowChangeTransfromResponse } from 'components/TableRow/TableRow.types';

const EID = '116211';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://185.244.172.108:8081/v1/outlay-rows/entity/${EID}/row/`,
  }),
  endpoints: (builder) => ({
    getRows: builder.query<RowTree[], void>({
      query: () => `list`,
    }),
    addRow: builder.mutation<RowChangeTransfromResponse, { body: RowCreateRequest, id: number }>({
      query: ({ body }) => ({
        url: 'create',
        method: 'POST',
        body,
      }),
      transformResponse: (response: RowChangeResponse, meta, arg) => {
        return { cliendId: arg.id, response };
      }
    }),
    deleteRow: builder.mutation<RowChangeTransfromResponse, number>({
      query: (rowId) => ({
        url: `${rowId}/delete`,
        method: 'DELETE'
      }),
      transformResponse: (response: RowChangeResponse, meta, arg) => {
        return { deletedId: arg, response };
      }
    }),
    updateRow: builder.mutation<RowChangeTransfromResponse, RowUpdateRequest>({
      query: ({ id, body }) => ({
        url: `${id}/update`,
        method: 'POST',
        body,
      }),
      transformResponse: (response: RowChangeResponse, meta, arg) => {
        return { cliendId: arg.id, response };
      }
    })
  })
});
export const {
  useGetRowsQuery,
  useAddRowMutation, useDeleteRowMutation, useUpdateRowMutation
} = api;
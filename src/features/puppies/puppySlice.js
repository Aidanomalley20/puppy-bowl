import api from "../../store/api";

const puppyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPuppies: build.query({
      query: () => "players",
      transformResponse: (response) => response.data,
      providesTags: ["Puppy"],
    }),
    getPuppy: build.query({
      query: (id) => `players/${id}`,
      transformResponse: (response) => response.data,
      providesTags: ["Puppy"],
    }),
    addPuppy: build.mutation({
      query: (puppy) => ({
        url: "players",
        method: "POST",
        body: puppy,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: ["Puppy"],
    }),
    deletePuppy: build.mutation({
      query: (id) => ({
        url: `players/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Puppy"],
    }),
  }),
});

export const {
  useGetPuppiesQuery,
  useGetPuppyQuery,
  useAddPuppyMutation,
  useDeletePuppyMutation,
} = puppyApi;

export default puppyApi;

import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import {
  setAccessToken,
  getAccessToken,
  logoutUser,
} from "../redux/slices/authSlice";
import { getRoute } from "../api/BackendRoutes";
import { RootState } from "../redux/store";

type PrepareHeadersFn = (
  headers: Headers,
  api: { getState: () => RootState }
) => Headers;

export const prepareHeaders: PrepareHeadersFn = (headers, { getState }) => {
  const accessToken = getAccessToken(getState());
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return headers;
};

export const baseQueryWithReauth = (baseUrl: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    //@ts-ignore
    prepareHeaders, //TODO
  });

  let refreshPromise: Promise<any> | null = null; // Track ongoing refresh request

  //@ts-ignore
  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    {},
    FetchBaseQueryMeta
  > = async (
    //TODO
    args,
    api,
    extraOptions
  ) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
      // Check if refresh process is ongoing
      if (!refreshPromise) {
        // Fetch the refresh token
        refreshPromise = (async () => {
          const refreshToken = localStorage.getItem("refresh");
          if (refreshToken) {
            const refreshResult: any = await baseQuery(
              {
                url: getRoute("refreshToken"),
                method: "POST",
                body: { refresh: refreshToken },
              },
              api,
              extraOptions
            );
            if (refreshResult?.data?.access) {
              api.dispatch(setAccessToken(refreshResult.data.access));
              // Retry the original request with the new access token
              result = await baseQuery(args, api, extraOptions);
            } else {
              // Handle refresh failure
              api.dispatch(logoutUser());
            }
          } else {
            api.dispatch(logoutUser());
          }

          refreshPromise = null; // Reset the refresh process flag
        })();
      }

      // Await the ongoing refresh request
      await refreshPromise;
    }

    return result;
  };

  return baseQueryWithReauth;
};

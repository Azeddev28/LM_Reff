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
  getRefreshToken,
} from "../redux/slices/authSlice";
import { getRoute } from "../api/BackendRoutes";
import { RootState } from "../redux/store";

type PrepareHeadersFn = (
  headers: Headers,
  api: { getState: () => RootState }
) => Headers;

export const prepareHeaders: PrepareHeadersFn = (headers, { getState }) => {
  const accessToken = getAccessToken();
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return headers;
};

export const createBaseQueryWithReauth = (baseUrl: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: baseUrl,
    //@ts-ignore
    prepareHeaders, //TODO
  });

  let refreshPromise: Promise<any> | null = null; 

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
      if (!refreshPromise) {
        refreshPromise = (async () => {
          const refreshToken = getRefreshToken();
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
              api.dispatch(setAccessToken(refreshResult.data));
            } else {
              api.dispatch(logoutUser());
            }
          } else {
            api.dispatch(logoutUser());
          }
          refreshPromise = null;
        })();
      }
      if (refreshPromise) {
        try {
            await refreshPromise;
            return result = await baseQuery(args, api, extraOptions);
        } catch (error) {
        }
    }
  }
    return result;  
  };

  return baseQueryWithReauth;
};

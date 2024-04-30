import axios from "axios";

// TODO: Check if we need this
// export const setAuthToken = (token) => {
//     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
// };

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL, // Set your base URL here
  // TODO: Maybe we need to set a timeout
  // timeout: 5000, // Optional: Set a timeout for requests (in milliseconds)
});

const failedResponse = (error) => {
  if (
    error.response &&
    error.response.status &&
    error.response.status === 401
  ) {
    window.location.replace(AppRoutes.LOGOUT.path);
  }
  return Promise.reject(error);
};
export const getRequest = (route, data) => {
  return axiosInstance
    .get(route, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const postRequest = (route, data, requireAccessToken) => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  let authenticatedHeaders;
  if (requireAccessToken && accessToken) {
    authenticatedHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return axiosInstance
    .post(route, data, {
      headers: requireAccessToken && authenticatedHeaders,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const deleteRequest = (route, data) => {
  return axiosInstance
    .delete(route, data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const putRequest = (route, data) => {
  return axiosInstance
    .put(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

export const patchRequest = (route, data) => {
  return axiosInstance
    .patch(route, data)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return failedResponse(error);
    });
};

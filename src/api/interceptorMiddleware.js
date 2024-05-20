// src/interceptorMiddleware.js

const interceptorMiddleware = (store) => (next) => (action) => {
  // Intercept only API call actions
  if (action.type.endsWith("/pending")) {
    // Modify the action or perform side effects here
    console.log("API call initiated", action);
    // Add headers or other customizations
    if (action.meta && action.meta.arg && action.meta.arg.headers) {
      action.meta.arg.headers["Authorization"] = `Bearer ${
        store.getState().auth.token
      }`;
    }
  }

  if (action.type.endsWith("/fulfilled")) {
    console.log("API call succeeded", action);
    // Perform operations on successful API response
  }

  if (action.type.endsWith("/rejected")) {
    console.log("API call failed", action);
    // Handle errors
  }

  return next(action);
};

export default interceptorMiddleware;

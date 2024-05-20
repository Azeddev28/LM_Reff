const baseUrl = import.meta.env.VITE_URL;

const ROUTES = {
  referralList: `${baseUrl}/referrals/`,
  claimList: `${baseUrl}/claims`,
  employerList: `${baseUrl}/users/employer-list/`,
  login: `/auth/login/`,
  resetPassword:'/auth/password/reset/',
  signIn:'/auth/sign-in'
  
  
};

export const getRoute = (routeKey) => ROUTES[routeKey];

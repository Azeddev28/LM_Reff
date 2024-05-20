
const ROUTES = {
  referralList: `/referrals/`,
  claimList: `/claims`,
  employerList: `/users/employer-list/`,
  login: `/auth/login/`,
  resetPassword:'/auth/password/reset/',
  signIn:'/auth/sign-in'
  
  
};

export const getRoute = (routeKey) => ROUTES[routeKey];

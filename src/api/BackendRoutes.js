
const ROUTES = {
  referralList: `/referrals/`,
  claimList: `/claims`,
  employerList: `/users/employer-list/`,
  login: `/auth/login/`,
  resetPassword:'/auth/password/reset/',
  signIn:'/auth/sign-in',
  confirmPassword:`/auth/password/reset/confirm/`,
  refreshToken:`/auth/token/refresh/`
};

export const getRoute = (routeKey) => ROUTES[routeKey];

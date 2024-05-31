type RouteKeys = 'referralList' | 'claimList' | 'employerList' | 'login' | 'resetPassword' | 'signIn' | 'confirmPassword' | 'validateconfirmPassword' | 'refreshToken';

const ROUTES: Record<RouteKeys, string> = {
  referralList: `/referrals/`,
  claimList: `/claims`,
  employerList: `/users/employer-list/`,
  login: `/auth/login/`,
  resetPassword: '/auth/password/reset/',
  signIn: '/auth/sign-in',
  confirmPassword: `/auth/password/reset/confirm/`,
  validateconfirmPassword: `/auth/validate/reset/`,
  refreshToken: `/auth/token/refresh/`
};

export const getRoute = (routeKey: RouteKeys): string => ROUTES[routeKey];
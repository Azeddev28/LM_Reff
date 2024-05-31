// Define a type for the keys of the ROUTES object
type RouteKeys = 'referralList' | 'claimList' | 'employerList' | 'login' | 'resetPassword' | 'signIn' | 'confirmPassword' | 'validateconfirmPassword' | 'refreshToken';

// Define the ROUTES object with proper typing
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

// Define the getRoute function with proper typing
export const getRoute = (routeKey: RouteKeys): string => ROUTES[routeKey];

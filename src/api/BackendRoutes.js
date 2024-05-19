const baseUrl = import.meta.env.VITE_BASE_URL;

const ROUTES = {
  referralList: `${baseUrl}/referrals`,
  claimList: `${baseUrl}/claims`,
  employerList: `${baseUrl}/users/employer-list/`,
};

export const getRoute = (routeKey) => ROUTES[routeKey];

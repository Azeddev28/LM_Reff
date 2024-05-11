const baseUrl = import.meta.env.VITE_BASE_URL;

const ROUTES = {
  referralList: `${baseUrl}/referrals`,
  claimList: `${baseUrl}/claims`,
  employerList: `${baseUrl}/users/employer-list/`,
  loginRoute: "auth/login/",
};

export const getRoute = (routeKey) => ROUTES[routeKey];

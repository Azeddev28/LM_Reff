const ROUTES = {
  // companiesList: `companies/companies-list/`,
  // industriesList: `companies/industries-list/`,
  // countriesList: `locations/countries-list/`,
  // languagesList: `locations/languages-list/`,
  // joinWaitlist: `users/join-waitlist/`,
  // profileRegister: "users/profile-register/",
  // linkedinRegister: `authentication/linkedin-register/`,
  // socialRegister: `authentication/social-register/`,
  // userRoles: "users/user-roles/",
  // http://3.6.94.153/api/referrals/    // Referral List url
  // http://3.6.94.153/api/referrals/referral-detail/{uuid}/
};

export const getRoute = (routeKey) => ROUTES[routeKey];

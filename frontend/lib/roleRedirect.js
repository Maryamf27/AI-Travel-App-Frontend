export const ROLE_HOME = {
  traveler: '/dashboard',
  travel_agent: '/agent/dashboard',
  admin: '/admin/dashboard',
};

export function getRoleHome(role) {
  return ROLE_HOME[role] || '/login';
}

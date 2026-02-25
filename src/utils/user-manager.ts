// export const getCredentialForWorker = (index: number, platform: 'web' | 'mobile') => {
//   // Parse the JSON string from .env
//   const webUsers = JSON.parse(process.env.WEB_USERS || '[]');
//   const mobileUsers = JSON.parse(process.env.MOBILE_USERS || '[]');

import { UserRole, USER_ROLES } from '@constants/user-role';

//   const users = platform === 'web' ? webUsers : mobileUsers;

//   if (users.length === 0) {
//     throw new Error(`No ${platform} users found in .env!`);
//   }

//   // Ensures the worker always gets a valid user
//   return users[index % users.length];
// };

export const getCredentialForRole = (role: UserRole, index: number) => {
  // 1. Parse the web users from your .env
  const allWebUsers = JSON.parse(process.env.WEB_USERS || '[]');

  if (allWebUsers.length === 0) {
    throw new Error('No web users found in .env!');
  }

  // 2. Separate the pools based on your array structure
  // First user is Admin, the rest are Customers
  const adminPool = [allWebUsers[0]];
  const customerPool = allWebUsers.slice(1);

  // 3. Select the pool based on the requested role
  const selectedPool = role === USER_ROLES.ADMIN ? adminPool : customerPool;

  if (selectedPool.length === 0) {
    throw new Error(`No users found for role: ${role}`);
  }

  // 4. Return user using modulo to prevent out-of-bounds in parallel runs
  return selectedPool[index % selectedPool.length];
};

/* eslint-disable no-console */
// src/utils/user-manager.ts
import { UserRole, USER_ROLES } from '@constants/user-role';

export const getCredentialForRole = (role: UserRole, index: number) => {
  // 1. Parse your user pools from .env
  // Industry Standard: Separate your pools in .env for absolute clarity
  const webCustomers = JSON.parse(process.env.WEB_CUSTOMERS || '[]');
  const webAdmins = JSON.parse(process.env.WEB_ADMINS || '[]');

  // 2. Select the pool
  const selectedPool = role === USER_ROLES.ADMIN ? webAdmins : webCustomers;

  if (!selectedPool || selectedPool.length === 0) {
    throw new Error(
      `CRITICAL: No users found in .env for role: ${role}. Check your WEB_CUSTOMERS/WEB_ADMINS variables.`
    );
  }

  // 3. Modulo logic (The Safety Net)
  // This ensures if you have 8 workers but only 4 users, it wraps around safely.
  // Ideally: selectedPool.length >= Total Workers in CI
  const user = selectedPool[index % selectedPool.length];

  console.log(`[User Manager] Assigning ${role} (Index ${index}) -> ${user.email}`);
  return user;
};

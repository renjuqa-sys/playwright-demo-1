export const getCredentialForWorker = (index: number, platform: 'web' | 'mobile') => {
  // Parse the JSON string from .env
  const webUsers = JSON.parse(process.env.WEB_USERS || '[]');
  const mobileUsers = JSON.parse(process.env.MOBILE_USERS || '[]');

  const users = platform === 'web' ? webUsers : mobileUsers;

  if (users.length === 0) {
    throw new Error(`No ${platform} users found in .env!`);
  }

  // Ensures the worker always gets a valid user
  return users[index % users.length];
};

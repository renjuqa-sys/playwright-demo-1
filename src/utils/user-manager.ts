export const getCredentialForWorker = (index: number, platform: 'web' | 'mobile') => {
  const webUsers = [
    { email: process.env.WEB_USER_1_EMAIL, pass: process.env.WEB_USER_1_PASS },
    { email: process.env.WEB_USER_2_EMAIL, pass: process.env.WEB_USER_2_PASS },
    { email: process.env.WEB_USER_3_EMAIL, pass: process.env.WEB_USER_3_PASS },
    { email: process.env.WEB_USER_4_EMAIL, pass: process.env.WEB_USER_4_PASS },
  ];

  const mobileUsers = [
    { email: process.env.MOBILE_USER_1_EMAIL, pass: process.env.MOBILE_USER_1_PASS },
    { email: process.env.MOBILE_USER_2_EMAIL, pass: process.env.MOBILE_USER_2_PASS },
    { email: process.env.MOBILE_USER_3_EMAIL, pass: process.env.MOBILE_USER_3_PASS },
    { email: process.env.MOBILE_USER_4_EMAIL, pass: process.env.MOBILE_USER_4_PASS },
  ];

  const users = platform === 'web' ? webUsers : mobileUsers;
  
  // The magic line: ensures the index stays within the array bounds
  return users[index % users.length];
};
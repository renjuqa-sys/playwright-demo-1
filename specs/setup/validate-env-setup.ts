/* eslint-disable no-console */
import { test as setup } from '@playwright/test';

setup('Validate Environment Variables', async () => {
  console.log('🔍 Checking .env configuration...');

  const requiredVariables = ['WEB_ADMINS', 'WEB_CUSTOMERS'];

  for (const key of requiredVariables) {
    const value = process.env[key];

    // 1. Check if exists
    if (!value) {
      throw new Error(`❌ Missing required environment variable: ${key}. Please check your .env file.`);
    }

    // 2. Check if valid JSON
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error(`❌ ${key} must be a non-empty JSON array.`);
      }
    } catch (e) {
      throw new Error(`❌ Invalid JSON format in .env for ${key}. Error: ${String(e)}`);
    }
  }

  console.log('✅ All environment variables are valid.');
});

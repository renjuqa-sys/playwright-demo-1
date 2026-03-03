/* eslint-disable no-console */
import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// WEB CLEANUP LOOP
teardown('Cleanup web auth states', { tag: '@web-cleanup' }, async () => {
  // Allow CI setup phase to keep auth files for upload
  if (process.env.SKIP_AUTH_CLEANUP === 'true') {
    console.log('⚠️ Skipping web auth cleanup (SKIP_AUTH_CLEANUP=true).');
    return;
  }

  const authDir = path.join(process.cwd(), '.auth');
  if (fs.existsSync(authDir)) {
    const files = fs.readdirSync(authDir).filter((f) => f.startsWith('web-'));
    files.forEach((file) => fs.unlinkSync(path.join(authDir, file)));
    console.log(`Cleaned up ${files.length} web auth files.`);
  }
});

// MOBILE CLEANUP LOOP
teardown('Cleanup mobile auth states', { tag: '@mobile-cleanup' }, async () => {
  // Allow CI setup phase to keep auth files for upload
  if (process.env.SKIP_AUTH_CLEANUP === 'true') {
    console.log('⚠️ Skipping mobile auth cleanup (SKIP_AUTH_CLEANUP=true).');
    return;
  }

  const authDir = path.join(process.cwd(), '.auth');
  if (fs.existsSync(authDir)) {
    const files = fs.readdirSync(authDir).filter((f) => f.startsWith('mobile-'));
    files.forEach((file) => fs.unlinkSync(path.join(authDir, file)));
    console.log(`Cleaned up ${files.length} mobile auth files.`);
  }
});

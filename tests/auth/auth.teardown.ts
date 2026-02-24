/* eslint-disable no-console */
import { test as teardown } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// WEB CLEANUP LOOP
teardown('cleanup web auth states', { tag: '@web-cleanup' }, async () => {
  const authDir = path.join(process.cwd(), '.auth');
  if (fs.existsSync(authDir)) {
    const files = fs.readdirSync(authDir).filter((f) => f.startsWith('web-'));
    files.forEach((file) => fs.unlinkSync(path.join(authDir, file)));
    console.log(`Cleaned up ${files.length} web auth files.`);
  }
});

// MOBILE CLEANUP LOOP
teardown('cleanup mobile auth states', { tag: '@mobile-cleanup' }, async () => {
  const authDir = path.join(process.cwd(), '.auth');
  if (fs.existsSync(authDir)) {
    const files = fs.readdirSync(authDir).filter((f) => f.startsWith('mobile-'));
    files.forEach((file) => fs.unlinkSync(path.join(authDir, file)));
    console.log(`Cleaned up ${files.length} mobile auth files.`);
  }
});

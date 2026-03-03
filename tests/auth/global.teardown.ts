/* eslint-disable no-console */
import fs from 'fs';
import path from 'path';

async function globalTeardown() {
  // Allow CI setup phase to keep auth files for upload
  if (process.env.SKIP_AUTH_CLEANUP === 'true') {
    console.log('⚠️ Skipping global auth cleanup (SKIP_AUTH_CLEANUP=true).');
    return;
  }

  const authDir = path.join(process.cwd(), '.auth');
  if (fs.existsSync(authDir)) {
    const files = fs.readdirSync(authDir);
    for (const file of files) {
      if (file.endsWith('.json')) {
        fs.unlinkSync(path.join(authDir, file));
      }
    }
    console.log(`\n🧹 Global Cleanup: Deleted ${files.length} auth files.`);
  }
}
export default globalTeardown;

import fs from 'fs';
import path from 'path';

async function globalTeardown() {
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

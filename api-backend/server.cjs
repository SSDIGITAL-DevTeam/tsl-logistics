// Passenger/Node entry point for Domainesia hosting.
//
// Passenger boots this file with an arbitrary working directory and without the
// `--env-file` flag the npm scripts rely on, so two things must be pinned before
// the ESM app is imported:
//
//   1. cwd — config/uploads.js resolves UPLOAD_DIR against process.cwd(), and
//      migrate.js reads './drizzle/migrations'. Both silently point at the wrong
//      place when cwd is not the app root.
//   2. env — config/env.js validates process.env only. Nothing else reads .env
//      on this code path, so every variable would come back undefined and the
//      schema would exit(1) before the server ever listens.
const fs = require('fs');
const path = require('path');

process.chdir(__dirname);

const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
  if (typeof process.loadEnvFile !== 'function') {
    console.error(
      `Node ${process.version} has no process.loadEnvFile(). Select Node 20.12+ ` +
        '(22 recommended) in cPanel > Setup Node.js App, or supply the variables ' +
        "via that screen's Environment variables section instead."
    );
    process.exit(1);
  }

  try {
    // Values already present in the environment win over the file, so variables
    // set in the cPanel UI can still override .env without editing it.
    process.loadEnvFile(envPath);
  } catch (err) {
    console.error(`Failed to read ${envPath}: ${err.message}`);
    process.exit(1);
  }
} else {
  // Not fatal — the variables may come from the cPanel UI. If they don't,
  // config/env.js reports exactly which ones are missing.
  console.warn(`No .env at ${envPath}; relying on the process environment.`);
}

import('./src/index.js');

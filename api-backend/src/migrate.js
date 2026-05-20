import { migrate } from 'drizzle-orm/mysql2/migrator';
import { db, pool } from '../drizzle/db.js';

console.log('Running database migrations...');

try {
  await migrate(db, { migrationsFolder: './drizzle/migrations' });
  console.log('✅ Migrations completed successfully');
} catch (err) {
  console.error('❌ Migration failed:', err);
  process.exit(1);
} finally {
  await pool.end();
}

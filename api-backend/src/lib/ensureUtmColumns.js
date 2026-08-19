import { pool } from '../../drizzle/db.js';
import { logger } from './logger.js';

export async function ensureUtmColumns() {
  try {
    const [cols] = await pool.query('SHOW COLUMNS FROM `leads` LIKE "utm_source"');
    if (Array.isArray(cols) && cols.length === 0) {
      logger.info('Adding UTM & GCLID columns to leads table...');
      await pool.query(`
        ALTER TABLE \`leads\`
          ADD COLUMN \`utm_source\` VARCHAR(255) NULL AFTER \`user_agent\`,
          ADD COLUMN \`utm_medium\` VARCHAR(255) NULL AFTER \`utm_source\`,
          ADD COLUMN \`utm_campaign\` VARCHAR(255) NULL AFTER \`utm_medium\`,
          ADD COLUMN \`gclid\` VARCHAR(255) NULL AFTER \`utm_campaign\`;
      `);
      logger.info('✅ UTM columns added to leads table successfully');
    }
  } catch (err) {
    logger.error({ err }, 'Failed to check/add UTM columns to leads table');
  }
}

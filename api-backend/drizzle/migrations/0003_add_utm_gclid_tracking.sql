-- Adds the attribution columns to `leads`.
--
-- utm_source, utm_medium, utm_campaign and gclid were previously created at
-- runtime by src/lib/ensureUtmColumns.js, which has since been removed.
-- Databases that ran that code already have them; fresh ones do not. MySQL 8
-- has no `ADD COLUMN IF NOT EXISTS`, so the ALTER is assembled from
-- information_schema and only names the columns that are actually missing —
-- making this migration safe to apply against either state.
--
-- gbraid/wbraid are the iOS 14.5+ parameters Google Ads sends in place of
-- gclid, and were never created by the old runtime patch.
SET @cols := (
  SELECT GROUP_CONCAT(c.ddl SEPARATOR ', ') FROM (
              SELECT 'ADD `utm_source` varchar(255)'   AS ddl, 'utm_source'   AS nm
    UNION ALL SELECT 'ADD `utm_medium` varchar(255)',        'utm_medium'
    UNION ALL SELECT 'ADD `utm_campaign` varchar(255)',      'utm_campaign'
    UNION ALL SELECT 'ADD `gclid` varchar(255)',             'gclid'
    UNION ALL SELECT 'ADD `gbraid` varchar(255)',            'gbraid'
    UNION ALL SELECT 'ADD `wbraid` varchar(255)',            'wbraid'
  ) c
  WHERE NOT EXISTS (
    SELECT 1 FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads' AND COLUMN_NAME = c.nm
  )
);--> statement-breakpoint
SET @s := IF(@cols IS NULL, 'DO 0', CONCAT('ALTER TABLE `leads` ', @cols));--> statement-breakpoint
PREPARE stmt FROM @s;--> statement-breakpoint
EXECUTE stmt;--> statement-breakpoint
DEALLOCATE PREPARE stmt;--> statement-breakpoint
SET @s := (
  SELECT IF(COUNT(*) = 0,
    'CREATE INDEX `idx_leads_utm_source` ON `leads` (`utm_source`)',
    'DO 0')
  FROM information_schema.STATISTICS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'leads' AND INDEX_NAME = 'idx_leads_utm_source'
);--> statement-breakpoint
PREPARE stmt FROM @s;--> statement-breakpoint
EXECUTE stmt;--> statement-breakpoint
DEALLOCATE PREPARE stmt;

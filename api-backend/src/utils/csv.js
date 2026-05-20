/**
 * Streams an array of objects as a CSV response.
 * Each row is written individually to avoid loading all data into memory.
 */
export function streamCsv(res, rows, filename = 'export.csv') {
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

  if (rows.length === 0) {
    res.end('');
    return;
  }

  const headers = Object.keys(rows[0]);
  res.write(headers.map(escapeCell).join(',') + '\r\n');

  for (const row of rows) {
    const line = headers.map((h) => escapeCell(row[h] ?? '')).join(',');
    res.write(line + '\r\n');
  }

  res.end();
}

function escapeCell(value) {
  const str = String(value);
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

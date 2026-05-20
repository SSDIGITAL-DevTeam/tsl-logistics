const fs = require('fs');

async function main() {
  const res = await fetch('https://www.tsllogistics.sg/feed/rss2');
  let xml = await res.text();
  
  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1];
    
    let title = '';
    let titleMatch = /<title><!\[CDATA\[([\s\S]*?)\]\]><\/title>/.exec(itemXml) || /<title>([\s\S]*?)<\/title>/.exec(itemXml);
    if (titleMatch) title = titleMatch[1].trim();
    
    let content = '';
    let contentMatch = /<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/.exec(itemXml) || /<content:encoded>([\s\S]*?)<\/content:encoded>/.exec(itemXml);
    if (contentMatch) {
      content = contentMatch[1].trim();
      // Decode if it has HTML entities instead of CDATA
      if (!/<content:encoded><!\[CDATA\[/.test(itemXml)) {
        content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&#xD;/g, '');
      }
    }
    
    let excerpt = '';
    let descMatch = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/.exec(itemXml) || /<description>([\s\S]*?)<\/description>/.exec(itemXml);
    if (descMatch) excerpt = descMatch[1].trim().replace(/<[^>]+>/g, '').substring(0, 150);

    let pubDate = '';
    let pubDateMatch = /<pubDate>([\s\S]*?)<\/pubDate>/.exec(itemXml);
    if (pubDateMatch) pubDate = pubDateMatch[1].trim();
    
    items.push({
      title,
      excerpt: excerpt || title,
      content,
      publishedAt: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
      categoryId: null,
      status: 'published' // or draft
    });
  }
  
  fs.writeFileSync('rss-data.json', JSON.stringify(items, null, 2));
  console.log('Saved ' + items.length + ' items.');
}

main().catch(console.error);

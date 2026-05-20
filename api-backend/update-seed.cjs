const fs = require('fs');
const path = require('path');

const seedJsPath = path.join(__dirname, 'src', 'seed.js');
let seedContent = fs.readFileSync(seedJsPath, 'utf8');

const rssData = JSON.parse(fs.readFileSync(path.join(__dirname, 'rss-data.json'), 'utf8'));

// We format the rssData to a JS array string
let postsArrayStr = 'const posts = [\n';
for (const item of rssData) {
  // Use a default category for the seed since they don't have one
  postsArrayStr += `    {
      title: ${JSON.stringify(item.title)},
      excerpt: ${JSON.stringify(item.excerpt)},
      content: \`${item.content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`,
      categoryId: catMap['logistics'], // default
      status: 'published',
      publishedAt: new Date('${item.publishedAt}'),
    },\n`;
}
postsArrayStr += '  ];';

// Regex to replace the const posts = [ ... ]; block
const regex = /const posts = \[\s*\{[\s\S]*?\}\s*,\s*\];/;
// wait, the original ends with \n  ];
const regex2 = /const posts = \[\s*([\s\S]*?)\s*\];/;

seedContent = seedContent.replace(regex2, postsArrayStr);

fs.writeFileSync(seedJsPath, seedContent);
console.log('seed.js updated successfully!');

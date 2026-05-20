/**
 * Seed script: creates 1 admin user + 6 initial blog posts (from the static end-user content).
 * Run with: node --env-file=.env src/seed.js
 */
import bcrypt from 'bcryptjs';
import { randomUUID } from 'crypto';
import { db, pool } from '../drizzle/db.js';
import { users, blogCategories, blogPosts } from '../drizzle/schema.js';
import { slugify } from './utils/slugify.js';

async function seed() {
  console.log('🌱 Starting seed...');

  // ── Admin user ───────────────────────────────────────────────────────────────
  const email = 'admin@tsl-logistics.com';
  const password = await bcrypt.hash('Admin@1234!', 12);

  await db
    .insert(users)
    .values({ name: 'TSL Admin', email, password, role: 'admin', status: 'active' })
    .onDuplicateKeyUpdate({ set: { name: 'TSL Admin' } });

  console.log(`  ✅ Admin user: ${email} (password: Admin@1234!)`);

  // ── Blog categories ───────────────────────────────────────────────────────────
  const categoryData = [
    { name: 'Logistics', slug: 'logistics' },
    { name: 'Moving & Relocation', slug: 'moving-relocation' },
    { name: 'Warehousing', slug: 'warehousing' },
    { name: 'Industry Insights', slug: 'industry-insights' },
  ];

  await db.insert(blogCategories).values(categoryData).onDuplicateKeyUpdate({ set: { name: blogCategories.name } });
  const categories = await db.select().from(blogCategories);
  const catMap = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  console.log(`  ✅ ${categories.length} blog categories created`);

  // ── Blog posts (6 static posts from end-user, seeded as draft) ───────────────
  const [adminUser] = await db.select({ id: users.id }).from(users).limit(1);

  const posts = [
    {
      title: '10 Tips for a Stress-Free Office Relocation',
      excerpt: 'Moving your office can be a daunting task, but with the right planning and professional support, you can minimize disruption to your business operations.',
      content: `<h2>Plan Early</h2><p>Start planning your office relocation at least 3–6 months in advance. Create a detailed timeline, assign responsibilities, and set a realistic budget.</p>
<h2>Declutter Before You Move</h2><p>Use the move as an opportunity to get rid of outdated equipment, unnecessary furniture, and redundant paperwork.</p>
<h2>Notify Stakeholders Early</h2><p>Inform employees, clients, suppliers, and service providers about your move as soon as possible. Update your address on all business materials.</p>
<h2>Choose the Right Mover</h2><p>Select a professional moving company experienced in commercial relocations, like TSL Mover. Look for companies with proper insurance and proven track records.</p>
<h2>Create an IT Migration Plan</h2><p>Work with your IT team to plan the safe migration of servers, computers, and telecommunications equipment. Ensure minimal downtime during the transition.</p>
<h2>Label Everything</h2><p>Develop a comprehensive labeling system for all items. Color-code boxes by department and create an inventory list to track all assets.</p>
<h2>Plan Your New Layout</h2><p>Design your new office layout before moving day to ensure efficient placement of furniture and equipment.</p>
<h2>Schedule the Move Strategically</h2><p>If possible, plan the move over a weekend or during a slow business period to minimize impact on operations.</p>
<h2>Keep Employees Informed</h2><p>Regular communication reduces anxiety and ensures everyone knows their role in the moving process.</p>
<h2>Do a Post-Move Review</h2><p>After settling in, conduct a review to address any issues and capture lessons learned for future reference.</p>`,
      categoryId: catMap['moving-relocation'],
      status: 'draft',
      publishedAt: new Date('2024-03-15'),
    },
    {
      title: 'Understanding Container Haulier Services in Singapore',
      excerpt: 'Container haulier services form the backbone of Singapore\'s thriving logistics industry, connecting ports to warehouses and final delivery points.',
      content: `<h2>What Are Container Haulier Services?</h2><p>Container haulier services involve the transportation of shipping containers between ports, depots, warehouses, and customer premises using specialized prime movers and trailers.</p>
<h2>Types of Containers</h2><p>The most common container sizes in Singapore are 20-foot (TEU) and 40-foot (FEU) containers. Specialized containers include reefer (refrigerated), flat rack, and open-top containers.</p>
<h2>The Role in Singapore's Supply Chain</h2><p>As a global trading hub, Singapore processes millions of container movements annually. Efficient container haulage is critical to keeping the supply chain moving smoothly.</p>
<h2>Choosing a Container Haulier</h2><p>Key considerations include fleet size, permit management, GPS tracking capabilities, and experience with specific cargo types including dangerous goods.</p>
<h2>TSL's Container Haulier Services</h2><p>TSL Logistics operates a modern fleet of prime movers with comprehensive permit handling for oversized and hazardous cargo across Singapore and Malaysia.</p>`,
      categoryId: catMap['logistics'],
      status: 'draft',
      publishedAt: new Date('2024-02-28'),
    },
    {
      title: 'How Smart Warehousing Drives Business Growth',
      excerpt: 'Modern warehousing has evolved far beyond simple storage. Discover how smart warehousing solutions can optimize your supply chain and drive business growth.',
      content: `<h2>The Evolution of Warehousing</h2><p>Traditional warehousing focused purely on storage. Today's smart warehouses integrate technology, process optimization, and value-added services to enhance the entire supply chain.</p>
<h2>Key Features of Smart Warehousing</h2><p>Smart warehouses use inventory management systems, barcode scanning, strategic location planning, and climate-controlled storage to maximize efficiency.</p>
<h2>Reducing Operational Costs</h2><p>By optimizing space utilization and inventory control, smart warehousing can significantly reduce carrying costs and improve cash flow.</p>
<h2>Value-Added Services</h2><p>Modern warehouses offer services beyond storage: pick-and-pack, labeling, kitting, and last-mile distribution support.</p>
<h2>TSL Warehousing Solutions</h2><p>TSL Logistics provides comprehensive warehousing solutions in Singapore, with flexible short-term and long-term storage options for businesses of all sizes.</p>`,
      categoryId: catMap['warehousing'],
      status: 'draft',
      publishedAt: new Date('2024-02-10'),
    },
    {
      title: 'Dangerous Goods Transportation: Safety First',
      excerpt: 'Transporting dangerous goods requires strict compliance with regulations and specialized expertise. Learn how TSL ensures safe DG transportation.',
      content: `<h2>What Are Dangerous Goods?</h2><p>Dangerous goods (DG) are substances that pose a risk to health, safety, property, or the environment. They are classified into 9 UN hazard classes including explosives, flammable liquids, and toxic substances.</p>
<h2>Regulatory Framework in Singapore</h2><p>DG transportation in Singapore is governed by the Singapore Civil Defence Force (SCDF) and follows international standards including ADR and IMDG codes.</p>
<h2>Required Documentation</h2><p>Proper DG transport requires Material Safety Data Sheets (MSDS), proper labeling, packaging certification, and transport permits from relevant authorities.</p>
<h2>Driver Training & Certification</h2><p>All DG drivers must hold valid ADR certificates and undergo regular refresher training. TSL ensures all personnel handling DG cargo are fully certified.</p>
<h2>TSL's DG Capabilities</h2><p>TSL Logistics maintains purpose-built DG trucks with proper ventilation, spill containment, and emergency response equipment for all classes of dangerous goods.</p>`,
      categoryId: catMap['logistics'],
      status: 'draft',
      publishedAt: new Date('2024-01-22'),
    },
    {
      title: 'Choosing the Right Vehicle for Your Cargo Needs',
      excerpt: 'From small vans to heavy prime movers, selecting the right vehicle for your cargo is crucial for efficiency and cost-effectiveness.',
      content: `<h2>Cargo Assessment</h2><p>Before choosing a vehicle, assess your cargo: dimensions, weight, fragility, and special requirements (temperature, hazard class, etc.).</p>
<h2>Vehicle Types Available</h2><p>Common options include panel vans (up to 1.5 tons), lorries (3–10 tons), 40-footer trucks, prime movers with various trailer types, and specialized vehicles for oversized cargo.</p>
<h2>Cost Considerations</h2><p>While a larger vehicle might seem like overkill, it could be more cost-effective when considering multiple trips. Get quotes for different configurations.</p>
<h2>Route Planning</h2><p>Some vehicles have restrictions on certain roads, especially for heavy vehicles or DG transport. Always verify route suitability before booking.</p>
<h2>TSL Fleet</h2><p>TSL Logistics offers a comprehensive fleet covering all cargo types, with experienced drivers and real-time GPS tracking for full shipment visibility.</p>`,
      categoryId: catMap['logistics'],
      status: 'draft',
      publishedAt: new Date('2024-01-08'),
    },
    {
      title: 'The Future of Logistics in Singapore: Trends to Watch',
      excerpt: 'Singapore\'s logistics industry is undergoing a digital transformation. Here are the key trends shaping the future of logistics in Singapore.',
      content: `<h2>Digital Transformation</h2><p>The adoption of cloud-based logistics management systems, IoT tracking, and data analytics is accelerating across Singapore's logistics sector.</p>
<h2>Green Logistics</h2><p>With Singapore's commitment to net-zero emissions by 2050, logistics companies are investing in electric vehicles, solar-powered warehouses, and route optimization to reduce carbon footprints.</p>
<h2>E-Commerce Growth</h2><p>The explosive growth of e-commerce is driving demand for last-mile delivery solutions, returns management, and flexible fulfillment options.</p>
<h2>Automation & Robotics</h2><p>Warehouse automation including automated guided vehicles (AGVs), robotic picking systems, and automated storage and retrieval systems (ASRS) are becoming mainstream.</p>
<h2>Supply Chain Resilience</h2><p>Post-pandemic, companies are prioritizing supply chain resilience through diversified sourcing, regional warehousing, and better demand forecasting.</p>
<h2>TSL's Commitment to Innovation</h2><p>TSL Logistics continuously invests in technology and processes to stay ahead of industry trends and deliver superior service to clients.</p>`,
      categoryId: catMap['industry-insights'],
      status: 'draft',
      publishedAt: new Date('2023-12-15'),
    },
  ];

  for (const post of posts) {
    const title = post.title;
    const slug = slugify(title);
    await db
      .insert(blogPosts)
      .values({
        id: randomUUID(),
        title,
        slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: null,
        categoryId: post.categoryId,
        authorId: adminUser.id,
        status: post.status,
        metaTitle: title,
        metaDescription: post.excerpt,
        readingTime: Math.max(1, Math.ceil(post.content.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200)),
        publishedAt: post.publishedAt,
      })
      .onDuplicateKeyUpdate({ set: { updatedAt: new Date() } });
  }

  console.log(`  ✅ ${posts.length} blog posts seeded (as drafts — publish them from back-office)`);
  console.log('\n✅ Seed complete!');
  console.log('⚠️  Change the admin password after first login!');
}

seed()
  .catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  })
  .finally(() => pool.end());

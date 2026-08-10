// One-off seed script for categories.
// Run with: node prisma/seedCategories.js
// It safely skips any category that already exists (no duplicates).
import prisma from "../src/config/prisma.js";

const categoryNames = ["Electronics", "Fashion", "Home & Kitchen", "Sports", "Books"];

for (const name of categoryNames) {
    const existing = await prisma.category.findUnique({ where: { name } });
    if (existing) {
        console.log(`SKIP (already exists): ${name}`);
        continue;
    }
    const category = await prisma.category.create({ data: { name } });
    console.log(`CREATED: ${category.name} (id=${category.id})`);
}

await prisma.$disconnect();
console.log("Seeding categories finished.");

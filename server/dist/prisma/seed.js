// prisma/seed.ts
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const prisma = new PrismaClient();
/* ---------------------------------- */
/* Helpers                            */
/* ---------------------------------- */
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
function toPascalCase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
function toCamelCase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}
/* ---------------------------------- */
/* Reset PostgreSQL ID sequences       */
/* ---------------------------------- */
async function resetSequence(modelName) {
    const modelNameCamel = toCamelCase(modelName);
    const model = prisma[modelNameCamel];
    if (!model)
        return;
    const last = await model.findFirst({
        orderBy: { id: "desc" },
        select: { id: true },
    });
    if (!last)
        return;
    await prisma.$executeRawUnsafe(`
    SELECT setval(
      pg_get_serial_sequence('"${modelName}"', 'id'),
      ${last.id + 1},
      false
    );
  `);
    console.log(`✅ Reset sequence for ${modelName}`);
}
/* ---------------------------------- */
/* Delete all data (dependency-safe)   */
/* ---------------------------------- */
async function deleteAllData(orderedFileNames) {
    const modelNames = orderedFileNames.map((file) => toPascalCase(path.basename(file, path.extname(file))));
    for (const modelName of modelNames.reverse()) {
        const model = prisma[toCamelCase(modelName)];
        if (!model)
            continue;
        await model.deleteMany({});
        console.log(`🗑️ Cleared ${modelName}`);
    }
}
/* ---------------------------------- */
/* Special insert for Location        */
/* ---------------------------------- */
async function insertLocationData(locations) {
    for (const loc of locations) {
        const { country, city, state, address, postalCode, coordinates } = loc;
        try {
            await prisma.$executeRaw `
        INSERT INTO "Location" ("country", "city", "state", "address", "postalCode", "coordinates")
        VALUES (${country}, ${city}, ${state}, ${address}, ${postalCode}, ST_GeomFromText(${coordinates}, 4326))
      `;
            console.log(`Inserted location: ${city}`);
        }
        catch (error) {
            console.error(`Error inserting location for ${city}:`, error);
        }
    }
}
/* ---------------------------------- */
/* Seed main logic                     */
/* ---------------------------------- */
async function main() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const dataDir = path.join(__dirname, "seedData");
    /**
     * ORDER MATTERS (foreign keys)
     */
    const orderedFileNames = [
        "location.json", // <-- handled specially
        "user.json",
        "property.json",
        "lease.json",
        "application.json",
        "payment.json",
    ];
    /* 1️⃣ Clear existing data */
    await deleteAllData(orderedFileNames);
    /* 2️⃣ Insert seed data */
    for (const fileName of orderedFileNames) {
        const filePath = path.join(dataDir, fileName);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        const modelName = toPascalCase(path.basename(fileName, path.extname(fileName)));
        if (modelName === "Location") {
            // Use raw SQL for PostGIS coordinates
            await insertLocationData(data);
            continue; // skip generic create
        }
        const model = prisma[toCamelCase(modelName)];
        if (!model) {
            console.warn(`⚠️ Model ${modelName} not found`);
            continue;
        }
        for (const item of data) {
            await model.create({ data: item });
        }
        console.log(`✅ Seeded ${modelName}`);
        await resetSequence(modelName);
        await sleep(300);
    }
}
/* ---------------------------------- */
/* Run seed                            */
/* ---------------------------------- */
main()
    .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seed.js.map
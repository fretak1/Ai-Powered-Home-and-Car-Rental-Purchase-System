// prisma.config.ts
import 'dotenv/config';
import { defineConfig, env } from "prisma/config";
export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'tsx prisma/seed.ts', // Use the seed script from your `package.json`
    },
    datasource: {
        url: env("DATABASE_URL"), // Moved here from schema.prisma
    }
});
//# sourceMappingURL=prisma.config.js.map
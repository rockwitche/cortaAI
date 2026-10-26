import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

export default defineConfig({
  earlyAccess: true,
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  migrate: {
    async adapter() {
      const connectionString = process.env.DATABASE_URL ?? '';
      const pool = new pg.Pool({ connectionString });
      return new PrismaPg(pool);
    },
  },
});

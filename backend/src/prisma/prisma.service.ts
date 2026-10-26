import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const connectionString = process.env.DATABASE_URL;
    if (connectionString) {
      const pool = new pg.Pool({ connectionString });
      const adapter = new PrismaPg(pool);
      super({ adapter });
    } else {
      super();
    }
  }

  async onModuleInit() {
    try {
      await this.$connect();
    } catch (e) {
      console.warn('Prisma: Could not connect to database on module init:', (e as Error)?.message ?? e);
    }
  }
}


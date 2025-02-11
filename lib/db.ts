import { PrismaClient } from "@prisma/client";

// declare global {
//   let prisma: PrismaClient | undefined;
// }
//
// export const db: PrismaClient = new PrismaClient();

// If we're not in production, let's save `db` to the global object to prevent crashes
// if (process.env.NODE_ENV !== 'production') {
//   globalThis.prisma = db;
// }

// lib/prisma.ts

const globalForPrisma = global as unknown as { db: PrismaClient };

export const db = globalForPrisma.db || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db;

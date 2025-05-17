import "server-only";

import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
import * as schema from "./schema";
import { drizzle as nodedrizzle } from "drizzle-orm/node-postgres"
config({ path: ".env.local" });

const neondb = drizzle(neon(process.env.DATABASE_URL!), { schema });
const postgresdb = nodedrizzle(process.env.DATABASE_URL!, { schema });

const db = process.env.NODE_ENV === "development" ? postgresdb : neondb;

export { db };

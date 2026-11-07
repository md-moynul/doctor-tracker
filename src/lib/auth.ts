// dns for server error
import { setServers } from "node:dns/promises";
try {
    setServers(["1.1.1.1", "8.8.8.8"]);
} catch {
    // Ignored in cloud environments (e.g. Vercel) where custom DNS cannot be set
}

import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/doctor-tracker";
const client = new MongoClient(mongoUri);
const db = client.db('doctor-traker');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client,
    }),
    emailAndPassword: {
        enabled: true,
    },
});

export { getServerSession, isAuthenticated, requireAuth } from "./auth-helpers";
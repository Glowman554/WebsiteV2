import { connectDatabase } from "./server/database/drizzle.ts";

import "@std/dotenv/load";
import { utInit } from "./server/uploadthing.ts";

export async function common() {
    await connectDatabase();
    utInit();
}

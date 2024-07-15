import { connectDatabase } from "./server/database/drizzle.ts";
import { utInit } from "./server/uploadthing.ts";
import { openaiInit } from "./server/openai.ts";

import "@std/dotenv/load";

export async function common() {
    await connectDatabase();
    utInit();
    openaiInit();
}

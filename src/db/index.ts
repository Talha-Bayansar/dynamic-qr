import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const queryClient = postgres(process.env.DATABASE_URL!);

function singleton<Value>(
  name: string,
  value: ReturnType<typeof drizzle>
): ReturnType<typeof drizzle> {
  const globalAny: any = global;
  globalAny.__singletons = globalAny.__singletons || {};

  if (!globalAny.__singletons[name]) {
    globalAny.__singletons[name] = value;
  }

  return globalAny.__singletons[name];
}

export const db =
  process.env.NODE_ENV !== "production"
    ? singleton("db", drizzle(queryClient))
    : drizzle(queryClient);

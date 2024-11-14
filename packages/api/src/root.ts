import { authRouter } from "./router/auth";
import { listingsRouter } from "./router/listing";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  listings: listingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { createTRPCRouter } from "./trpc";
import { transactionRouter } from "./routers/transactions";
import { userRouter } from "./routers/users";
import { incomeRouter } from "./routers/incomes";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  transaction: transactionRouter,
  user: userRouter,
  income: incomeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

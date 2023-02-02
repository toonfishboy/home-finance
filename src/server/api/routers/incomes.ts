import { z } from 'zod';
import { publicProcedure, createTRPCRouter } from '../trpc';

export const incomeRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.income.findMany({
        where: { userId: input?.userId },
      });
    }),
});

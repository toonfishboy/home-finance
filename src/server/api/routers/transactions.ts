import { z } from 'zod';
import { roundDecimals } from '../../../utils/helper';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const transactionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ amount: z.number(), userId: z.string(), date: z.date() }))
    .mutation(({ ctx, input: { amount, userId, date } }) => {
      return ctx.prisma.transaction.create({
        data: {
          amount: roundDecimals(amount),
          userId,
          date,
        },
      });
    }),
  getAll: publicProcedure
    .input(
      z.optional(
        z.object({
          userIds: z.optional(z.array(z.string())),
          startTime: z.optional(z.date()),
          endTime: z.optional(z.date()),
        })
      )
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.transaction.findMany({
        where: { userId: { in: input?.userIds }, date: { lte: input?.endTime, gte: input?.startTime } },
        include: { user: true },
      });
    }),
  delete: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.transaction.delete({ where: { id: input.id } });
  }),
});

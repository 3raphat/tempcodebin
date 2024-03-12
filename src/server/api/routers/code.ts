import { createTRPCRouter, publicProcedure } from "~/server/api/trpc"
import { z } from "zod"

import { nanoid } from "~/lib/utils"

export const codeRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        code: z.string(),
        language: z.string(),
        duration: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.code.create({
        data: {
          id: nanoid(),
          code: input.code,
          language: input.language,
          duration: input.duration,
          createdById: ctx.session?.user.id,
        },
      })
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.code.findMany()
  }),

  getFromId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.code.findFirst({
        where: { id: input.id },
      })
    }),

  deleteById: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.code.delete({
        where: { id: input.id },
      })
    }),

  incrementViews: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.db.code.update({
        where: { id: input.id },
        data: {
          views: {
            increment: 1,
          },
        },
      })
    }),
})

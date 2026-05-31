import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/trpc';

const COUNTS: Record<string, number> = { leicht: 5, mittel: 8, schwer: 10 };

export const contentRouter = createTRPCRouter({
  getQuestions: publicProcedure
    .input(z.object({
      type: z.enum(['anlaute', 'silben', 'endlaute', 'woerter']),
      difficulty: z.enum(['leicht', 'mittel', 'schwer']).default('mittel'),
    }))
    .query(async ({ ctx, input }) => {
      const { data: all } = await ctx.supabase
        .from('Question')
        .select('*')
        .eq('type', input.type);

      const count = COUNTS[input.difficulty] ?? 8;
      return (all ?? []).sort(() => Math.random() - 0.5).slice(0, count);
    }),
});

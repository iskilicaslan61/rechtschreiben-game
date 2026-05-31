import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '@/server/trpc';

const createId = () => crypto.randomUUID();

export const sessionRouter = createTRPCRouter({
  save: protectedProcedure
    .input(z.object({
      module: z.enum(['anlaute', 'silben', 'endlaute', 'woerter']),
      difficulty: z.enum(['leicht', 'mittel', 'schwer']),
      score: z.number().int().min(0),
      totalItems: z.number().int().min(0),
      completed: z.boolean(),
    }))
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const { data: session } = await ctx.supabase
        .from('GameSession')
        .insert({
          id: createId(),
          userId,
          module: input.module,
          difficulty: input.difficulty,
          score: input.score,
          totalItems: input.totalItems,
          completedAt: input.completed ? new Date().toISOString() : null,
        })
        .select()
        .single();

      if (input.score > 0) {
        const { data: existing } = await ctx.supabase
          .from('Progress')
          .select('id, totalScore')
          .eq('userId', userId)
          .maybeSingle();

        if (existing) {
          await ctx.supabase
            .from('Progress')
            .update({ totalScore: existing.totalScore + input.score, lastPlayed: new Date().toISOString() })
            .eq('userId', userId);
        } else {
          await ctx.supabase.from('Progress').insert({
            id: createId(),
            userId,
            totalScore: input.score,
            stars: Math.min(5, Math.floor(input.score / 5) + 1),
            lastPlayed: new Date().toISOString(),
          });
        }
      }

      return session;
    }),

  recent: protectedProcedure.query(async ({ ctx }) => {
    const { data } = await ctx.supabase
      .from('GameSession')
      .select('*')
      .eq('userId', ctx.session.user.id)
      .order('createdAt', { ascending: false })
      .limit(10);
    return data ?? [];
  }),

  childrenSessions: protectedProcedure.query(async ({ ctx }): Promise<Array<Record<string, unknown> & { childName: string }>> => {
    const { data: children } = await ctx.supabase
      .from('User')
      .select('id, name')
      .eq('parentId', ctx.session.user.id);

    const safeChildren = (children as { id: string; name: string }[] | null) ?? [];
    if (!safeChildren.length) return [];

    const childIds = safeChildren.map(c => c.id);
    const { data: sessions } = await ctx.supabase
      .from('GameSession')
      .select('*')
      .in('userId', childIds)
      .order('createdAt', { ascending: false })
      .limit(20);

    const nameMap = Object.fromEntries(safeChildren.map(c => [c.id, c.name]));
    return ((sessions as Record<string, unknown>[] | null) ?? []).map(s => ({
      ...s,
      childName: nameMap[s['userId'] as string] ?? 'Unbekannt',
    }));
  }),
});

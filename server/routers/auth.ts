import { z } from 'zod';
import bcrypt from 'bcryptjs';
const createId = () => crypto.randomUUID();
import { createTRPCRouter, publicProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';

export const authRouter = createTRPCRouter({
  register: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string().min(6),
      name: z.string().min(2),
      role: z.enum(['CHILD', 'PARENT']).default('CHILD'),
      parentId: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { data: exists } = await ctx.supabase
        .from('User')
        .select('id')
        .eq('email', input.email)
        .maybeSingle();

      if (exists) throw new TRPCError({ code: 'CONFLICT', message: 'E-Mail bereits vergeben' });

      const hashed = await bcrypt.hash(input.password, 12);
      const userId = createId();

      const { data: user, error } = await ctx.supabase
        .from('User')
        .insert({
          id: userId,
          email: input.email,
          password: hashed,
          name: input.name,
          role: input.role,
          parentId: input.parentId ?? null,
        })
        .select('id, email, name, role')
        .single();

      if (error) throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: error.message });

      await ctx.supabase.from('Progress').insert({
        id: createId(),
        userId,
      });

      return user;
    }),
});

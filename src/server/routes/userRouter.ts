import { publicProcedure as procedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import prisma from "@database/prisma";
import { Prisma } from "@prisma/client";

export const userRouter = router ({
    signup: procedure
        .input(z.object({
            email: z.string().email(),
            username: z.string().min(3),
            clerkAuthId: z.string(),
        })
        )
        .mutation(async (opts) => {
            try {
                console.log(opts.input);
                const user = await prisma.hSUser.create({
                  data: {
                    email: opts.input.email,
                    username: opts.input.username,
                    clerkAuthId: opts.input.clerkAuthId,
                  },
                });
                return user;
              } catch (error) {
                if (error instanceof Prisma.PrismaClientKnownRequestError) {
                  if (error.code === 'P2002') {
                    // Unique constraint violation
                    const uniqueField = error.meta?.target as string[];
                    if (uniqueField.includes('email')) {
                      throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Email already exists',
                      });
                    } else if (uniqueField.includes('username')) {
                      throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Username already exists',
                      });
                    } else if (uniqueField.includes('clerkAuthId')) {
                      throw new TRPCError({
                        code: 'BAD_REQUEST',
                        message: 'Clerk Auth ID already exists',
                      });
                    }
                  }
                }
                throw error;
              }
        }),
    verifyEmailAddress: procedure
        .input(z.object({
            userClerkAuthId: z.string(),
        }))
        .mutation(async (opts) => {
            console
            const user = await prisma.hSUser.update({
                where: { clerkAuthId: opts.input.userClerkAuthId },
                data: { verified: true },
            });
            return user;
        }
        )
})

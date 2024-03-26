import { publicProcedure as procedure, router } from "./trpc";
require('dotenv').config();
import { userRouter } from "./routes/userRouter";
import { schoolRouter } from "./routes/schoolRouter";

export const appRouter = router({
    user: userRouter,
    school: schoolRouter
});

export type AppRouter = typeof appRouter;

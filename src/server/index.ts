import { publicProcedure as procedure, router } from "./trpc";
require('dotenv').config();
import { userRouter } from "./routes/userRouter";


export const appRouter = router({
    user: userRouter,
});

export type AppRouter = typeof appRouter;

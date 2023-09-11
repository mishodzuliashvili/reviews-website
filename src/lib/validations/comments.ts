import { z } from "zod";

export const createCommentSchema = z.object({
    text: z
        .string()
        .min(1, "Comment must be at least 1 character long")
        .max(500, "Comment must be at most 500 characters long"),
});

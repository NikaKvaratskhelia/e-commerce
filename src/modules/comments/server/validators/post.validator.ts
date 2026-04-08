import z from "zod";

export const commentSchema = z.object({
  content: z.string().min(1, "კომენტარი აუცილებელია."),
  rating: z.number().min(1).max(5, "rating უნდა იყოს 1-დან 5-მდე."),
});

import { z } from "zod";

export const FilmeSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  year: z.string().min(1),
  poster: z.string().min(1),
  genre: z.string(),
  plot: z.string(),
  status: z.enum(["assistido", "pendente"]),
  savedAt: z.string().min(1),
});

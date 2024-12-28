import { z } from "zod";

export const createSaleSchema = z.object({
  product: z.array(
    z.object({
      id: z.coerce.number(),
      quantity: z.coerce.number().min(1).positive(),
    })
  ),
});

export type CreateSaleSchema = z.infer<typeof createSaleSchema>;

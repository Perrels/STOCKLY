import { z } from "zod";

export const deleteSaleSchema = z.object({ id: z.coerce.number() });

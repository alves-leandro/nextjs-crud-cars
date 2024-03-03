import { z } from "zod";

export const VeicleSchema = z.object({
    id: z.string(),
    name: z.string(),
    date: z.string(),
    status: z.string(),
    avaliation: z.string()
})

export type VeicleData = z.infer<typeof VeicleSchema>
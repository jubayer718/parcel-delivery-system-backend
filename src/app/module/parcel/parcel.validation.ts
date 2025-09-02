import z from "zod";

export const createParcelZodSchema = z.object({
    weight: z.string({ error: "Weigh must be string" }),
    price: z.number({ error: "price must be number" }),
    receiverId: z.string({ error: "sender must be string" }),
    originalAddress: z.string({ error: "OriginalAddress must be string" }),
    destinationAddress: z.string({
        error: "destinationAddress must be string",
    }),
});
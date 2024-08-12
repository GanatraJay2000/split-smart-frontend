import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  users: z.array(userSchema),
});

export type User = z.infer<typeof userSchema>;
export type Group = z.infer<typeof groupSchema>;

export const orderSchema = z.object({
  id: z.number(),
  date: z.string(),
  items: z.array(
    z.object({
      name: z.string(),
      users: z.array(z.number()),
    })
  ),
});

export type Order = z.infer<typeof orderSchema>;

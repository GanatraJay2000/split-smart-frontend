import { platform } from "os";
import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  short: z.string(),
});

export const groupDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  users: z.array(z.number()),
});

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
  users: z.array(z.optional(userSchema)),
});

export const itemSchema = z.object({
  name: z.string(),
  cost: z.number(),
  users: z.array(z.number()),
  groups: z.array(z.number()),
  extras: z.array(z.number()),
});

export const platformSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const orderSchema = z.object({
  id: z.number(),
  date: z.string(),
  platform: platformSchema,
  items: z.array(itemSchema),
});

export type User = z.infer<typeof userSchema>;
export type Group = z.infer<typeof groupDataSchema>;
export type GroupWithUsers = z.infer<typeof groupSchema>;

export type Item = z.infer<typeof itemSchema>;
export type Order = z.infer<typeof orderSchema>;
export type Platform = z.infer<typeof platformSchema>;

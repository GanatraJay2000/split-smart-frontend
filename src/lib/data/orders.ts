import { init } from "next/dist/compiled/webpack/webpack";
import { Order } from "../types/dataTable/schema";

export const orders = [
  {
    id: 1,
    date: "2024-08-11",
    items: [
      {
        name: "Cilantro",
        cost: 0.68,
        users: [1, 2, 3, 4, 5, 6, 7, 8],
      },
      {
        name: "Tofu",
        cost: 3.42,
        users: [3],
      },
      {
        name: "Hashbrowns",
        cost: 2.98,
        users: [1, 2],
      },
      {
        name: "Bananas",
        cost: 1.48,
        users: [1, 7],
      },
      {
        name: "Onions",
        cost: 5.48,
        users: [9],
      },
      {
        name: "Ice Cream 1",
        cost: 4.48,
        users: [8],
      },
      {
        name: "Ice Cream Big",
        cost: 2.78,
        users: [3, 7],
      },
      {
        name: "Chips",
        cost: 2.68,
        users: [5],
      },
    ],
  },
];

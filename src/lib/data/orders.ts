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
        groups: [1],
        extras: [],
      },
      {
        name: "Tofu",
        cost: 3.42,
        users: [3],
        groups: [],
        extras: [],
      },
      {
        name: "Hashbrowns",
        cost: 2.98,
        users: [1, 2],
        groups: [],
        extras: [],
      },
      {
        name: "Bananas",
        cost: 1.48,
        users: [1, 7],
        groups: [],
        extras: [],
      },
      {
        name: "Onions",
        cost: 5.48,
        users: [9],
        groups: [],
        extras: [],
      },
      {
        name: "Ice Cream 1",
        cost: 4.48,
        users: [8],
        groups: [],
        extras: [],
      },
      {
        name: "Ice Cream Big",
        cost: 10,
        users: [3, 7],
        groups: [],
        extras: [3, 3, 3],
      },
      {
        name: "Chips",
        cost: 2.68,
        users: [5],
        groups: [],
        extras: [],
      },
    ],
  },
];

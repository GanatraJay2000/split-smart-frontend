import { order1Items, order2Items, order3Items } from "./items";
import { platforms } from "./platforms";

export const orders = [
  {
    id: 1,
    date: "2024-08-11",
    platform: platforms[0],
    items: order1Items,
  },
  {
    id: 2,
    date: "2024-08-15",
    platform: platforms[1],
    items: order2Items,
  },
  {
    id: 3,
    date: "2024-08-15",
    platform: platforms[1],
    items: order3Items,
  },
];

export const groups: Array<{
  id: number;
  name: string;
  users: Array<number>;
}> = [
  {
    id: 1,
    name: "Common",
    users: [1, 2, 3, 4, 5, 6, 7, 8],
  },
  {
    id: 2,
    name: "Baldwin",
    users: [1, 2, 4],
  },
  {
    id: 3,
    name: "Cliff",
    users: [3, 5, 7],
  },
  {
    id: 4,
    name: "Jatayu",
    users: [6, 8, 9],
  },
];

export type groupTypes = typeof groups;

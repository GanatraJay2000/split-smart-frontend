export const users = [
  {
    id: 1,
    name: "Jay Ganatra",
    short: "Jay.G",
  },
  {
    id: 2,
    name: "Mrunali Ganatra",
    short: "MG",
  },
  {
    id: 3,
    name: "Jash Ghelani",
    short: "JG",
  },
  {
    id: 4,
    name: "Aayush Trivedi",
    short: "AT",
  },
  {
    id: 5,
    name: "Rutik Kothawala",
    short: "RK",
  },
  {
    id: 6,
    name: "Jash Shah",
    short: "JS",
  },
  {
    id: 7,
    name: "Neel Mehta",
    short: "NM",
  },
  {
    id: 8,
    name: "Yash Vora",
    short: "YV",
  },
  {
    id: 9,
    name: "Chitra Dusane",
    short: "CD",
  },
];

export type userTypes = typeof users;

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

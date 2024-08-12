export const users = [
  {
    id: 1,
    name: "Jay Ganatra",
    short: "Jay G",
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
  users: Array<{ id: number; name: string }>;
}> = [
  {
    id: 1,
    name: "Common",
    users: users.slice(0, 8),
  },
];

export type groupTypes = typeof groups;

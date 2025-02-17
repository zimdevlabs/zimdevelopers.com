export type UserType = {
  _id: string;
  _type: "developer" | "employer";
  name: string;
  password: string;
  email: string;
  username: string;
  avatar: string;
  groupId?: string;
};

export const users = [
  {
    _id: "dev1",
    _type: "developer",
    name: "Tino Mazorodze",
    password: "123",
    groupId: "g1",
    email: "labs@zimdevelopers.com",
    username: "tinomazorodze",
    avatar: "https://www.tinomazorodze.com/assets/portrait.webp",
  },
  {
    _id: "emp1",
    _type: "employer",
    name: "Calvin Bere",
    password: "321",
    email: "labs@zimdevelopers.com",
    username: "calvinbere",
    avatar: "https://www.tinomazorodze.com/assets/portrait.webp",
  },
] satisfies UserType[];

export type GroupType = {
  id: string;
  name: string;
  _type: "team" | "org" | "solo";
  tagLine: string;
  avatar: string;
};

export const groups = [
  {
    id: "g1",
    _type: "org",
    avatar: "https://www.xfinitypros.com/apple-touch-icon.png",
    name: "Xfinity Pros",
    tagLine: "Leading the online industry",
  },
] satisfies GroupType[];

export type ArticleType = {
  _id: string;
  title: string;
  author: {
    _id: string;
    groudId?: string;
  };
};

export const articles = [
  {
    _id: "a1",
    title: "Best React UI libraries",
    author: {
      _id: "dev1",
      groudId: "g1",
    },
  },
] satisfies ArticleType[];

export type UserRatingsType = {
  _id: string;
  employerId: string;
  userId: string;
  rating: number;
  createdAt: string;
};

export const userRatings = [
  {
    _id: "ur1",
    createdAt: "2025-02-17",
    employerId: "emp1",
    userId: "dev1",
    rating: 4,
  },
] satisfies UserRatingsType[];

export type GroupRatingsType = {
  _id: string;
  rating: number;
  employerId: string;
  groupId: string;
  createdAt: string;
};

export const groupRatings = [
  {
    _id: "gr1",
    rating: 5,
    createdAt: "2025-02-17",
    employerId: "emp1",
    groupId: "g1",
  },
] satisfies GroupRatingsType[];

export type siteConfigType = {
  name: string;
  shortName: string;
  twitterUsername: string;
  url: {
    logo: string;
    web: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
    facebook?: string;
    banner: string;
  };
};

export type GuestUserType = {
  username: string;
};

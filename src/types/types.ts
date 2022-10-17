export type User = {
  _id: string;
  email: string;
  name: string;
  picture: string | null;
}

export type VolumeInfo = {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher: string;
  publishedDate: string;
  description: string | null;
  pageCount: number;
  categories: string[];
  rating: number | null;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
  language: string;
};

export type GoogleUser = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string | null;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string | null;
  sub: string;
};
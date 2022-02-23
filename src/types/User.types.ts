export interface UserConstructor {
  tag: string;
  firstname: string;
  lastname: string;
  joined: Date;
  admin: boolean;
  banned: boolean;
}

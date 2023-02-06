import { IUser } from "@/type";

declare module "next-auth" {
  interface Session {
    user: IUser;
  }
}

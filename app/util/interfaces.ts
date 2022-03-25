import { Profile, User } from "./db.server";

export interface UserWithProfile extends Partial<User> {
  profile: Profile;
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

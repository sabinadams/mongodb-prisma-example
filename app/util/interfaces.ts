import { Profile } from "./db.server";

export interface UserIdWithProfile {
  id: string;
  profile: Profile;
}

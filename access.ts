import { ListAccessArgs } from "./types";
// At it's simplest, access control returns a yes or no value depending on the users session

export function isSignedIn({ session }: ListAccessArgs) {
  return !!session;
}

import { CustomError } from "./error";
import fetcher from "./fetcher";

interface AuthInfo {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export const auth = (mode: "signin" | "signup", body: AuthInfo) => {
  return fetcher<boolean | CustomError>(mode, body);
};

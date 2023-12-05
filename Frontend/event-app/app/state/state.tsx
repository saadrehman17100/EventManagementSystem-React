import { atom, useAtom } from "jotai";
import { signInApi, signUpApi } from "../services/api";

export interface User {
  UserName: string;
  UserEmail: string;
  UserPassword: string;
  UserRole: string;
  UserID: number;
}

export const userAtom = atom<User | null>(null);

export const useUser = () => {
  const [user, setUser] = useAtom(userAtom);

  const loginUser = async (credentials: {
    UserEmail: string;
    UserPassword: string;
  }) => {
    try {
      const user = await signInApi(credentials);
      console.log(user);
      setUser(user);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const registerUser = async (credentials: {
    UserName: string;
    UserEmail: string;
    UserPassword: string;
  }) => {
    try {
      const user = await signUpApi(credentials);
      setUser(user);
    } catch (e) {
      console.log("Register Failed", e);
    }
  };

  const logoutUser = () => {
    setUser(null);
  };

  return { user, loginUser, logoutUser, registerUser };
};

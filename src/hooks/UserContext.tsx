import axios, { AxiosResponse } from "axios";
import { NextPage } from "next";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../classes/User.class";
import { apiUrl } from "../util/global.config";
import { useAuth } from "./AuthContext";

type UserContext = [User, (user: User) => void];

export const UserContext = createContext<UserContext>(null);

/**
 * Provider for the user context to store the logged in user
 */

export const UserProvider: NextPage = ({ children }): JSX.Element => {
  const [current, setCurrent] = useState<User>(null);
  const { token } = useAuth();

  useEffect(() => {
    requestUser();
  }, [token]);

  const requestUser = async () => {
    if (!token) return;
    try {
      const response: AxiosResponse = await axios.get(`${apiUrl}/user/`, { headers: { Authorization: `Bearer ${token}` } });
      const user: User = new User({ ...response.data, tag: response.data.tag });
      setCurrent(user);
    } catch (e) {}
  };

  return <UserContext.Provider value={[current, setCurrent]} children={children} />;
};

/**
 * Access the currently logged in user
 */

export const useUser = (): User => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within an UserContext");
  }

  return context[0];
};

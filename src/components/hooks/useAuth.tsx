import React, { createContext, useContext, useEffect, useState } from "react";
import * as AuthSession from "expo-auth-session";
import { api } from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IUser {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

interface IAuthContextData {
  user: IUser | null;
  isSignin: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

interface IAuthProvider {
  children: React.ReactNode;
}

interface IAuthResponse {
  token: string;
  user: IUser;
}

interface IAuthorizationResponse {
  params: {
    code?: string;
    error?: string;
  };
  type?: string;
}

const CLIENT_ID = "2d42a6604ea74c1ae1d7";
const SCOPE = "read:user";
const USER_STORAGE = "@appheat:user";
const TOKEN_STORAGE = "appheat:token";

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider = ({ children }: IAuthProvider) => {
  const [isSignin, setIsSignin] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    loadUserStorageData();
  }, []);

  const loadUserStorageData = async () => {
    setIsSignin(true);

    try {
      const userStorage = await AsyncStorage.getItem(USER_STORAGE);
      const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

      if (userStorage && tokenStorage) {
        api.defaults.headers.common.authorization = `Bearer ${tokenStorage}`;

        setUser(JSON.parse(userStorage));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSignin(false);
    }
  };

  const signIn = async () => {
    setIsSignin(true);

    try {
      const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPE}`;
      const authSessionResponse = (await AuthSession.startAsync({
        authUrl,
      })) as IAuthorizationResponse;

      if (
        authSessionResponse.type === "success" &&
        authSessionResponse.params.error !== "access_denied"
      ) {
        const authResponse = await api.post("/authenticate", {
          code: authSessionResponse.params.code,
        });

        const { user, token } = authResponse.data as IAuthResponse;
        api.defaults.headers.common.authorization = `Bearer ${token}`;

        await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
        await AsyncStorage.setItem(TOKEN_STORAGE, token);

        setUser(user);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSignin(false);
    }
  };

  const signOut = async () => {
    setUser(null);

    await AsyncStorage.removeItem(USER_STORAGE);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signOut,
        isSignin: isSignin,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };

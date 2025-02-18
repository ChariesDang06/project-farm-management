import axios from "axios";
import { createContext, useEffect, useState, useCallback, ReactNode } from "react";

interface User {
  name: string;
  email: string;
  userId:string
  role:string
  expirationTime?: number;
}

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  loginApi: (inputs: { email: string; password: string }) => Promise<any>;
  logout: () => void;
}

const defaultAuthContext: AuthContextType = {
  currentUser: null,
  token: null,
  loginApi: async () => Promise.resolve(),
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") || "null")
  );
  const [token, setToken] = useState<string | null>(
    JSON.parse(localStorage.getItem("userToken") || "null")
  );

  const loginApi = async (inputs: { email: string; password: string }) => {
    const res = await axios.post("https://agriculture-traceability.vercel.app/api/v1/auth/login", inputs);
    const user: User = res.data.user;
    const accountToken: string = res.data.token;
    setCurrentUser({ ...user, expirationTime: Date.now() + 24 * 60 * 60 * 1000 });
    setToken(accountToken);
    localStorage.setItem("userToken", JSON.stringify(accountToken));
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
    localStorage.setItem("userToken", JSON.stringify(token));
  }, [currentUser, token]);

  useEffect(() => {
    const tokenExpirationTime = currentUser?.expirationTime;
    const currentTime = Date.now();

    if (tokenExpirationTime && currentTime < tokenExpirationTime) {
      const timeLeft = tokenExpirationTime - currentTime;
      const timeout = setTimeout(() => {
        alert("Đã hết thời gian đăng nhập");
        logout();
      }, timeLeft);

      return () => clearTimeout(timeout);
    }
  }, [currentUser, logout]);

  return (
    <AuthContext.Provider value={{ currentUser, token, loginApi, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

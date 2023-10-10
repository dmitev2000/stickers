import { createContext, useEffect, useReducer, ReactNode } from "react";

interface User {
  _id: string;
  username: string;
  role: string;
}

interface LoginSuccessPayload {
  user: User;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

export type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: LoginSuccessPayload }
  | { type: "LOGIN_FAILURE"; payload: string }
  | { type: "LOGOUT" };

const INITIAL_STATE: AuthState = {
  user: JSON.parse(localStorage.getItem("user") || "null"),
  token: JSON.parse(localStorage.getItem("token") || "null"),
  loading: false,
  error: null,
};

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: INITIAL_STATE, dispatch: () => {} });

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        loading: true,
        error: null,
        token: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        token: null,
        loading: false,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

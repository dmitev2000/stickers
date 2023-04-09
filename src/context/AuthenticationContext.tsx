import { createContext, useEffect, useReducer } from "react";

type AuthContextType = {
  user: any;
  token: any,
  loading: boolean;
  error: string;
  dispatch: (value: any) => void;
};

const getStoredUser = () => {
  const storedData = localStorage.getItem("user");
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      return parsedData;
    } catch (error) {
      console.error("Error parsing stored data:", error);
    }
  }
  return "";
};

const INITIAL_STATE: AuthContextType = {
  user: getStoredUser(),
  loading: false,
  token: "",
  error: "",
  dispatch: (value: any) => {},
};

export const AuthenticationContext = createContext(INITIAL_STATE);

const AuthReducer = (state: AuthContextType, action: any) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: "",
        token: "",
        loading: true,
        error: "",
        dispatch: state.dispatch,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.auth.token,
        loading: false,
        error: "",
        dispatch: state.dispatch,
      };
    case "LOGIN_FAILURE":
      return {
        user: "",
        token: "",
        loading: false,
        error: action.payload,
        dispatch: state.dispatch,
      };
    case "LOGOUT":
      return {
        user: "",
        token: "",
        loading: false,
        error: "",
        dispatch: state.dispatch,
      };
    default:
      return state;
  }
};

export const AuthenticationContextProvider = ({
  children,
}: {
  children: any;
}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthenticationContext.Provider
      value={{
        user: state.user,
        token: state.token,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

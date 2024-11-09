import { createContext, useMemo, useReducer, ReactNode } from "react";
import { layoutReducer } from "./reducer";
import { ContextState } from "../../interfaces";

export interface LayoutState {
  authToken: string | null;
  actionButtonClicksCount: number;
  isActionCounterLoading: boolean;
  isAuthenticated: boolean;
  isAuthTokenLoading: boolean;
}

const defaultValue: LayoutState = {
  authToken: null,
  actionButtonClicksCount: 0,
  isActionCounterLoading: true,
  isAuthenticated: false,
  isAuthTokenLoading: false,
};

export const LayoutContext = createContext<ContextState<LayoutState>>({
  state: defaultValue,
  dispatch: () => {},
});

interface Props {
  children?: ReactNode;
}

const LayoutProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(layoutReducer, defaultValue);
  const store = useMemo(() => ({ state, dispatch }), [state]);

  return (
    <LayoutContext.Provider value={store}>{children}</LayoutContext.Provider>
  );
};

export default LayoutProvider;

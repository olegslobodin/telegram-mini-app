import { createContext, useMemo, useReducer, ReactNode } from "react";
import { layoutReducer } from "./reducer";
import { ContextState } from "../../interfaces";

export interface LayoutState {
  count: number;
  isLoading: boolean;
}

const defaultValue: LayoutState = {
  count: 0,
  isLoading: true,
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

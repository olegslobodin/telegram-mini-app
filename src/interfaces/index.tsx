import { Dispatch } from "react";

export interface ReducerAction<T> {
  type: string;
  payload: T;
}

export interface ContextState<T> {
  state: T;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: Dispatch<any>;
}

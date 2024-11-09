import { LayoutState } from ".";
import { ReducerAction } from "../../interfaces";

export const LAYOUT_ACTION = {
  AUTH_TOKEN_LOAD_START: "AUTH_TOKEN_LOAD_START",
  AUTH_TOKEN_LOAD_SUCCESS: "AUTH_TOKEN_LOAD_SUCCESS",
  AUTH_TOKEN_LOAD_ERROR: "AUTH_TOKEN_LOAD_ERROR",
  COUNTER_LOADING_FINISHED: "COUNTER_LOADING_FINISHED",
  SET_COUNT: "SET_COUNT",
  INCREMENT_COUNTER: "INCREMENT_COUNTER",
};

export const layoutReducer = (
  state: LayoutState,
  { type, payload }: ReducerAction<number | string>
): LayoutState => {
  switch (type) {
    case LAYOUT_ACTION.AUTH_TOKEN_LOAD_START:
      return { ...state, isAuthTokenLoading: true };
    case LAYOUT_ACTION.AUTH_TOKEN_LOAD_SUCCESS:
      return {
        ...state,
        isAuthTokenLoading: false,
        isAuthenticated: true,
        authToken: payload as string,
      };
    case LAYOUT_ACTION.AUTH_TOKEN_LOAD_ERROR:
      return {
        ...state,
        isAuthTokenLoading: false,
        isAuthenticated: false,
        authToken: null,
      };
    case LAYOUT_ACTION.COUNTER_LOADING_FINISHED:
      return {
        ...state,
        actionButtonClicksCount: payload as number,
        isActionCounterLoading: false,
      };
    case LAYOUT_ACTION.SET_COUNT:
      return { ...state, actionButtonClicksCount: payload as number };
    case LAYOUT_ACTION.INCREMENT_COUNTER:
      return {
        ...state,
        actionButtonClicksCount: state.actionButtonClicksCount + 1,
      };
    default:
      return state;
  }
};

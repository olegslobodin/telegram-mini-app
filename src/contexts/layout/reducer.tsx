import { LayoutState } from ".";
import { ReducerAction } from "../../interfaces";

interface Action extends ReducerAction<number> {}

export const LAYOUT_ACTION = {
  COUNTER_LOADING_FINISHED: "COUNTER_LOADING_FINISHED",
  SET_COUNT: "SET_COUNT",
  INCREMENT_COUNTER: "INCREMENT_COUNTER",
};

export const layoutReducer = (
  state: LayoutState,
  { type, payload }: Action
): LayoutState => {
  switch (type) {
    case LAYOUT_ACTION.COUNTER_LOADING_FINISHED:
      return { ...state, count: payload, isLoading: false };
    case LAYOUT_ACTION.SET_COUNT:
      return { ...state, count: payload };
    case LAYOUT_ACTION.INCREMENT_COUNTER:
      return { ...state, count: state.count + 1 };
    default:
      return state;
  }
};

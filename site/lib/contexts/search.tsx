import { useCallback, useMemo, useReducer } from "react";

import { UseSearch } from "@commerce/product/use-search";
import { createCtx } from ".";

export type State = {
  pureProducts: Required<ReturnType<UseSearch>>["data"]["products"];
  setPureProducts: React.Dispatch<State["pureProducts"]>;
};

export const initialState: State = {
  pureProducts: [],
  setPureProducts: () => {},
};

export const SEARCH_ACTIONS = {
  SET_PURE_PRODUCTS: "set:pure_products",
} as const;

type Action = {
  type: typeof SEARCH_ACTIONS.SET_PURE_PRODUCTS;
  payload: {
    value: Parameters<State["setPureProducts"]>[0];
  };
};

export const [SearchContextProvider, useSearchCtx] = createCtx({
  name: "SearchContext",
  hookName: "useSearchCtx",
  providerName: "<SearchContext />",
  defaultValue: initialState,
});

const searchReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case SEARCH_ACTIONS.SET_PURE_PRODUCTS: {
      return {
        ...state,
        pureProducts: action.payload?.value,
      };
    }
    default: {
      return state;
    }
  }
};

export const SearchProvider = (props: React.PropsWithChildren): JSX.Element => {
  const [state, dispatch] = useReducer(searchReducer, initialState);

  const setPureProducts: State["setPureProducts"] = useCallback(
    value => dispatch({ type: SEARCH_ACTIONS.SET_PURE_PRODUCTS, payload: { value } }),
    [dispatch]
  );

  const memoizedState = useMemo(
    () => state,
    // eslint-disable-next-line
    [state.pureProducts.length]
  );

  const value = useMemo(
    () => ({
      ...memoizedState,
      setPureProducts,
    }),
    [memoizedState, setPureProducts]
  );

  return <SearchContextProvider value={value} {...props} />;
};

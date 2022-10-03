import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import React, { useCallback, useMemo } from "react";

import theme from "../../theme";
import { createCtx } from "./utils";

type MODAL_VIEWS = "SIGNUP_VIEW" | "LOGIN_VIEW" | "FORGOT_VIEW" | "CART_REMOVE_ITEM_VIEW";

type SIDEBAR_VIEWS =
  | "CART_VIEW"
  | "CHECKOUT_VIEW"
  | "PAYMENT_METHOD_VIEW"
  | "SHIPPING_VIEW"
  | "MOBILE_MENU_VIEW"
  | "FILTERS_VIEW";

export type State = {
  displaySidebar: boolean;
  displayModal: boolean;
  sidebarView: SIDEBAR_VIEWS;
  modalView: MODAL_VIEWS;
  modalDirection: number;
  userAvatar: string;
  itemIdToRemove: string;
  openSidebar: (params?: { view: State["sidebarView"] }) => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  closeSidebarIfPresent: State["closeSidebar"];
  openModal: (params?: { view: State["modalView"]; hasCloseSidebar?: boolean }) => void;
  closeModal: () => void;
  setModalView: React.Dispatch<State["modalView"]>;
  setSidebarView: React.Dispatch<State["sidebarView"]>;
  setUserAvatar: React.Dispatch<State["userAvatar"]>;
  setItemIdToRemove: React.Dispatch<State["itemIdToRemove"]>;
};

const initialState: State = {
  displaySidebar: false,
  displayModal: false,
  sidebarView: "CART_VIEW",
  modalView: "LOGIN_VIEW",
  modalDirection: 0,
  userAvatar: "",
  itemIdToRemove: "",
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleSidebar: () => {},
  closeSidebarIfPresent: () => {},
  openModal: () => {},
  closeModal: () => {},
  setModalView: () => {},
  setSidebarView: () => {},
  setUserAvatar: () => {},
  setItemIdToRemove: () => {},
};

export const UI_ACTIONS = {
  OPEN_SIDEBAR: "open:sidebar",
  CLOSE_SIDEBAR: "close:sidebar",
  OPEN_MODAL: "open:modal",
  CLOSE_MODAL: "close:modal",
  SET_MODAL_VIEW: "set:modal_view",
  SET_SIDEBAR_VIEW: "set:sidebar_view",
  SET_USER_AVATAR: "set:user_avatar",
  SET_ITEM_ID_TO_REMOVE: "set:item_id_to_remove",
} as const;

type Action =
  | {
      type: typeof UI_ACTIONS.OPEN_SIDEBAR;
      payload?: Parameters<State["openSidebar"]>[0];
    }
  | {
      type: typeof UI_ACTIONS.CLOSE_SIDEBAR;
    }
  | {
      type: typeof UI_ACTIONS.OPEN_MODAL;
      payload?: Parameters<State["openModal"]>[0];
    }
  | {
      type: typeof UI_ACTIONS.CLOSE_MODAL;
    }
  | {
      type: typeof UI_ACTIONS.SET_MODAL_VIEW;
      payload: {
        view: State["modalView"];
      };
    }
  | {
      type: typeof UI_ACTIONS.SET_SIDEBAR_VIEW;
      payload: {
        view: State["sidebarView"];
      };
    }
  | {
      type: typeof UI_ACTIONS.SET_USER_AVATAR;
      payload: {
        value: State["userAvatar"];
      };
    }
  | {
      type: typeof UI_ACTIONS.SET_ITEM_ID_TO_REMOVE;
      payload: {
        value: State["itemIdToRemove"];
      };
    };

export const [UIContextProvider, useUI] = createCtx({
  name: "UIContext",
  hookName: "useUI",
  providerName: "<UIContext />",
  defaultValue: initialState,
});

const MODAL_VIEW_WEIGHTS: { [key in MODAL_VIEWS]: 0 | 1 | 2 | 3 } = {
  LOGIN_VIEW: 0,
  SIGNUP_VIEW: 1,
  FORGOT_VIEW: 2,
  CART_REMOVE_ITEM_VIEW: 3,
};

const uiReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case UI_ACTIONS.OPEN_SIDEBAR: {
      const { view } = action.payload || {};

      return {
        ...state,
        displaySidebar: true,
        sidebarView: view || state.sidebarView,
      };
    }
    case UI_ACTIONS.CLOSE_SIDEBAR: {
      return {
        ...state,
        displaySidebar: false,
      };
    }
    case UI_ACTIONS.OPEN_MODAL: {
      const { view, hasCloseSidebar = true } = action.payload || {};
      return {
        ...state,
        displayModal: true,
        displaySidebar: hasCloseSidebar ? false : state.displaySidebar,
        modalView: view || state.modalView,
      };
    }
    case UI_ACTIONS.CLOSE_MODAL: {
      return {
        ...state,
        displayModal: false,
      };
    }
    case UI_ACTIONS.SET_MODAL_VIEW: {
      const { view } = action.payload;
      const prevViewIdx = MODAL_VIEW_WEIGHTS[state.modalView];
      const newViewIdx = MODAL_VIEW_WEIGHTS[view];

      return {
        ...state,
        modalView: view,
        modalDirection: newViewIdx - prevViewIdx,
      };
    }
    case UI_ACTIONS.SET_SIDEBAR_VIEW: {
      return {
        ...state,
        sidebarView: action.payload.view,
      };
    }
    case UI_ACTIONS.SET_USER_AVATAR: {
      return {
        ...state,
        userAvatar: action.payload.value,
      };
    }
    case UI_ACTIONS.SET_ITEM_ID_TO_REMOVE: {
      return {
        ...state,
        itemIdToRemove: action.payload.value,
      };
    }
    default: {
      return state;
    }
  }
};

export const UIProvider = (props: React.PropsWithChildren): JSX.Element => {
  const [state, dispatch] = React.useReducer(uiReducer, initialState);

  const openSidebar: State["openSidebar"] = useCallback(
    payload => dispatch({ type: UI_ACTIONS.OPEN_SIDEBAR, payload }),
    [dispatch]
  );
  const closeSidebar: State["closeSidebar"] = useCallback(
    () => dispatch({ type: UI_ACTIONS.CLOSE_SIDEBAR }),
    [dispatch]
  );
  const toggleSidebar: State["toggleSidebar"] = useCallback(
    () =>
      dispatch({ type: state.displaySidebar ? UI_ACTIONS.CLOSE_SIDEBAR : UI_ACTIONS.OPEN_SIDEBAR }),
    [state.displaySidebar, dispatch]
  );
  const closeSidebarIfPresent: State["closeSidebarIfPresent"] = useCallback(
    () => state.displaySidebar && dispatch({ type: UI_ACTIONS.CLOSE_SIDEBAR }),
    [state.displaySidebar, dispatch]
  );

  const openModal: State["openModal"] = useCallback(
    payload => dispatch({ type: UI_ACTIONS.OPEN_MODAL, payload }),
    [dispatch]
  );
  const closeModal: State["closeModal"] = useCallback(
    () => dispatch({ type: UI_ACTIONS.CLOSE_MODAL }),
    [dispatch]
  );

  const setUserAvatar: State["setUserAvatar"] = useCallback(
    value => dispatch({ type: UI_ACTIONS.SET_USER_AVATAR, payload: { value } }),
    [dispatch]
  );

  const setItemIdToRemove: State["setItemIdToRemove"] = useCallback(
    value => dispatch({ type: UI_ACTIONS.SET_ITEM_ID_TO_REMOVE, payload: { value } }),
    [dispatch]
  );

  const setModalView: State["setModalView"] = useCallback(
    view => dispatch({ type: UI_ACTIONS.SET_MODAL_VIEW, payload: { view } }),
    [dispatch]
  );

  const setSidebarView: State["setSidebarView"] = useCallback(
    view => dispatch({ type: UI_ACTIONS.SET_SIDEBAR_VIEW, payload: { view } }),
    [dispatch]
  );

  const memoizedState = useMemo(
    () => state,
    // eslint-disable-next-line
    [
      state.displayModal,
      state.displaySidebar,
      state.sidebarView,
      state.modalView,
      state.modalDirection,
      state.userAvatar,
      state.itemIdToRemove,
    ]
  );

  const value = useMemo(
    () => ({
      ...memoizedState,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserAvatar,
      setItemIdToRemove,
    }),
    [
      memoizedState,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openModal,
      closeModal,
      setModalView,
      setSidebarView,
      setUserAvatar,
      setItemIdToRemove,
    ]
  );

  return <UIContextProvider value={value} {...props} />;
};

export const ManagedUIContext = ({ children }: React.PropsWithChildren): JSX.Element => (
  <ChakraProvider theme={theme}>
    <UIProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UIProvider>
  </ChakraProvider>
);

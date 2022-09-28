import { useCallback, useMemo, useReducer } from "react";

import type { AddressFields } from "@commerce/types/customer/address";
import type { CardFields } from "@commerce/types/customer/card";
import { createCtx } from "@lib/contexts";

export type State = {
  cardFields: CardFields;
  addressFields: AddressFields;
  setCardFields: (cardFields: CardFields) => void;
  setAddressFields: (addressFields: AddressFields) => void;
  clearCheckoutFields: () => void;
};

type Action =
  | {
      type: "SET_CARD_FIELDS";
      card: CardFields;
    }
  | {
      type: "SET_ADDRESS_FIELDS";
      address: AddressFields;
    }
  | {
      type: "CLEAR_CHECKOUT_FIELDS";
    };

const initialState: State = {
  cardFields: {} as CardFields,
  addressFields: {} as AddressFields,
  setCardFields: () => {},
  setAddressFields: () => {},
  clearCheckoutFields: () => {},
};

export const [CheckoutContextProvider, useCheckoutContext] = createCtx({
  name: "CheckoutContext",
  hookName: "useCheckoutContext",
  providerName: "<CheckoutContext />",
  defaultValue: initialState,
});

const checkoutReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_CARD_FIELDS":
      return {
        ...state,
        cardFields: action.card,
      };
    case "SET_ADDRESS_FIELDS":
      return {
        ...state,
        addressFields: action.address,
      };
    case "CLEAR_CHECKOUT_FIELDS":
      return {
        ...state,
        cardFields: initialState.cardFields,
        addressFields: initialState.addressFields,
      };
    default:
      return state;
  }
};

export const CheckoutProvider = (props: React.PropsWithChildren): ComponentElement => {
  const [state, dispatch] = useReducer(checkoutReducer, initialState);

  const setCardFields: State["setCardFields"] = useCallback(
    card => dispatch({ type: "SET_CARD_FIELDS", card }),
    [dispatch]
  );

  const setAddressFields: State["setAddressFields"] = useCallback(
    address => dispatch({ type: "SET_ADDRESS_FIELDS", address }),
    [dispatch]
  );

  const clearCheckoutFields: State["clearCheckoutFields"] = useCallback(
    () => dispatch({ type: "CLEAR_CHECKOUT_FIELDS" }),
    [dispatch]
  );

  const cardFields = useMemo(() => state.cardFields, [state.cardFields]);

  const addressFields = useMemo(() => state.addressFields, [state.addressFields]);

  const value = useMemo(
    () => ({
      cardFields,
      addressFields,
      setCardFields,
      setAddressFields,
      clearCheckoutFields,
    }),
    [cardFields, addressFields, setCardFields, setAddressFields, clearCheckoutFields]
  );

  return <CheckoutContextProvider value={value} {...props} />;
};

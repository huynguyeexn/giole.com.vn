"use client";
import { Church } from "@/types/church";
import { createContext, useMemo, useReducer } from "react";

export interface ListPageStateInterface {
  churchSelected?: Church;
}

export const initListPageStates: ListPageStateInterface = {
  churchSelected: undefined,
};

export const ACTIONS = {
  SELECT_CHURCH: "SELECT_CHURCH",
};

const reducer = (
  prevState: ListPageStateInterface,
  action: any
): ListPageStateInterface => {
  switch (action.type) {
    case ACTIONS.SELECT_CHURCH:
      return {
        ...prevState,
        churchSelected: action.value,
      };

    default:
      return prevState;
  }
};

export const ListPageContext = createContext({
  state: initListPageStates,
  actions: {
    selectChurch: (church: Church | undefined) => {},
  },
});

type Props = Readonly<{
  children: React.ReactNode;
}>;

const ListPageContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initListPageStates);

  const contextValue = useMemo(
    () => ({
      state,
      actions: {
        selectChurch: (church: Church | undefined) => {
          dispatch({ type: ACTIONS.SELECT_CHURCH, value: church });
        },
      },
    }),
    [state]
  );

  return (
    <ListPageContext.Provider value={contextValue}>
      {children}
    </ListPageContext.Provider>
  );
};

export default ListPageContextProvider;

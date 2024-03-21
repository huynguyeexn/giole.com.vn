"use client";
import { Church } from "@/types/church";
import { createContext, useMemo, useReducer } from "react";

export interface HomeStateInterface {
  churchSelected?: Church;
}

export const initHomeStates: HomeStateInterface = {
  churchSelected: undefined,
};

export const HOME_ACTIONS = {
  SELECT_CHURCH: "SELECT_CHURCH",
};

const reducer = (
  prevState: HomeStateInterface,
  action: any
): HomeStateInterface => {
  switch (action.type) {
    case HOME_ACTIONS.SELECT_CHURCH:
      return {
        ...prevState,
        churchSelected: action.value,
      };

    default:
      return prevState;
  }
};

export const ChurchListContext = createContext({
  state: initHomeStates,
  actions: {
    selectChurch: (church: Church | undefined) => {},
  },
});

type Props = Readonly<{
  children: React.ReactNode;
}>;

const ChurchListContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initHomeStates);

  const contextValue = useMemo(
    () => ({
      state,
      actions: {
        selectChurch: (church: Church | undefined) => {
          dispatch({ type: HOME_ACTIONS.SELECT_CHURCH, value: church });
        },
      },
    }),
    [state]
  );

  return (
    <ChurchListContext.Provider value={contextValue}>
      {children}
    </ChurchListContext.Provider>
  );
};

export default ChurchListContextProvider;

"use client";
import {
  FormDefaultValues,
  FormTypes,
} from "@/form-schema/list-page-search-form";
import {
  Church,
  ChurchPagination,
  ChurchPaginationInitialValues,
} from "@/schema/church";
import { createContext, useMemo, useReducer } from "react";

/**
 * CONTEXT TYPES, INITIAL VALUES, ACTIONS
 */
export interface ListPageStateInterface {
  churchSelected?: Church;
  isLoading: boolean;
  formInput: FormTypes;
  churchResultList: ChurchPagination;
}

export const initListPageStates: ListPageStateInterface = {
  churchSelected: undefined,
  isLoading: false,
  formInput: FormDefaultValues,
  churchResultList: ChurchPaginationInitialValues,
};

export const ACTIONS = {
  SELECT_CHURCH: "SELECT_CHURCH",
  SET_LOADING: "SET_LOADING",
  SET_FORM_INPUT: "SET_FORM_INPUT",
  SET_CHURCH_RESULT_LIST: "SET_CHURCH_RESULT_LIST",
};

/**
 * DEFINE REDUCER
 * @param prevState
 * @param action
 * @returns
 */
const reducer = (
  prevState: ListPageStateInterface,
  action: {
    type: string;
    value: any;
  }
): ListPageStateInterface => {
  switch (action.type) {
    case ACTIONS.SELECT_CHURCH:
      return {
        ...prevState,
        churchSelected: action.value,
      };
    case ACTIONS.SET_LOADING:
      return {
        ...prevState,
        isLoading: action.value,
      };
    case ACTIONS.SET_FORM_INPUT:
      if (
        JSON.stringify(prevState.formInput) === JSON.stringify(action.value)
      ) {
        return prevState;
      }
      return {
        ...prevState,
        formInput: action.value,
      };
    case ACTIONS.SET_CHURCH_RESULT_LIST:
      return {
        ...prevState,
        churchResultList: action.value,
      };

    default:
      return prevState;
  }
};

/**
 * CONTEXT PROVIDER COMPONENT
 */
export const ListPageContext = createContext({
  state: initListPageStates,
  actions: {
    selectChurch: (church: Church | undefined) => {},
    setLoading: (loading: boolean) => {},
    setFormInput: (formInput: FormTypes) => {},
    setChurchResultList: (result: ChurchPagination) => {},
  },
});

type ListPageContextProviderProps = Readonly<{
  children: React.ReactNode;
  initValues?: Partial<ListPageStateInterface>;
}>;

const ListPageContextProvider = ({
  children,
  initValues,
}: ListPageContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initListPageStates,
    ...initValues,
  });

  const contextValue = useMemo(
    () => ({
      state,
      actions: {
        selectChurch: (church: Church | undefined) => {
          dispatch({ type: ACTIONS.SELECT_CHURCH, value: church });
        },
        setLoading: (loading: boolean) => {
          dispatch({ type: ACTIONS.SET_LOADING, value: loading });
        },
        setFormInput: (formInput: FormTypes) => {
          dispatch({ type: ACTIONS.SET_FORM_INPUT, value: formInput });
        },
        setChurchResultList: (result: ChurchPagination) => {
          dispatch({ type: ACTIONS.SET_CHURCH_RESULT_LIST, value: result });
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

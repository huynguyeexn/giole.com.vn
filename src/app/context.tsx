"use client";
import { Church } from "@/types/church";
import { District } from "@/types/district";
import { Province } from "@/types/province";
import { createContext, useMemo, useReducer } from "react";

export interface SearchForm {
  province: number;
  district: number;
  name: string;
}

export interface HomeStateInterface {
  provinces: Array<Province>;
  districts: Array<District>;
  churches: Array<Church>;
  searchForm: SearchForm;
  churchSelected?: Church;
  isSearching: boolean;
}

export const initHomeStates: HomeStateInterface = {
  provinces: [],
  districts: [],
  churches: [],
  isSearching: false,
  churchSelected: undefined,
  searchForm: {
    province: -1,
    district: -1,
    name: "",
  },
};

export const HOME_ACTIONS = {
  UPDATE_PROVINCES: "UPDATE_PROVINCES",
  UPDATE_DISTRICTS: "UPDATE_DISTRICTS",
  UPDATE_CHURCHES: "UPDATE_CHURCHES",
  UPDATE_SEARCH_FORM: "UPDATE_SEARCH_FORM",
  SET_IS_SEARCHING: "SET_IS_SEARCHING",
  SELECT_CHURCH: "SELECT_CHURCH",
};

const reducer = (
  prevState: HomeStateInterface,
  action: any
): HomeStateInterface => {
  switch (action.type) {
    case HOME_ACTIONS.UPDATE_PROVINCES:
      return {
        ...prevState,
        provinces: action.value,
      };
    case HOME_ACTIONS.UPDATE_DISTRICTS:
      return {
        ...prevState,
        districts: action.value,
      };
    case HOME_ACTIONS.UPDATE_CHURCHES:
      return {
        ...prevState,
        churches: action.value,
      };
    case HOME_ACTIONS.SET_IS_SEARCHING:
      return {
        ...prevState,
        isSearching: action.value,
      };
    case HOME_ACTIONS.UPDATE_SEARCH_FORM:
      return {
        ...prevState,
        searchForm: action.value,
      };
    case HOME_ACTIONS.SELECT_CHURCH:
      return {
        ...prevState,
        churchSelected: action.value,
      };

    default:
      return prevState;
  }
};

export const HomeContext = createContext({
  state: initHomeStates,
  actions: {
    updateProvinces: (provinces: Province[]) => {},
    updateDistricts: (districts: District[]) => {},
    updateChurches: (churches: Church[]) => {},
    updateSearching: (isSearching: boolean) => {},
    updateSearchForm: (values: SearchForm) => {},
    selectChurch: (church: Church | undefined) => {},
  },
});

type Props = Readonly<{
  children: React.ReactNode;
}>;

const HomeContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initHomeStates);

  const contextValue = useMemo(
    () => ({
      state,
      actions: {
        updateProvinces: (provinces: Province[]) => {
          dispatch({ type: HOME_ACTIONS.UPDATE_PROVINCES, value: provinces });
        },
        updateDistricts: (districts: District[]) => {
          dispatch({ type: HOME_ACTIONS.UPDATE_DISTRICTS, value: districts });
        },
        updateChurches: (churches: Church[]) => {
          dispatch({ type: HOME_ACTIONS.UPDATE_CHURCHES, value: churches });
        },
        updateSearching: (isSearching: boolean) => {
          dispatch({ type: HOME_ACTIONS.SET_IS_SEARCHING, value: isSearching });
        },
        updateSearchForm: (values: SearchForm) => {
          dispatch({ type: HOME_ACTIONS.UPDATE_SEARCH_FORM, value: values });
        },
        selectChurch: (church: Church | undefined) => {
          dispatch({ type: HOME_ACTIONS.SELECT_CHURCH, value: church });
        },
      },
    }),
    [state]
  );

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};

export default HomeContextProvider;

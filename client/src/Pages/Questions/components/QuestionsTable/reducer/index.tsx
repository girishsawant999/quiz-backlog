import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

type TQuestionTableRootState = {
  page: number;
  search: string;
};

type TQuestionTableAction =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_SEARCH"; payload: string };

const initialState: TQuestionTableRootState = {
  page: 1,
  search: "",
};

const reducer = (
  state = initialState,
  action: TQuestionTableAction
): TQuestionTableRootState => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_SEARCH":
      return { ...state, search: action.payload, page: 1 };
    default:
      return state;
  }
};

const useQuestionTableReducer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    page: page ? parseInt(page) : 1,
    search: search || "",
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", state.page.toString());
    params.set("search", state.search);
    setSearchParams(params);
  }, [state, setSearchParams]);

  return [state, dispatch] as const;
};

export default useQuestionTableReducer;

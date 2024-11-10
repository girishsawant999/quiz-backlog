import { useEffect, useReducer } from "react";
import { useSearchParams } from "react-router-dom";

type TQuestionTableRootState = {
  page: number;
  search: string;
  difficulty: string | undefined;
  isVerified: boolean | undefined;
};

type TQuestionTableAction =
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_DIFFICULTY"; payload: TQuestionTableRootState["difficulty"] }
  | { type: "SET_VERIFIED"; payload: TQuestionTableRootState["isVerified"] };

const initialState: TQuestionTableRootState = {
  page: 1,
  search: "",
  difficulty: undefined,
  isVerified: undefined,
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
    case "SET_DIFFICULTY":
      return { ...state, difficulty: action.payload, page: 1 };
    case "SET_VERIFIED":
      return { ...state, isVerified: action.payload, page: 1 };
    default:
      return state;
  }
};

const useQuestionTableReducer = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const search = searchParams.get("search");
  const difficulty = searchParams.get("difficulty");
  const isVerified = searchParams.get("isVerified");

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    page: page ? parseInt(page) : 1,
    search: search || "",
    difficulty: difficulty || undefined,
    isVerified:
      isVerified === "1" ? true : isVerified === "0" ? false : undefined,
  });

  useEffect(() => {
    setSearchParams((params) => {
      params.set("page", state.page.toString());

      if (state.search) params.set("search", state.search);
      else params.delete("search");

      if (state.difficulty) params.set("difficulty", state.difficulty);
      else params.delete("difficulty");

      if (state.isVerified !== undefined)
        params.set("isVerified", state.isVerified ? "1" : "0");
      else params.delete("isVerified");

      return params;
    });
  }, [state, setSearchParams]);

  return [state, dispatch] as const;
};

export default useQuestionTableReducer;

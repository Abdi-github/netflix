import { createContext, useReducer } from "react";

export const StoreContext = createContext();

const initialState = {
  modalMode:
    typeof window !== "undefined" &&
    (localStorage.getItem("modalMode")
      ? JSON.parse(localStorage.getItem("modalMode"))
      : false),
  video:
    typeof window !== "undefined" &&
    (localStorage.getItem("video")
      ? JSON.parse(localStorage.getItem("video"))
      : {}),

  activePlan:
    typeof window !== "undefined" &&
    (localStorage.getItem("activeModal")
      ? JSON.parse(localStorage.getItem("activeModal"))
      : "Premium"),
  subscription:
    typeof window !== "undefined" &&
    (localStorage.getItem("subscription")
      ? JSON.parse(localStorage.getItem("subscription"))
      : null),
  myList:
    typeof window !== "undefined" &&
    (localStorage.getItem("myList")
      ? JSON.parse(localStorage.getItem("myList"))
      : []),
  liked:
    typeof window !== "undefined" &&
    (localStorage.getItem("liked")
      ? JSON.parse(localStorage.getItem("liked"))
      : []),
};

// console.log("INIT STSATE===================", initialState);

function reducer(state, action) {
  switch (action.type) {
    case "SET_MODAL_MODE":
      return { ...state, modalMode: action.payload.modalMode };
    case "SET_VIDEO":
      return { ...state, video: action.payload.video };
    case "SET_ACTIVE_PLAN":
      return { ...state, activePlan: action.payload.activePlan };

    case "SET_SUBSCRIPTION":
      return {
        ...state,
        subscription: action.payload.subscription,
      };
    case "ADD_TO_MYLIST":
      return {
        ...state,
        myList: action.payload.myList,
      };
    case "REMOVE_FROM_MYLIST":
      return {
        ...state,
        myList: action.payload.myList,
      };
    case "LIKE_MOVIE":
      return {
        ...state,
        liked: action.payload.liked,
      };
    case "DISLIKE_MOVIE":
      return {
        ...state,
        liked: action.payload.liked,
      };

    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

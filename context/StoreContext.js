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
};

// console.log("INIT STSATE===================", initialState);

function reducer(state, action) {
  switch (action.type) {
    case "SET_MODAL_MODE":
      return { ...state, modalMode: action.payload.modalMode };
    case "SET_VIDEO":
      return { ...state, video: action.payload.video };

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

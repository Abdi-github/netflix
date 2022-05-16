import { createContext, useReducer } from "react";

export const StoreContext = createContext();

const initialState = {
  modalMode:
    typeof window !== "undefined" &&
    (localStorage.getItem("modalMode")
      ? JSON.parse(localStorage.getItem("modalMode"))
      : false),
};

// console.log("INIT STSATE===================", initialState);

function reducer(state, action) {
  switch (action.type) {
    case "SET_MODAL_MODE":
      return { ...state, modalMode: action.payload.modalMode };

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

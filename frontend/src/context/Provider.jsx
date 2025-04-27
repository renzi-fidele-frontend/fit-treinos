import { createContext, useContext, useReducer } from "react";

const initialState = { idioma: "pt" };

const reducer = (state, action) => {
   switch (action.type) {
      case "setIdioma":
         return { ...state, idioma: action.payload };
      default:
         return state;
   }
};

const Context = createContext();

const Provider = ({ children }) => {
   const [estado, dispatch] = useReducer(reducer, initialState);

   return <Context.Provider value={{ estado, dispatch }}>{children}</Context.Provider>;
};

export const ContextValue = () => useContext(Context);

export default Provider;

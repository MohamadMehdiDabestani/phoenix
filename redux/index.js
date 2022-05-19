import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootRducer from "./reducer";
const storeProvider = createStore(rootRducer, composeWithDevTools());

export const store = storeProvider;

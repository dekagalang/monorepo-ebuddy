import { combineReducers } from "redux";
import exampleReducer from "./exampleSlice";
import updateReducer from "./updateSlices";

const rootReducer = combineReducers({
  example: exampleReducer,
  update: updateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
